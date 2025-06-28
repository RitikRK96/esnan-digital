import React, { useEffect, useState } from 'react';

import { Calendar, MapPin, Camera, Droplets, CheckCircle, Clock, Package } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const SnakeHistory: React.FC = () => {
  const { user } = useAuth();
  const [snanHistory, setSnanHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 bg-green-100';
      case 'active':
        return 'text-yellow-600 bg-yellow-100';
      case 'processing':
        return 'text-blue-600 bg-blue-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return CheckCircle;
      case 'active':
        return Clock;
      case 'processing':
        return Package;
      default:
        return Clock;
    }
  };

  useEffect(() => {
    const fetchSnanHistory = async () => {
      const storageKey = `snanHistory_${user?.id}`;
      const cachedData = sessionStorage.getItem(storageKey);

      try {
        if (cachedData) {
          const parsedData = JSON.parse(cachedData);
          setSnanHistory(parsedData);
        } else {
          const response = await fetch(
            `https://us-central1-esnan-digital-10a7b.cloudfunctions.net/api/snan/${user.id}`
          );
          if (!response.ok) throw new Error('Failed to fetch snan history');

          const data = await response.json();
          const parsedData = Object.values(data || {});
          sessionStorage.setItem(storageKey, JSON.stringify(parsedData));
          setSnanHistory(parsedData);
        }
      } catch (error) {
        console.error('Error fetching snan history:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user && user.id) {
      fetchSnanHistory();
    } else {
      setLoading(false);
    }
  }, [user]);



  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-2xl sm:text-3xl lg:text-5xl font-decorative font-bold text-saffron-800 mb-2 sm:mb-4">
            My Sacred e-Snan History
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Track your spiritual journey and divine blessings received through e-Snan ceremonies
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-saffron-600 mb-2">{snanHistory.length}</div>
            <div className="text-gray-600">Total e-Snan</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">
              {snanHistory.filter((s) => s.status === 'completed').length}
            </div>
            <div className="text-gray-600">Completed</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {snanHistory.filter((s) => s.addPhoto).length}
            </div>
            <div className="text-gray-600">Photos Received</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-spiritual-gold mb-2">
              ₹{snanHistory.reduce((sum, s) => sum + (s.totalAmount || 0), 0)}
            </div>
            <div className="text-gray-600">Total Spent</div>
          </div>
        </div>

        {/* History List */}
        {/* History Cards */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-saffron-600 border-opacity-60"></div>
          </div>
        ) : snanHistory.length > 0 ? (
          <div className="space-y-6">
            {snanHistory.map((snan: any) => {
              const StatusIcon = getStatusIcon(snan.status);
              return (
                <div
                  key={snan.id}
                  className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                      <div className="flex-1 mb-4 lg:mb-0">
                        <div className="flex items-start space-x-4">
                          <div className="flex-shrink-0">
                            {snan.photoUrl && snan.photoUrl !== 'url' ? (
                              <img
                                src={snan.photoUrl}
                                alt="Snan"
                                className="w-20 h-20 rounded-lg object-cover shadow-md"
                              />
                            ) : (
                              <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center">
                                <Camera className="h-8 w-8 text-gray-400" />
                              </div>
                            )}
                          </div>

                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h3 className="text-xl font-semibold text-gray-900">
                                {snan.cityName || 'Unknown'}
                              </h3>
                              <span
                                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                                  snan.status
                                )}`}
                              >
                                <StatusIcon className="h-4 w-4 mr-1" />
                                {snan.status.charAt(0).toUpperCase() + snan.status.slice(1)}
                              </span>
                            </div>

                            <div className="flex items-center text-gray-600 text-sm space-x-4 mb-3">
                              <div className="flex items-center">
                                <Calendar className="h-4 w-4 mr-1" />
                                {new Date(snan.timestamp).toLocaleDateString('en-IN', {
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric'
                                })}
                              </div>
                              <div className="flex items-center">
                                <MapPin className="h-4 w-4 mr-1" />
                                Sacred Ceremony
                              </div>
                            </div>

                            <div className="flex items-center space-x-4 text-sm">
                              {snan.addPhoto && (
                                <div className="flex items-center text-green-600">
                                  <Camera className="h-4 w-4 mr-1" />
                                  Photo Included
                                </div>
                              )}
                              {snan.addHolyWater && (
                                <div className="flex items-center text-blue-600">
                                  <Droplets className="h-4 w-4 mr-1" />
                                  Holy Water Included
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col items-end space-y-2">
                        <div className="text-2xl font-bold text-saffron-600">₹{snan.totalAmount}</div>
                        <div
                          className={`text-sm px-3 py-1 rounded-full ${snan.status === 'completed'
                            ? 'text-green-600 bg-green-100'
                            : 'text-blue-600 bg-blue-100'
                            }`}
                        >
                          {snan.status === 'completed' ? 'Delivered' : 'Will complete soon'}
                        </div>

                        {snan.status === 'completed' && (
                          <button className="text-saffron-600 hover:text-saffron-700 text-sm font-medium">
                            View Certificate
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="mx-auto w-24 h-24 bg-saffron-100 rounded-full flex items-center justify-center mb-4">
              <Calendar className="h-12 w-12 text-saffron-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No e-Snan History Yet</h3>
            <p className="text-gray-600 mb-6">Start your spiritual journey by booking your first e-Snan</p>
            <a
              href="/book-e-snan"
              className="inline-flex items-center px-6 py-3 bg-saffron-600 text-white font-semibold rounded-full hover:bg-saffron-700 transition-colors"
            >
              Book Your First e-Snan
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default SnakeHistory;