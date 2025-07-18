"use client"
import { useState, useEffect } from 'react';
import { Calendar, User, Phone, Mail, ToggleLeft, ToggleRight, Clock, GraduationCap, Search, Edit2, Ban, Check, X, ChevronLeft, ChevronRight } from 'lucide-react';
import UserManagingService from '@/services/admin/UserManagingService';
import { ICollege } from '@/types/types';
import CollegeManagingService from '@/services/admin/CollegeManagingService';
export interface IAdminUser {
  _id: string;
  name: string;
  phoneNumber: string;
  email: string;
  age: number;
  college: string;
  isActive: boolean;
  createdAt: Date;
  expiresAt?: Date;
}

const AdminUserManagement = () => {
  const [formData, setFormData] = useState<IAdminUser>({
    _id: '',
    name: '',
    phoneNumber: '',
    email: '',
    age: 0,
    college: '',
    isActive: true,
    createdAt: new Date(),
    expiresAt: undefined
  });

  const [hasExpiration, setHasExpiration] = useState(false);
  const [users, setUsers] = useState<IAdminUser[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<IAdminUser[]>([]);
  const [colleges, setColleges] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingUser, setEditingUser] = useState<IAdminUser | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(50);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load initial data
  useEffect(() => {
    loadUsers();
    loadColleges();
  }, []);

  // Helper function to safely convert date strings to Date objects
  const convertToDate = (dateValue: any): Date => {
    if (!dateValue) return new Date();
    if (dateValue instanceof Date) return dateValue;
    return new Date(dateValue);
  };

  // Helper function to transform user data with proper date conversion
  const transformUserData = (userData: any[]): IAdminUser[] => {
    return userData.map(user => ({
      ...user,
      createdAt: convertToDate(user.createdAt),
      expiresAt: user.expiresAt ? convertToDate(user.expiresAt) : undefined
    }));
  };

  const loadUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const userData = await UserManagingService.getUsersList();
      
      // Transform the data to ensure dates are proper Date objects
      const transformedData = transformUserData(userData);
      
      setUsers(transformedData);
      setFilteredUsers(transformedData);
    } catch (err) {
      setError('Failed to load users');
      console.error('Error loading users:', err);
    } finally {
      setLoading(false);
    }
  };

 const loadColleges = async () => {
  try {
    const collegesList = await CollegeManagingService.getCollegesList();
    // Map ICollege[] to string[] by extracting the collegeName property
    setColleges(collegesList.map((college: ICollege) => college.collegeName));
  } catch (err) {
    console.error('Error loading colleges:', err);
    setError('Failed to load colleges list');
  }
};

  // Filter users based on search term
  useEffect(() => {
    if (!searchTerm) {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter(user => 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.college.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.phoneNumber.includes(searchTerm)
      );
      setFilteredUsers(filtered);
    }
    setCurrentPage(1);
  }, [searchTerm, users]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }));
    } else if (type === 'datetime-local') {
      setFormData(prev => ({
        ...prev,
        [name]: new Date(value)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleExpirationToggle = () => {
    setHasExpiration(!hasExpiration);
    if (!hasExpiration) {
      setFormData(prev => ({
        ...prev,
        expiresAt: new Date()
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        expiresAt: undefined
      }));
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const userData = {
        name: formData.name,
        phoneNumber: formData.phoneNumber,
        email: formData.email,
        age: formData.age,
        college: formData.college,
        isActive: formData.isActive,
        expiresAt: formData.expiresAt
      };
      
      await UserManagingService.createUser(userData as IAdminUser);
      
      // Reload users after successful creation
      await loadUsers();
      
      // Reset form
      setFormData({
        _id: '',
        name: '',
        phoneNumber: '',
        email: '',
        age: 0,
        college: '',
        isActive: true,
        createdAt: new Date(),
        expiresAt: undefined
      });
      setHasExpiration(false);
      setIsFormVisible(false);
    } catch (err) {
      setError('Failed to create user');
      console.error('Error creating user:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (user: IAdminUser) => {
    setEditingUser(user);
    setFormData(user);
    setHasExpiration(!!user.expiresAt);
    setIsFormVisible(true);
  };

  const handleSaveEdit = async () => {
    if (!editingUser) return;
    
    try {
      setLoading(true);
      setError(null);
      
      const updateData = {
        name: formData.name,
        phoneNumber: formData.phoneNumber,
        email: formData.email,
        age: formData.age,
        college: formData.college,
        isActive: formData.isActive,
        expiresAt: formData.expiresAt
      };
      
      await UserManagingService.updateAdminUser(editingUser._id, updateData as IAdminUser);
      
      // Reload users after successful update
      await loadUsers();
      
      setEditingUser(null);
      setFormData({
        _id: '',
        name: '',
        phoneNumber: '',
        email: '',
        age: 0,
        college: '',
        isActive: true,
        createdAt: new Date(),
        expiresAt: undefined
      });
      setHasExpiration(false);
      setIsFormVisible(false);
    } catch (err) {
      setError('Failed to update user');
      console.error('Error updating user:', err);
    } finally {
      setLoading(false);
    }
  };

  const toggleUserStatus = async (userId: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const user = users.find(u => u._id === userId);
      if (!user) {
        setError('User not found');
        return;
      }
      
      const updateData = {
        name: user.name,
        phoneNumber: user.phoneNumber,
        email: user.email,
        age: user.age,
        college: user.college,
        isActive: !user.isActive,
        expiresAt: user.expiresAt
      };
      
      await UserManagingService.updateAdminUser(userId, updateData as IAdminUser);
      
      // Reload users to get fresh data from server
      await loadUsers();
      
    } catch (err) {
      setError('Failed to update user status');
      console.error('Error toggling user status:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatDateForInput = (date: Date | string) => {
    const dateObj = date instanceof Date ? date : new Date(date);
    return dateObj.toISOString().slice(0, 16);
  };

  const formatDateForDisplay = (date: Date | string) => {
    if (!date) return 'N/A';
    
    const dateObj = date instanceof Date ? date : new Date(date);
    
    // Check if the date is valid
    if (isNaN(dateObj.getTime())) {
      return 'Invalid Date';
    }
    
    return dateObj.toLocaleDateString() + ' ' + dateObj.toLocaleTimeString();
  };

  // Pagination
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentUsers = filteredUsers.slice(startIndex, endIndex);

  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  const resetForm = () => {
    setIsFormVisible(false);
    setEditingUser(null);
    setFormData({
      _id: '',
      name: '',
      phoneNumber: '',
      email: '',
      age: 0,
      college: '',
      isActive: true,
      createdAt: new Date(),
      expiresAt: undefined
    });
    setHasExpiration(false);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-[#015F4A] text-white px-6 py-4 rounded-t-lg">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold flex items-center gap-2">
                <User className="w-6 h-6" />
                Admin User Management
              </h1>
              <p className="text-green-100 mt-1">Total Users: {users.length.toLocaleString()}</p>
            </div>
            <button
              onClick={() => setIsFormVisible(!isFormVisible)}
              className="bg-white text-[#015F4A] px-4 py-2 rounded-md hover:bg-gray-100 transition-colors font-medium"
              disabled={loading}
            >
              {isFormVisible ? 'Hide Form' : 'Add New User'}
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
            <button
              onClick={() => setError(null)}
              className="float-right text-red-500 hover:text-red-700"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Search Bar */}
        <div className="bg-white px-6 py-4 border-b">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, email, college, or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#015F4A] focus:border-[#015F4A] outline-none"
            />
          </div>
          <p className="text-sm text-gray-600 mt-2">
            Showing {filteredUsers.length.toLocaleString()} users
          </p>
        </div>

        {/* Form */}
        {isFormVisible && (
          <div className="bg-white border-b">
            <div className="p-6 space-y-6">
              <h2 className="text-lg font-semibold text-[#015F4A]">
                {editingUser ? 'Edit User' : 'Add New User'}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name Field */}
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-sm font-medium text-[#015F4A]">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 w-4 h-4 text-[#015F4A]" />
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#015F4A] focus:border-[#015F4A] outline-none transition-colors"
                      placeholder="Enter full name"
                    />
                  </div>
                </div>

                {/* Phone Number Field */}
                <div className="space-y-2">
                  <label htmlFor="phoneNumber" className="block text-sm font-medium text-[#015F4A]">
                    Phone Number *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 w-4 h-4 text-[#015F4A]" />
                    <input
                      type="tel"
                      id="phoneNumber"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#015F4A] focus:border-[#015F4A] outline-none transition-colors"
                      placeholder="Enter phone number"
                    />
                  </div>
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium text-[#015F4A]">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 w-4 h-4 text-[#015F4A]" />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#015F4A] focus:border-[#015F4A] outline-none transition-colors"
                      placeholder="Enter email address"
                    />
                  </div>
                </div>

                {/* Age Field */}
                <div className="space-y-2">
                  <label htmlFor="age" className="block text-sm font-medium text-[#015F4A]">
                    Age *
                  </label>
                  <input
                    type="number"
                    id="age"
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                    required
                    min="1"
                    max="120"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#015F4A] focus:border-[#015F4A] outline-none transition-colors"
                    placeholder="Enter age"
                  />
                </div>

                {/* College Field */}
                <div className="space-y-2">
                  <label htmlFor="college" className="block text-sm font-medium text-[#015F4A]">
                    College *
                  </label>
                  <div className="relative">
                    <GraduationCap className="absolute left-3 top-3 w-4 h-4 text-[#015F4A]" />
                    <select
                      id="college"
                      name="college"
                      value={formData.college}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#015F4A] focus:border-[#015F4A] outline-none transition-colors"
                    >
                      <option value="">Select a college</option>
                      {colleges.map((college) => (
                        <option key={college} value={college}>
                          {college}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Active Status */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-[#015F4A]">
                    Account Status
                  </label>
                  <div className="flex items-center space-x-3">
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, isActive: !prev.isActive }))}
                      className="flex items-center space-x-2 focus:outline-none"
                    >
                      {formData.isActive ? (
                        <ToggleRight className="w-8 h-8 text-[#015F4A]" />
                      ) : (
                        <ToggleLeft className="w-8 h-8 text-gray-400" />
                      )}
                      <span className={`font-medium ${formData.isActive ? 'text-[#015F4A]' : 'text-gray-500'}`}>
                        {formData.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </button>
                  </div>
                </div>

                {/* Expiration Date */}
                <div className="space-y-2">
                  <div className="flex items-center space-x-3">
                    <label className="block text-sm font-medium text-[#015F4A]">
                      Account Expiration
                    </label>
                    <button
                      type="button"
                      onClick={handleExpirationToggle}
                      className="flex items-center space-x-1 focus:outline-none"
                    >
                      {hasExpiration ? (
                        <ToggleRight className="w-6 h-6 text-[#015F4A]" />
                      ) : (
                        <ToggleLeft className="w-6 h-6 text-gray-400" />
                      )}
                      <span className={`text-sm ${hasExpiration ? 'text-[#015F4A]' : 'text-gray-500'}`}>
                        {hasExpiration ? 'Enabled' : 'Disabled'}
                      </span>
                    </button>
                  </div>
                  
                  {hasExpiration && (
                    <div className="relative">
                      <Clock className="absolute left-3 top-3 w-4 h-4 text-[#015F4A]" />
                      <input
                        type="datetime-local"
                        id="expiresAt"
                        name="expiresAt"
                        value={formData.expiresAt ? formatDateForInput(formData.expiresAt) : ''}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#015F4A] focus:border-[#015F4A] outline-none transition-colors"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={editingUser ? handleSaveEdit : handleSubmit}
                  disabled={loading}
                  className="bg-[#015F4A] text-white py-2 px-6 rounded-md hover:bg-[#014A3A] focus:outline-none focus:ring-2 focus:ring-[#015F4A] focus:ring-offset-2 transition-colors font-medium disabled:opacity-50"
                >
                  {loading ? 'Saving...' : (editingUser ? 'Save Changes' : 'Add User')}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="bg-gray-500 text-white py-2 px-6 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors font-medium"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Users Table */}
        <div className="bg-white rounded-b-lg overflow-hidden">
          {loading && (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#015F4A]"></div>
              <p className="mt-2 text-gray-600">Loading users...</p>
            </div>
          )}
          
          {!loading && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">College</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expires</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentUsers.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                        No users found
                      </td>
                    </tr>
                  ) : (
                    currentUsers.map((user) => (
                      <tr key={user._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-10 w-10 rounded-full bg-[#015F4A] flex items-center justify-center">
                              <span className="text-white font-medium text-sm">
                                {user.name.split(' ').map(n => n[0]).join('')}
                              </span>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{user.name}</div>
                              <div className="text-sm text-gray-500">{user._id}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{user.email}</div>
                          <div className="text-sm text-gray-500">{user.phoneNumber}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{user.college}</div>
                          <div className="text-sm text-gray-500">Age: {user.age}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            user.isActive 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {user.isActive ? 'Active' : 'Blocked'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {formatDateForDisplay(user.createdAt)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {user.expiresAt ? formatDateForDisplay(user.expiresAt) : 'Never'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                          <button
                            onClick={() => handleEdit(user)}
                            className="text-[#015F4A] hover:text-[#014A3A] p-1 rounded"
                            title="Edit user"
                            disabled={loading}
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => toggleUserStatus(user._id)}
                            className={`p-1 rounded ${
                              user.isActive 
                                ? 'text-red-600 hover:text-red-800' 
                                : 'text-green-600 hover:text-green-800'
                            }`}
                            title={user.isActive ? 'Block user' : 'Activate user'}
                            disabled={loading}
                          >
                            {user.isActive ? <Ban className="w-4 h-4" /> : <Check className="w-4 h-4" />}
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
          {!loading && filteredUsers.length > 0 && (
            <div className="bg-white px-6 py-3 border-t border-gray-200 flex items-center justify-between">
              <div className="flex items-center">
                <p className="text-sm text-gray-700">
                  Showing {startIndex + 1} to {Math.min(endIndex, filteredUsers.length)} of {filteredUsers.length.toLocaleString()} users
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-sm text-gray-700">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminUserManagement;