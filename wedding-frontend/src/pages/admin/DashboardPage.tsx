import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { adminApi } from '../../api/adminApi';
import type { RsvpResponse, RsvpStats } from '../../types';
import { useAuth } from '../../contexts/AuthContext';
import { 
  Users, 
  UserCheck, 
  UserX, 
  Utensils, 
  LogOut, 
  Settings, 
  Loader2,
  AlertCircle,
  Heart,
  Calendar
} from 'lucide-react';

const DashboardPage: React.FC = () => {
  const [rsvps, setRsvps] = useState<RsvpResponse[]>([]);
  const [stats, setStats] = useState<RsvpStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { logout } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [rsvpData, statsData] = await Promise.all([
          adminApi.getRsvps(),
          adminApi.getRsvpStats(),
        ]);
        setRsvps(rsvpData);
        setStats(statsData);
      } catch {
        setError('Failed to load data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-wedding-ivory">
        <Loader2 className="w-12 h-12 animate-spin text-wedding-sage" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-wedding-ivory">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Heart className="w-8 h-8 text-wedding-sage" fill="#9CAF88" />
            <h1 className="text-2xl font-serif text-wedding-forest">Admin Dashboard</h1>
          </div>
          <div className="flex items-center gap-4">
            <Link
              to="/admin/wedding-info"
              className="flex items-center gap-2 text-gray-600 hover:text-wedding-sage transition-colors"
            >
              <Settings className="w-5 h-5" />
              <span className="hidden sm:inline">Wedding Info</span>
            </Link>
            <button
              onClick={logout}
              className="flex items-center gap-2 text-gray-600 hover:text-red-500 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Error Message */}
        {error && (
          <div className="mb-6 flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="card flex items-center gap-4">
              <div className="w-12 h-12 bg-wedding-blush rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-wedding-rose" />
              </div>
              <div>
                <p className="text-2xl font-serif text-wedding-forest">{stats.totalResponses}</p>
                <p className="text-sm text-gray-600">Total Responses</p>
              </div>
            </div>

            <div className="card flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <UserCheck className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-serif text-wedding-forest">{stats.attendingCount}</p>
                <p className="text-sm text-gray-600">Attending</p>
              </div>
            </div>

            <div className="card flex items-center gap-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <UserX className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <p className="text-2xl font-serif text-wedding-forest">{stats.notAttendingCount}</p>
                <p className="text-sm text-gray-600">Not Attending</p>
              </div>
            </div>

            <div className="card flex items-center gap-4">
              <div className="w-12 h-12 bg-wedding-sage/20 rounded-full flex items-center justify-center">
                <Utensils className="w-6 h-6 text-wedding-sage" />
              </div>
              <div>
                <p className="text-2xl font-serif text-wedding-forest">{stats.totalGuests}</p>
                <p className="text-sm text-gray-600">Total Guests</p>
              </div>
            </div>
          </div>
        )}

        {/* RSVP List */}
        <div className="card">
          <h2 className="text-xl font-serif text-wedding-forest mb-6 flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            RSVP Responses
          </h2>

          {rsvps.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No RSVP responses yet</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Name</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Email</th>
                    <th className="text-center py-3 px-4 font-medium text-gray-700">Status</th>
                    <th className="text-center py-3 px-4 font-medium text-gray-700">Guests</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Dietary</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Submitted</th>
                  </tr>
                </thead>
                <tbody>
                  {rsvps.map((rsvp) => (
                    <tr key={rsvp.id} className="border-b border-gray-100 hover:bg-wedding-blush/20 transition-colors">
                      <td className="py-4 px-4">
                        <span className="font-medium text-gray-900">{rsvp.fullName}</span>
                      </td>
                      <td className="py-4 px-4 text-gray-600">{rsvp.email}</td>
                      <td className="py-4 px-4 text-center">
                        {rsvp.isAttending ? (
                          <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                            <UserCheck className="w-4 h-4" />
                            Attending
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm">
                            <UserX className="w-4 h-4" />
                            Declined
                          </span>
                        )}
                      </td>
                      <td className="py-4 px-4 text-center text-gray-600">
                        {rsvp.isAttending ? rsvp.numberOfGuests : '-'}
                      </td>
                      <td className="py-4 px-4 text-gray-600 max-w-[200px] truncate">
                        {rsvp.dietaryRestrictions || '-'}
                      </td>
                      <td className="py-4 px-4 text-gray-500 text-sm">
                        {formatDate(rsvp.submittedAt)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;

