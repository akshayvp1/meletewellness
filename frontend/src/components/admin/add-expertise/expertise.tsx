"use client"
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { Plus, Edit2, Trash2, Search, Save, X, Lock, Unlock } from 'lucide-react';
import ExpertiseManagingService from '@/services/admin/ExpertiseManagingService';
import toast from 'react-hot-toast';

interface ExpertiseArea {
  _id?: string;  // MongoDB ObjectId
  id?: string;   // Regular ID
  expertiseId?: string;  // Alternative ID field
  name: string;
  description: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

const ExpertiseAdmin = () => {
  const [expertiseAreas, setExpertiseAreas] = useState<ExpertiseArea[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingExpertise, setEditingExpertise] = useState<ExpertiseArea | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [confirmAction, setConfirmAction] = useState<{
    type: 'block' | 'unblock';
    expertise: ExpertiseArea;
  } | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    isActive: true
  });

  // Refs for maintaining focus
  const nameInputRef = useRef<HTMLInputElement>(null);
  const descriptionInputRef = useRef<HTMLTextAreaElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Helper function to get the ID from expertise object
  const getExpertiseId = useCallback((expertise: ExpertiseArea): string | null => {
    return expertise._id || expertise.id || expertise.expertiseId || null;
  }, []);

  // Load expertise areas on component mount
  useEffect(() => {
    fetchExpertiseAreas();
  }, []);

  const fetchExpertiseAreas = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await ExpertiseManagingService.getExpertise();
      
      if (response.success) {
        const data = Array.isArray(response.data) ? response.data : [];
        setExpertiseAreas(data as ExpertiseArea[]);
      } else {
        setExpertiseAreas([]);
        toast.error('Failed to load expertise areas');
      }
    } catch (error) {
      setExpertiseAreas([]);
      toast.error('Failed to load expertise areas');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Stable form handlers using useCallback
  const handleFormChange = useCallback((field: keyof typeof formData) => {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const value = field === 'isActive' 
        ? e.target.value === 'active' 
        : e.target.value;
      
      setFormData(prev => ({ 
        ...prev, 
        [field]: value 
      }));
    };
  }, []);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }, []);

  const handleStatusFilterChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusFilter(e.target.value as 'all' | 'active' | 'inactive');
  }, []);

  const resetForm = useCallback(() => {
    setFormData({ name: '', description: '', isActive: true });
  }, []);

  const handleCreate = useCallback(async () => {
    if (!formData.name.trim()) {
      toast.error('Please enter expertise name');
      return;
    }

    setIsLoading(true);
    try {
      const response = await ExpertiseManagingService.addExpertise({
        name: formData.name.trim(),
        description: formData.description.trim(),
        isActive: formData.isActive
      });
      
      if (response.success) {
        toast.success('Expertise area created successfully!');
        setShowCreateModal(false);
        resetForm();
        await fetchExpertiseAreas();
      } else {
        toast.error('Failed to create expertise area');
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || 'Failed to create expertise area';
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [formData, resetForm, fetchExpertiseAreas]);

  const handleEdit = useCallback((expertise: ExpertiseArea) => {
    const expertiseId = getExpertiseId(expertise);
    
    if (!expertiseId) {
      toast.error('Invalid expertise data - no ID found');
      return;
    }
    
    setEditingExpertise(expertise);
    setFormData({
      name: expertise.name,
      description: expertise.description,
      isActive: expertise.isActive
    });
  }, [getExpertiseId]);

  const handleUpdate = useCallback(async () => {
    if (!editingExpertise) {
      toast.error('No expertise selected for editing');
      return;
    }
    
    const expertiseId = getExpertiseId(editingExpertise);
    
    if (!expertiseId) {
      toast.error('Invalid expertise ID - cannot update');
      return;
    }
    
    if (!formData.name.trim()) {
      toast.error('Please enter expertise name');
      return;
    }
    
    setIsLoading(true);
    try {
      const response = await ExpertiseManagingService.updateExpertise(expertiseId, {
        name: formData.name.trim(),
        description: formData.description.trim(),
        isActive: formData.isActive
      });
      
      if (response.success) {
        toast.success('Expertise area updated successfully!');
        setEditingExpertise(null);
        resetForm();
        await fetchExpertiseAreas();
      } else {
        const errorMessage = response.message || 'Failed to update expertise area';
        toast.error(errorMessage);
      }
      
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || 'Failed to update expertise area';
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [editingExpertise, formData, getExpertiseId, resetForm, fetchExpertiseAreas]);

  const showBlockConfirmation = useCallback((expertise: ExpertiseArea) => {
    setConfirmAction({ type: 'block', expertise });
    setShowConfirmDialog(true);
  }, []);

  const showUnblockConfirmation = useCallback((expertise: ExpertiseArea) => {
    setConfirmAction({ type: 'unblock', expertise });
    setShowConfirmDialog(true);
  }, []);

  const handleConfirmAction = useCallback(async () => {
    if (!confirmAction) return;

    const { type, expertise } = confirmAction;
    const expertiseId = getExpertiseId(expertise);
    
    if (!expertiseId) {
      toast.error('Invalid expertise ID');
      setShowConfirmDialog(false);
      setConfirmAction(null);
      return;
    }

    setIsLoading(true);
    setShowConfirmDialog(false);
    
    try {
      let result;
      if (type === 'block') {
        result = await ExpertiseManagingService.blockExpertise(expertiseId);
        if (result.success) {
          toast.success('Expertise area blocked successfully!');
        } else {
          toast.error('Failed to block expertise area');
        }
      } else {
        result = await ExpertiseManagingService.unBlockExpertise(expertiseId);
        if (result.success) {
          toast.success('Expertise area unblocked successfully!');
        } else {
          toast.error('Failed to unblock expertise area');
        }
      }
      
      if (result.success) {
        await fetchExpertiseAreas();
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || `Failed to ${type} expertise area`;
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
      setConfirmAction(null);
    }
  }, [confirmAction, getExpertiseId, fetchExpertiseAreas]);

  const handleCancelConfirmation = useCallback(() => {
    setShowConfirmDialog(false);
    setConfirmAction(null);
  }, []);

  const closeCreateModal = useCallback(() => {
    setShowCreateModal(false);
    resetForm();
  }, [resetForm]);

  const closeEditModal = useCallback(() => {
    setEditingExpertise(null);
    resetForm();
  }, [resetForm]);

  // Memoized filtered results to prevent unnecessary re-calculations
  const filteredExpertise = useMemo(() => {
    if (!Array.isArray(expertiseAreas)) return [];
    
    return expertiseAreas.filter(expertise => {
      const matchesSearch = expertise.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           expertise.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || 
                           (statusFilter === 'active' && expertise.isActive) ||
                           (statusFilter === 'inactive' && !expertise.isActive);
      return matchesSearch && matchesStatus;
    });
  }, [expertiseAreas, searchTerm, statusFilter]);

  // Memoized Modal component to prevent re-creation
  const Modal = useMemo(() => {
    return ({ isOpen, onClose, title, children }: { 
      isOpen: boolean; 
      onClose: () => void; 
      title: string; 
      children: React.ReactNode 
    }) => {
      if (!isOpen) return null;
      
      return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
              <button
                onClick={onClose}
                type="button"
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            <div className="p-6">
              {children}
            </div>
          </div>
        </div>
      );
    };
  }, []);

  const ConfirmDialog = useMemo(() => {
    return () => {
      if (!showConfirmDialog || !confirmAction) return null;

      const { type, expertise } = confirmAction;
      const actionText = type === 'block' ? 'block' : 'unblock';
      const actionColor = type === 'block' ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600';

      return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Confirm {actionText.charAt(0).toUpperCase() + actionText.slice(1)}
              </h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to {actionText} the expertise area "{expertise.name}"?
              </p>
              <div className="flex gap-3">
                <button
                  onClick={handleCancelConfirmation}
                  disabled={isLoading}
                  type="button"
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmAction}
                  disabled={isLoading}
                  type="button"
                  className={`flex-1 text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-50 ${actionColor}`}
                >
                  {isLoading ? `${actionText.charAt(0).toUpperCase() + actionText.slice(1)}ing...` : actionText.charAt(0).toUpperCase() + actionText.slice(1)}
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    };
  }, [showConfirmDialog, confirmAction, isLoading, handleCancelConfirmation, handleConfirmAction]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Expertise Areas</h1>
              <p className="text-gray-600 mt-1">Manage and organize expertise areas</p>
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              type="button"
              className="bg-[#015F4A] hover:bg-[#014A3B] text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors shadow-md"
            >
              <Plus size={20} />
              Add Expertise Area
            </button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search expertise areas..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#015F4A] focus:border-transparent outline-none"
              />
            </div>
            <div className="flex items-center gap-2">
              <select
                value={statusFilter}
                onChange={handleStatusFilterChange}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#015F4A] focus:border-transparent outline-none"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">Loading...</div>
          </div>
        )}

        {/* Expertise Areas List */}
        {!isLoading && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Description
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Created Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Updated Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredExpertise.map((expertise, index) => {
                    const expertiseId = getExpertiseId(expertise);
                    return (
                      <tr key={expertiseId || `expertise-${index}`} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{expertise.name}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-600 max-w-xs truncate" title={expertise.description}>
                            {expertise.description || '-'}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">
                            {new Date(expertise.createdAt).toLocaleDateString()}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">
                            {new Date(expertise.updatedAt).toLocaleDateString()}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                            expertise.isActive 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {expertise.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleEdit(expertise)}
                              disabled={isLoading || !expertiseId}
                              type="button"
                              className="bg-[#015F4A] hover:bg-[#014A3B] text-white px-3 py-1.5 rounded text-xs flex items-center gap-1 transition-colors disabled:opacity-50"
                            >
                              <Edit2 size={14} />
                              Edit
                            </button>
                            {expertise.isActive ? (
                              <button
                                onClick={() => showBlockConfirmation(expertise)}
                                disabled={isLoading || !expertiseId}
                                type="button"
                                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded text-xs flex items-center gap-1 transition-colors disabled:opacity-50"
                                title="Block Expertise"
                              >
                                <Lock size={14} />
                                Block
                              </button>
                            ) : (
                              <button
                                onClick={() => showUnblockConfirmation(expertise)}
                                disabled={isLoading || !expertiseId}
                                type="button"
                                className="bg-green-500 hover:bg-green-600 text-white px-3 py-1.5 rounded text-xs flex items-center gap-1 transition-colors disabled:opacity-50"
                                title="Unblock Expertise"
                              >
                                <Unlock size={14} />
                                Unblock
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {!isLoading && filteredExpertise.length === 0 && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <div className="text-gray-400 mb-4">
              <Search size={48} className="mx-auto" />
            </div>
            <p className="text-gray-500">No expertise areas found matching your criteria.</p>
          </div>
        )}
      </div>

      {/* Create Modal */}
      <Modal 
        isOpen={showCreateModal} 
        onClose={closeCreateModal}
        title="Add New Expertise Area"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Expertise Name *
            </label>
            <input
              ref={nameInputRef}
              type="text"
              value={formData.name}
              onChange={handleFormChange('name')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#015F4A] focus:border-transparent outline-none"
              placeholder="Enter expertise name"
              required
              autoComplete="off"
              spellCheck="false"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              ref={descriptionInputRef}
              value={formData.description}
              onChange={handleFormChange('description')}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#015F4A] focus:border-transparent resize-none outline-none"
              placeholder="Describe the expertise area..."
              autoComplete="off"
              spellCheck="false"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <select
              value={formData.isActive ? 'active' : 'inactive'}
              onChange={handleFormChange('isActive')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#015F4A] focus:border-transparent outline-none"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          
          <div className="flex gap-3 pt-4">
            <button
              onClick={closeCreateModal}
              disabled={isLoading}
              type="button"
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={handleCreate}
              disabled={isLoading}
              type="button"
              className="flex-1 bg-[#015F4A] hover:bg-[#014A3B] text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
            >
              <Save size={16} />
              {isLoading ? 'Creating...' : 'Create Expertise'}
            </button>
          </div>
        </div>
      </Modal>

      {/* Edit Modal */}
      <Modal 
        isOpen={!!editingExpertise} 
        onClose={closeEditModal}
        title="Edit Expertise Area"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Expertise Name *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={handleFormChange('name')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#015F4A] focus:border-transparent outline-none"
              placeholder="Enter expertise name"
              required
              autoComplete="off"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={handleFormChange('description')}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#015F4A] focus:border-transparent outline-none resize-none"
              placeholder="Describe the expertise area..."
              autoComplete="off"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <select
              value={formData.isActive ? 'active' : 'inactive'}
              onChange={handleFormChange('isActive')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#015F4A] focus:border-transparent outline-none"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          
          <div className="flex gap-3 pt-4">
            <button
              onClick={closeEditModal}
              disabled={isLoading}
              type="button"
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={handleUpdate}
              disabled={isLoading}
              type="button"
              className="flex-1 bg-[#015F4A] hover:bg-[#014A3B] text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
            >
              <Save size={16} />
              {isLoading ? 'Updating...' : 'Update Expertise'}
            </button>
          </div>
        </div>
      </Modal>

      {/* Custom Confirmation Dialog */}
      <ConfirmDialog />
    </div>
  );
};

export default ExpertiseAdmin;