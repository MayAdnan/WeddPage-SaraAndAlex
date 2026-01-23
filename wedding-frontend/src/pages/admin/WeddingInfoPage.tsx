import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { adminApi } from '../../api/adminApi';
import type { WeddingInfoUpdate } from '../../types';
import { useAuth } from '../../contexts/AuthContext';
import { 
  ArrowLeft, 
  Save, 
  Loader2, 
  AlertCircle, 
  Check,
  Heart,
  LogOut
} from 'lucide-react';

const WeddingInfoPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const { logout } = useAuth();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<WeddingInfoUpdate>();

  useEffect(() => {
    const fetchWeddingInfo = async () => {
      try {
        const info = await adminApi.getWeddingInfo();
        // Format dates for datetime-local input
        reset({
          ...info,
          weddingDate: info.weddingDate ? info.weddingDate.slice(0, 16) : '',
          ceremonyTime: info.ceremonyTime ? info.ceremonyTime.slice(0, 16) : '',
          receptionTime: info.receptionTime ? info.receptionTime.slice(0, 16) : '',
        });
      } catch {
        // Wedding info might not exist yet
        reset({
          brideName: '',
          groomName: '',
          weddingDate: '',
          venueName: '',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchWeddingInfo();
  }, [reset]);

  const onSubmit = async (data: WeddingInfoUpdate) => {
    setSaving(true);
    setError(null);
    setSuccess(false);

    try {
      await adminApi.updateWeddingInfo(data);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch {
      setError('Failed to save wedding information. Please try again.');
    } finally {
      setSaving(false);
    }
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
            <h1 className="text-2xl font-serif text-wedding-forest">Wedding Information</h1>
          </div>
          <div className="flex items-center gap-4">
            <Link
              to="/admin/dashboard"
              className="flex items-center gap-2 text-gray-600 hover:text-wedding-sage transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="hidden sm:inline">Dashboard</span>
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

      <main className="max-w-3xl mx-auto px-4 py-8">
        {/* Messages */}
        {error && (
          <div className="mb-6 flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="mb-6 flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 animate-fade-in">
            <Check className="w-5 h-5 flex-shrink-0" />
            <span>Wedding information saved successfully!</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="card">
          <div className="space-y-6">
            {/* Couple Names */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="brideName" className="block text-sm font-medium text-gray-700 mb-2">
                  Bride's Name *
                </label>
                <input
                  {...register('brideName', { required: 'Bride name is required' })}
                  type="text"
                  id="brideName"
                  className="input-field"
                  placeholder="Sara"
                />
                {errors.brideName && (
                  <p className="mt-1 text-sm text-red-500">{errors.brideName.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="groomName" className="block text-sm font-medium text-gray-700 mb-2">
                  Groom's Name *
                </label>
                <input
                  {...register('groomName', { required: 'Groom name is required' })}
                  type="text"
                  id="groomName"
                  className="input-field"
                  placeholder="Alex"
                />
                {errors.groomName && (
                  <p className="mt-1 text-sm text-red-500">{errors.groomName.message}</p>
                )}
              </div>
            </div>

            {/* Date and Times */}
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label htmlFor="weddingDate" className="block text-sm font-medium text-gray-700 mb-2">
                  Wedding Date *
                </label>
                <input
                  {...register('weddingDate', { required: 'Wedding date is required' })}
                  type="datetime-local"
                  id="weddingDate"
                  className="input-field"
                />
                {errors.weddingDate && (
                  <p className="mt-1 text-sm text-red-500">{errors.weddingDate.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="ceremonyTime" className="block text-sm font-medium text-gray-700 mb-2">
                  Ceremony Time
                </label>
                <input
                  {...register('ceremonyTime')}
                  type="datetime-local"
                  id="ceremonyTime"
                  className="input-field"
                />
              </div>

              <div>
                <label htmlFor="receptionTime" className="block text-sm font-medium text-gray-700 mb-2">
                  Reception Time
                </label>
                <input
                  {...register('receptionTime')}
                  type="datetime-local"
                  id="receptionTime"
                  className="input-field"
                />
              </div>
            </div>

            {/* Venue */}
            <div>
              <label htmlFor="venueName" className="block text-sm font-medium text-gray-700 mb-2">
                Venue Name *
              </label>
              <input
                {...register('venueName', { required: 'Venue name is required' })}
                type="text"
                id="venueName"
                className="input-field"
                placeholder="Rose Garden Estate"
              />
              {errors.venueName && (
                <p className="mt-1 text-sm text-red-500">{errors.venueName.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="venueAddress" className="block text-sm font-medium text-gray-700 mb-2">
                Venue Address
              </label>
              <input
                {...register('venueAddress')}
                type="text"
                id="venueAddress"
                className="input-field"
                placeholder="123 Garden Lane, Beautiful City"
              />
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Description / Our Story
              </label>
              <textarea
                {...register('description')}
                id="description"
                rows={4}
                className="input-field resize-none"
                placeholder="Share your love story with your guests..."
              />
            </div>

            {/* Dress Code */}
            <div>
              <label htmlFor="dressCode" className="block text-sm font-medium text-gray-700 mb-2">
                Dress Code
              </label>
              <input
                {...register('dressCode')}
                type="text"
                id="dressCode"
                className="input-field"
                placeholder="Semi-formal / Garden Party Attire"
              />
            </div>

            {/* Contact Info */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700 mb-2">
                  Contact Email
                </label>
                <input
                  {...register('contactEmail')}
                  type="email"
                  id="contactEmail"
                  className="input-field"
                  placeholder="wedding@example.com"
                />
              </div>

              <div>
                <label htmlFor="contactPhone" className="block text-sm font-medium text-gray-700 mb-2">
                  Contact Phone
                </label>
                <input
                  {...register('contactPhone')}
                  type="tel"
                  id="contactPhone"
                  className="input-field"
                  placeholder="+1 (555) 123-4567"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={saving}
                className="btn-primary w-full flex items-center justify-center gap-2"
              >
                {saving ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    Save Wedding Information
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
};

export default WeddingInfoPage;

