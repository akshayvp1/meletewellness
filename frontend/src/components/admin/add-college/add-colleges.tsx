"use client";

import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Save, X, Loader2, School, Phone, Mail, Calendar, CheckCircle, XCircle } from 'lucide-react';
import CollegeManagingService from '@/services/admin/CollegeManagingService';
import { ICollege as MeleteICollege } from '@/types/types';

const CollegeManagement = () => {
  const [colleges, setColleges] = useState<MeleteICollege[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    collegeName: '',
    mobile: '',
    email: '',
    isActive: true,
    expiresAt: '',
  });

  // Load colleges on mount
  useEffect(() => {
    loadColleges();
  }, []);

  const loadColleges = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const collegeData = await CollegeManagingService.getAllColleges();
      console.log('collegeData:', collegeData); // Debug
      
      // Ensure the data conforms to MeleteICollege interface
      const validatedColleges: MeleteICollege[] = collegeData.map(college => ({
        ...college,
        collegeName: college.collegeName || college.collegeName || '', // Handle different property names
        mobile: college.mobile || '',
        email: college.email || '',
        isActive: college.isActive ?? true,
        _id: college._id || college._id || '',
        createdAt: college.createdAt,
        expiresAt: college.expiresAt,
      }));
      
      setColleges(validatedColleges);
    } catch (error: unknown) {
      console.error('Error loading colleges:', error);
      setError('Failed to load colleges.');
      setColleges([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async () => {
    if (!formData.collegeName || !formData.mobile || !formData.email) {
      setError('Please fill in all required fields');
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);

      const collegeData = {
        collegeName: formData.collegeName,
        mobile: formData.mobile,
        email: formData.email,
        isActive: formData.isActive,
        expiresAt: formData.expiresAt ? new Date(formData.expiresAt) : undefined,
      };

      if (editingId) {
        const updatedCollegeResponse = await CollegeManagingService.updateCollegeData(editingId, collegeData);
        console.log('updatedCollege:', updatedCollegeResponse); // Debug
        
        // Ensure the response conforms to MeleteICollege interface
        const updatedCollege: MeleteICollege = {
          ...updatedCollegeResponse,
          collegeName: updatedCollegeResponse.collegeName || updatedCollegeResponse.collegeName || '',
          mobile: updatedCollegeResponse.mobile || '',
          email: updatedCollegeResponse.email || '',
          isActive: updatedCollegeResponse.isActive ?? true,
          _id: updatedCollegeResponse._id || updatedCollegeResponse._id || editingId,
          createdAt: updatedCollegeResponse.createdAt,
          expiresAt: updatedCollegeResponse.expiresAt,
        };
        
        setColleges(prev =>
          prev.map(college => (college._id === editingId ? updatedCollege : college))
        );
        setEditingId(null);
        alert('College updated!');
      } else {
        const addedCollegeResponse = await CollegeManagingService.addCollegeData(collegeData);
        console.log('addedCollege:', addedCollegeResponse); // Debug
        
        // Ensure the response conforms to MeleteICollege interface
        const addedCollege: MeleteICollege = {
          ...addedCollegeResponse,
          collegeName: addedCollegeResponse.collegeName || addedCollegeResponse.collegeName || '',
          mobile: addedCollegeResponse.mobile || '',
          email: addedCollegeResponse.email || '',
          isActive: addedCollegeResponse.isActive ?? true,
          _id: addedCollegeResponse._id || addedCollegeResponse._id || '',
          createdAt: addedCollegeResponse.createdAt,
          expiresAt: addedCollegeResponse.expiresAt,
        };
        
        setColleges(prev => [addedCollege, ...prev]);
        setShowForm(false);
        alert('College added!');
      }

      setFormData({
        collegeName: '',
        mobile: '',
        email: '',
        isActive: true,
        expiresAt: '',
      });
    } catch (error: unknown) {
      console.error('Error saving college:', error);
      setError('Failed to save college.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (college: MeleteICollege) => {
    setEditingId(college._id);
    setFormData({
      collegeName: college.collegeName || '',
      mobile: college.mobile || '',
      email: college.email || '',
      isActive: college.isActive ?? true,
      expiresAt: college.expiresAt
        ? new Date(college.expiresAt).toISOString().split('T')[0]
        : '',
    });
    setShowForm(true);
    setError(null);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData({
      collegeName: '',
      mobile: '',
      email: '',
      isActive: true,
      expiresAt: '',
    });
    setError(null);
  };

  const formatDate = (date: Date | string | null | undefined) => {
    if (!date) return 'N/A';
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return isNaN(dateObj.getTime())
      ? 'Invalid Date'
      : dateObj.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white p-6 rounded-xl shadow-lg mb-6 border-l-4 border-[#015F4A]">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <School className="text-[#015F4A]" size={28} />
              <h1 className="text-2xl font-bold text-[#015F4A]">College Management</h1>
            </div>
            <button
              onClick={() => setShowForm(true)}
              disabled={isSubmitting}
              className="bg-[#015F4A] hover:bg-[#014a3b] text-white px-4 py-2 rounded-lg flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 shadow-md"
            >
              <Plus size={18} /> Add College
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg mb-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <XCircle size={20} />
              <span>{error}</span>
            </div>
            <button 
              onClick={() => setError(null)} 
              className="text-red-600 hover:text-red-800 transition-colors"
            >
              <X size={18} />
            </button>
          </div>
        )}

        {/* Form */}
        {showForm && (
          <div className="bg-white p-6 rounded-xl shadow-lg mb-6 border-l-4 border-[#015F4A]">
            <h2 className="text-xl font-bold text-[#015F4A] mb-6">
              {editingId ? 'Edit College' : 'Add New College'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">College Name *</label>
                <input
                  type="text"
                  name="collegeName"
                  value={formData.collegeName}
                  onChange={handleInputChange}
                  placeholder="Enter college name"
                  disabled={isSubmitting}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#015F4A] focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed transition-all duration-200"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Mobile Number *</label>
                <input
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleInputChange}
                  placeholder="Enter mobile number"
                  disabled={isSubmitting}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#015F4A] focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed transition-all duration-200"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter email address"
                  disabled={isSubmitting}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#015F4A] focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed transition-all duration-200"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Expiry Date</label>
                <input
                  type="date"
                  name="expiresAt"
                  value={formData.expiresAt}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#015F4A] focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed transition-all duration-200"
                />
              </div>
            </div>
            <div className="mt-6">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="isActive"
                  checked={formData.isActive}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                  className="w-5 h-5 text-[#015F4A] border-gray-300 rounded focus:ring-[#015F4A] focus:ring-2 disabled:cursor-not-allowed"
                />
                <span className="text-sm font-medium text-gray-700">Active Status</span>
              </label>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="bg-[#015F4A] hover:bg-[#014a3b] text-white px-6 py-3 rounded-lg flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 shadow-md"
              >
                {isSubmitting ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  <Save size={18} />
                )}
                {editingId ? 'Update College' : 'Add College'}
              </button>
              <button
                onClick={handleCancel}
                disabled={isSubmitting}
                className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 shadow-md"
              >
                <X size={18} /> Cancel
              </button>
            </div>
          </div>
        )}

        {/* College List */}
        {isLoading ? (
          <div className="text-center p-8">
            <Loader2 className="animate-spin mx-auto text-[#015F4A] mb-4" size={32} />
            <p className="text-gray-600">Loading colleges...</p>
          </div>
        ) : colleges.length === 0 ? (
          <div className="text-center p-8 bg-white rounded-xl shadow-lg">
            <School className="mx-auto text-gray-400 mb-4" size={48} />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">No colleges found</h3>
            <p className="text-gray-500">Add your first college to get started!</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {colleges.map(college => (
              <div 
                key={college._id} 
                className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-[#015F4A] hover:shadow-xl transition-shadow duration-200"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <School className="text-[#015F4A]" size={24} />
                      <h3 className="text-xl font-bold text-[#015F4A]">{college.collegeName}</h3>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-gray-600">
                          {college.isActive ? (
                            <CheckCircle className="text-green-500" size={18} />
                          ) : (
                            <XCircle className="text-red-500" size={18} />
                          )}
                          <span className="font-medium">Status:</span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            college.isActive 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {college.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-2 text-gray-600">
                          <Phone size={18} />
                          <span className="font-medium">Mobile:</span>
                          <span>{college.mobile || 'N/A'}</span>
                        </div>
                        
                        <div className="flex items-center gap-2 text-gray-600">
                          <Mail size={18} />
                          <span className="font-medium">Email:</span>
                          <span>{college.email || 'N/A'}</span>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-gray-600">
                          <Calendar size={18} />
                          <span className="font-medium">Created:</span>
                          <span>{formatDate(college.createdAt)}</span>
                        </div>
                        
                        {college.expiresAt && (
                          <div className="flex items-center gap-2 text-gray-600">
                            <Calendar size={18} />
                            <span className="font-medium">Expires:</span>
                            <span>{formatDate(college.expiresAt)}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => handleEdit(college)}
                    disabled={isSubmitting}
                    className="ml-4 bg-[#015F4A] hover:bg-[#014a3b] text-white p-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 shadow-md"
                  >
                    <Edit2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CollegeManagement;