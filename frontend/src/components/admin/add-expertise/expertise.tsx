"use client"
import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Search, Save, X } from 'lucide-react';
import AuthService from '@/services/AuthService';
interface ExpertiseArea {
  id: string;
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

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    isActive: true
  });

  const handleCreate = async () => {
    setIsLoading(true);
    try {
      const result = await AuthService.addExpertise({
        name: formData.name,
        description: formData.description,
        isActive: formData.isActive
      });
      
      if (result.success) {
        const newExpertise: ExpertiseArea = {
          id: result.id,
          name: formData.name,
          description: formData.description,
          isActive: formData.isActive,
          createdAt: new Date().toISOString().split('T')[0],
          updatedAt: new Date().toISOString().split('T')[0]
        };
        
        setExpertiseAreas([...expertiseAreas, newExpertise]);
        setShowCreateModal(false);
        setFormData({ name: '', description: '', isActive: true });
      }
    } catch (error) {
      console.error('Error creating expertise:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (expertise: ExpertiseArea) => {
    setEditingExpertise(expertise);
    setFormData({
      name: expertise.name,
      description: expertise.description,
      isActive: expertise.isActive
    });
  };

  const handleUpdate = async () => {
    if (!editingExpertise) return;
    
    setIsLoading(true);
    try {
      const result = await AuthService.updateExpertise(editingExpertise.id, {
        name: formData.name,
        description: formData.description,
        isActive: formData.isActive
      });
      
      if (result.success) {
        const updatedExpertise = {
          ...editingExpertise,
          name: formData.name,
          description: formData.description,
          isActive: formData.isActive,
          updatedAt: new Date().toISOString().split('T')[0]
        };
        
        setExpertiseAreas(expertiseAreas.map(exp => 
          exp.id === editingExpertise.id ? updatedExpertise : exp
        ));
        setEditingExpertise(null);
        setFormData({ name: '', description: '', isActive: true });
      }
    } catch (error) {
      console.error('Error updating expertise:', error);
    } finally {
      setIsLoading(false);
    }
  };


  const handleDelete = async (id: string) => {
    setIsLoading(true);
    try {
      const result = await AuthService.deleteExpertise(id);
      
      if (result.success) {
        setExpertiseAreas(expertiseAreas.filter(exp => exp.id !== id));
      }
    } catch (error) {
      console.error('Error deleting expertise:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredExpertise = expertiseAreas.filter(expertise => {
    const matchesSearch = expertise.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         expertise.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || 
                         (statusFilter === 'active' && expertise.isActive) ||
                         (statusFilter === 'inactive' && !expertise.isActive);
    return matchesSearch && matchesStatus;
  });

  const Modal = ({ isOpen, onClose, title, children }: { isOpen: boolean; onClose: () => void; title: string; children: React.ReactNode }) => {
    if (!isOpen) return null;
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
            <button
              onClick={onClose}
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
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search expertise areas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#015F4A] focus:border-transparent"
              />
            </div>
            <div className="flex items-center gap-2">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as 'all' | 'active' | 'inactive')}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#015F4A] focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
        </div>

        {/* Expertise Areas Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredExpertise.map((expertise) => (
            <div key={expertise.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{expertise.name}</h3>
                    <p className="text-gray-600 text-sm mb-3">{expertise.description}</p>
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        expertise.isActive 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {expertise.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="text-xs text-gray-500 mb-4">
                  <p>Created: {expertise.createdAt}</p>
                  <p>Updated: {expertise.updatedAt}</p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(expertise)}
                    disabled={isLoading}
                    className="flex-1 bg-[#015F4A] hover:bg-[#014A3B] text-white px-3 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
                  >
                    <Edit2 size={16} />
                    Edit
                  </button>
                  <button
                    // onClick={() => handleDelete(expertise.id)}
                    disabled={isLoading}
                    className="px-3 py-2 border border-red-300 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredExpertise.length === 0 && (
          <div className="text-center py-12">
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
        onClose={() => setShowCreateModal(false)}
        title="Add New Expertise Area"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Expertise Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#015F4A] focus:border-transparent"
              placeholder="Enter expertise name"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#015F4A] focus:border-transparent"
              placeholder="Describe the expertise area..."
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <select
              value={formData.isActive ? 'active' : 'inactive'}
              onChange={(e) => setFormData({...formData, isActive: e.target.value === 'active'})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#015F4A] focus:border-transparent"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          
          <div className="flex gap-3 pt-4">
            <button
              onClick={() => setShowCreateModal(false)}
              disabled={isLoading}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
            //   onClick={handleCreate}
              disabled={isLoading}
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
        onClose={() => setEditingExpertise(null)}
        title="Edit Expertise Area"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Expertise Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#015F4A] focus:border-transparent"
              placeholder="Enter expertise name"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#015F4A] focus:border-transparent"
              placeholder="Describe the expertise area..."
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <select
              value={formData.isActive ? 'active' : 'inactive'}
              onChange={(e) => setFormData({...formData, isActive: e.target.value === 'active'})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#015F4A] focus:border-transparent"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          
          <div className="flex gap-3 pt-4">
            <button
              onClick={() => setEditingExpertise(null)}
              disabled={isLoading}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
            //   onClick={handleUpdate}
              disabled={isLoading}
              className="flex-1 bg-[#015F4A] hover:bg-[#014A3B] text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
            >
              <Save size={16} />
              {isLoading ? 'Updating...' : 'Update Expertise'}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ExpertiseAdmin;