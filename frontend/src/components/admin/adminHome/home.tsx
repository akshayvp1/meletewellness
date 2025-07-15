'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Users, 
  Calendar, 
  MessageSquare, 
  TrendingUp, 
  UserPlus, 
  Settings, 
  Bell, 
  Search,
  Filter,
  MoreVertical,
  Eye,
  Star,
  Clock,
  MapPin,
  Phone,
  Loader2,
  Shield,
  ShieldOff
} from 'lucide-react';
import AuthService from '@/services/AuthService';
import { Consultant } from '@/types/types';

// Interface definitions
interface DashboardStat {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

interface StatusInfo {
  status: string;
  color: string;
}

const AdminHome: React.FC = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [consultants, setConsultants] = useState<Consultant[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [blockingConsultant, setBlockingConsultant] = useState<string | null>(null);

  // Fetch consultants from API
  useEffect(() => {
    const fetchConsultants = async (): Promise<void> => {
      try {
        setLoading(true);
        setError(null);
        const data = await AuthService.getCounsellors();
        setConsultants(data);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch counsellors');
        console.error('Error fetching consultants:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchConsultants();
  }, []);

  // Navigation function
  const handleAddCounsellor = (): void => {
    router.push('/admin/add-counsellor');
  };

  // Calculate dashboard stats from real data
  const dashboardStats: DashboardStat[] = [
    {
      title: "Total Counsellors",
      value: consultants.length.toString(),
      change: "+12%",
      trend: "up",
      icon: Users,
      color: "bg-blue-500"
    },
    {
      title: "Active Counsellors",
      value: consultants.filter(c => !Boolean(c.isBlocked) && Boolean(c.isVerified)).length.toString(),
      change: "+8%",
      trend: "up",
      icon: Calendar,
      color: "bg-[#015F4A]"
    },
    {
      title: "Total Sessions",
      value: consultants.reduce((sum, c) => sum + (c.sessions || 0), 0).toLocaleString(),
      change: "+15%",
      trend: "up",
      icon: MessageSquare,
      color: "bg-purple-500"
    },
    {
      title: "Average Rating",
      value: consultants.length > 0 
        ? (consultants.reduce((sum, c) => sum + (c.rating || 0), 0) / consultants.length).toFixed(1)
        : "0.0",
      change: "+0.2",
      trend: "up",
      icon: Star,
      color: "bg-yellow-500"
    }
  ];

  const recentActivities: string[] = [
    "New counsellor application received",
    "Weekly report generated successfully",
    "System maintenance completed",
    "Counsellor verification in progress",
    "Platform analytics updated"
  ];

  // Filter consultants based on search and status
  const filteredConsultants = consultants.filter(consultant => {
    const matchesSearch = consultant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      consultant.expertise.some(exp => exp.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (consultant.specialization || '').toLowerCase().includes(searchTerm.toLowerCase());
    
    let matchesStatus: boolean = true;
    const isBlocked = Boolean(consultant.isBlocked);
    const isVerified = Boolean(consultant.isVerified);
    
    if (statusFilter === 'Active') {
      matchesStatus = !isBlocked && isVerified;
    } else if (statusFilter === 'Inactive') {
      matchesStatus = isBlocked;
    } else if (statusFilter === 'Pending') {
      matchesStatus = !isVerified && !isBlocked;
    }
    
    return matchesSearch && matchesStatus;
  });

  const getStatusInfo = (consultant: Consultant): StatusInfo => {
    const isBlocked = Boolean(consultant.isBlocked);
    const isVerified = Boolean(consultant.isVerified);
    
    if (isBlocked) {
      return { status: 'Blocked', color: 'bg-red-100 text-red-800' };
    } else if (!isVerified) {
      return { status: 'Pending', color: 'bg-yellow-100 text-yellow-800' };
    } else {
      return { status: 'Active', color: 'bg-green-100 text-green-800' };
    }
  };

  const handleBlockUnblock = async (consultant: Consultant): Promise<void> => {
    try {
      setBlockingConsultant(consultant.id);
      setError(null);
      
      const isBlocked = Boolean(consultant.isBlocked);
      
      if (isBlocked) {
        await AuthService.unblockCounsellor(consultant.id);
      } else {
        await AuthService.blockCounsellor(consultant.id);
      }
      
      // Refresh the consultants list
      const updatedConsultants = await AuthService.getCounsellors();
      setConsultants(updatedConsultants);
    } catch (err: any) {
      setError(err.message || 'Failed to update counsellor status');
      console.error('Error updating counsellor status:', err);
    } finally {
      setBlockingConsultant(null);
    }
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>): void => {
    const target = e.target as HTMLImageElement;
    target.src = 'https://via.placeholder.com/48';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-[#015F4A]">Admin Dashboard</h1>
              <p className="text-gray-600 text-sm">Manage counsellors and monitor platform activity</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="p-2 text-gray-500 hover:text-[#015F4A] transition-colors">
                <Bell className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-500 hover:text-[#015F4A] transition-colors">
                <Settings className="w-5 h-5" />
              </button>
              <div className="w-8 h-8 bg-[#015F4A] rounded-full flex items-center justify-center text-white text-sm font-semibold">
                A
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm">{error}</p>
            <button 
              onClick={() => setError(null)} 
              className="mt-2 text-red-700 underline text-sm hover:text-red-800"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {dashboardStats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-medium">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                    <div className="flex items-center mt-2">
                      <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                      <span className="text-green-600 text-sm font-medium">{stat.change}</span>
                      <span className="text-gray-500 text-sm ml-1">vs last month</span>
                    </div>
                  </div>
                  <div className={`${stat.color} p-3 rounded-lg`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Counsellors Management */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-[#015F4A]">Counsellors Management</h2>
                  <button 
                    onClick={handleAddCounsellor}
                    className="bg-[#015F4A] text-white px-4 py-2 rounded-lg hover:bg-[#017A5E] transition-colors flex items-center gap-2"
                  >
                    <UserPlus className="w-4 h-4" />
                    Add Counsellor
                  </button>
                </div>
                
                {/* Search and Filter */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search counsellors..."
                      className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#015F4A] focus:border-transparent"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4 text-gray-400" />
                    <select
                      className="border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#015F4A] focus:border-transparent"
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                    >
                      <option value="All">All Status</option>
                      <option value="Active">Active</option>
                      <option value="Inactive">Blocked</option>
                      <option value="Pending">Pending</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Loading State */}
              {loading && (
                <div className="p-8 text-center">
                  <Loader2 className="w-8 h-8 animate-spin mx-auto text-[#015F4A]" />
                  <p className="mt-2 text-gray-600">Loading counsellors...</p>
                </div>
              )}

              {/* Counsellors List */}
              {!loading && (
                <div className="divide-y divide-gray-100">
                  {filteredConsultants.length === 0 ? (
                    <div className="p-8 text-center">
                      <p className="text-gray-500">No counsellors found</p>
                    </div>
                  ) : (
                    filteredConsultants.slice(0, 4).map((consultant) => {
                      const statusInfo = getStatusInfo(consultant);
                      const isBlocked = Boolean(consultant.isBlocked);
                      const isProcessing = blockingConsultant === consultant.id;
                      
                      return (
                        <div key={consultant.id} className="p-4 hover:bg-gray-50 transition-colors">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <img
                                src={consultant.image || 'https://via.placeholder.com/48'}
                                alt={consultant.name}
                                className="w-12 h-12 rounded-full object-cover border-2 border-gray-100"
                                onError={handleImageError}
                              />
                              <div>
                                <h3 className="font-semibold text-gray-900">{consultant.name}</h3>
                                <p className="text-sm text-gray-600">{consultant.qualification}</p>
                                <div className="flex items-center gap-4 mt-1">
                                  <div className="flex items-center text-xs text-gray-500">
                                    <Star className="w-3 h-3 text-yellow-400 fill-current mr-1" />
                                    {consultant.rating || 0}
                                  </div>
                                  <div className="flex items-center text-xs text-gray-500">
                                    <Calendar className="w-3 h-3 mr-1" />
                                    {consultant.sessions || 0} sessions
                                  </div>
                                  <div className="flex items-center text-xs text-gray-500">
                                    <MapPin className="w-3 h-3 mr-1" />
                                    {consultant.location}
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-3">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusInfo.color}`}>
                                {statusInfo.status}
                              </span>
                              <div className="flex items-center gap-1">
                                <button className="p-1 text-gray-400 hover:text-[#015F4A] transition-colors">
                                  <Eye className="w-4 h-4" />
                                </button>
                                
                                {/* Block/Unblock Button */}
                                <button 
                                  onClick={() => handleBlockUnblock(consultant)}
                                  disabled={isProcessing}
                                  className={`p-1 transition-colors disabled:opacity-50 ${
                                    isBlocked
                                      ? 'text-gray-400 hover:text-green-600' 
                                      : 'text-gray-400 hover:text-red-600'
                                  }`}
                                  title={isBlocked ? 'Unblock Counsellor' : 'Block Counsellor'}
                                >
                                  {isProcessing ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                  ) : isBlocked ? (
                                    <Shield className="w-4 h-4" />
                                  ) : (
                                    <ShieldOff className="w-4 h-4" />
                                  )}
                                </button>
                                
                                <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
                                  <MoreVertical className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-bold text-[#015F4A] mb-4">Recent Activity</h3>
              <div className="space-y-3">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-[#015F4A] rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-600">{activity}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-bold text-[#015F4A] mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button 
                  onClick={handleAddCounsellor}
                  className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <UserPlus className="w-4 h-4 text-[#015F4A]" />
                    <span className="text-sm font-medium">Add New Counsellor</span>
                  </div>
                </button>
                <button className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-4 h-4 text-[#015F4A]" />
                    <span className="text-sm font-medium">View All Sessions</span>
                  </div>
                </button>
                <button className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <TrendingUp className="w-4 h-4 text-[#015F4A]" />
                    <span className="text-sm font-medium">Generate Report</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;