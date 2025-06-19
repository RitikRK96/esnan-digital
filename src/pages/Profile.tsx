import React, { useState, useEffect } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Edit3, 
  Save, 
  X, 
  Camera,
  Shield,
  Heart,
  Award,
  Sparkles,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface UserProfile {
  u: string; // user id
  n: string; // name
  e: string; // email
  p: string; // phone
  w: string; // whatsapp
  c: string; // created date
  a: {
    address: string;
    city: string;
    state: string;
    country: string;
    pincode: string;
  };
}

const Profile: React.FC = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [profileData, setProfileData] = useState<UserProfile>({
    u: "207nCh7oyKXWRUQt88o37kPXKZT2",
    n: "Abhishek tiwari",
    e: "abhishektiwari2479@gmail.com",
    p: "phone no",
    w: "whatsapp no",
    c: "2025-06-19T17:38:37.716Z",
    a: {
      address: "unavailable",
      city: "unavailable",
      state: "unavailable",
      country: "unavailable",
      pincode: "unavailable"
    }
  });

  const [editData, setEditData] = useState<UserProfile>(profileData);

  useEffect(() => {
    // Initialize edit data with proper phone number formatting
    const initialData = { ...profileData };
    
    // Set default +91 for phone numbers if they are unavailable or don't start with +91
    if (initialData.p === 'phone no' || initialData.p === 'unavailable' || !initialData.p.startsWith('+91')) {
      initialData.p = '+91 ';
    }
    if (initialData.w === 'whatsapp no' || initialData.w === 'unavailable' || !initialData.w.startsWith('+91')) {
      initialData.w = '+91 ';
    }
    
    setEditData(initialData);
  }, [profileData]);

  const isUnavailable = (value: string) => {
    return value === 'unavailable' || value === 'phone no' || value === 'whatsapp no' || !value || value.trim() === '';
  };

  const validateField = (field: string, value: string, isAddress = false): string => {
    if (isAddress) {
      if (isUnavailable(value)) {
        return 'This field is required. Please update your information.';
      }
      return '';
    }

    switch (field) {
      case 'n':
        if (!value || value.trim().length < 2) {
          return 'Name must be at least 2 characters long';
        }
        return '';
      
      case 'e':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          return 'Please enter a valid email address';
        }
        return '';
      
      case 'p':
      case 'w':
        if (!value.startsWith('+91 ')) {
          return 'Phone number must start with +91';
        }
        const phoneNumber = value.replace('+91 ', '').trim();
        if (phoneNumber.length !== 10 || !/^\d{10}$/.test(phoneNumber)) {
          return 'Please enter a valid 10-digit phone number';
        }
        return '';
      
      default:
        if (isUnavailable(value)) {
          return 'This field is required. Please update your information.';
        }
        return '';
    }
  };

  const validateAllFields = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    // Validate basic fields
    newErrors.n = validateField('n', editData.n);
    newErrors.e = validateField('e', editData.e);
    newErrors.p = validateField('p', editData.p);
    newErrors.w = validateField('w', editData.w);
    
    // Validate address fields
    newErrors['a.address'] = validateField('address', editData.a.address, true);
    newErrors['a.city'] = validateField('city', editData.a.city, true);
    newErrors['a.state'] = validateField('state', editData.a.state, true);
    newErrors['a.country'] = validateField('country', editData.a.country, true);
    newErrors['a.pincode'] = validateField('pincode', editData.a.pincode, true);
    
    // Additional pincode validation
    if (editData.a.pincode && editData.a.pincode !== 'unavailable') {
      if (!/^\d{6}$/.test(editData.a.pincode)) {
        newErrors['a.pincode'] = 'PIN code must be exactly 6 digits';
      }
    }

    // Remove empty errors
    Object.keys(newErrors).forEach(key => {
      if (!newErrors[key]) {
        delete newErrors[key];
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: string, value: string, isAddress = false) => {
    if (isAddress) {
      setEditData(prev => ({
        ...prev,
        a: {
          ...prev.a,
          [field]: value
        }
      }));
      
      // Clear error for this field
      const errorKey = `a.${field}`;
      if (errors[errorKey]) {
        setErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors[errorKey];
          return newErrors;
        });
      }
    } else {
      // Handle phone number formatting
      if (field === 'p' || field === 'w') {
        if (!value.startsWith('+91 ')) {
          value = '+91 ' + value.replace(/^\+91\s*/, '');
        }
        // Only allow digits after +91
        const phoneDigits = value.replace('+91 ', '').replace(/\D/g, '');
        if (phoneDigits.length <= 10) {
          value = '+91 ' + phoneDigits;
        } else {
          return; // Don't update if more than 10 digits
        }
      }
      
      setEditData(prev => ({
        ...prev,
        [field]: value
      }));
      
      // Clear error for this field
      if (errors[field]) {
        setErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors[field];
          return newErrors;
        });
      }
    }
  };

  const handleSave = async () => {
    if (!validateAllFields()) {
      alert('Please fix all validation errors before saving.');
      return;
    }

    setLoading(true);
    try {
      // Simulate API call - replace with actual PUT request
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real app, you would make a PUT request to your API
      // const response = await fetch('/api/profile', {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(editData)
      // });
      
      setProfileData(editData);
      setIsEditing(false);
      setErrors({});
      alert('Profile updated successfully!');
    } catch (error) {
      alert('Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setEditData(profileData);
    setIsEditing(false);
    setErrors({});
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getUnavailableFieldsCount = () => {
    let count = 0;
    if (isUnavailable(profileData.n)) count++;
    if (isUnavailable(profileData.p) || profileData.p === '+91 ') count++;
    if (isUnavailable(profileData.w) || profileData.w === '+91 ') count++;
    if (isUnavailable(profileData.a.address)) count++;
    if (isUnavailable(profileData.a.city)) count++;
    if (isUnavailable(profileData.a.state)) count++;
    if (isUnavailable(profileData.a.country)) count++;
    if (isUnavailable(profileData.a.pincode)) count++;
    return count;
  };

  const unavailableCount = getUnavailableFieldsCount();

  const stats = [
    { icon: Heart, label: 'e-Snan Completed', value: '12', color: 'text-red-600 bg-red-100' },
    { icon: Award, label: 'Sacred Points', value: '2,450', color: 'text-yellow-600 bg-yellow-100' },
    { icon: Sparkles, label: 'Blessings Received', value: '48', color: 'text-purple-600 bg-purple-100' },
  ];

  const renderField = (
    label: string,
    value: string,
    editValue: string,
    field: string,
    icon: React.ElementType,
    type: string = 'text',
    isAddress: boolean = false,
    isTextarea: boolean = false
  ) => {
    const isFieldUnavailable = isUnavailable(value);
    const errorKey = isAddress ? `a.${field}` : field;
    const hasError = errors[errorKey];

    return (
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
          {isFieldUnavailable && (
            <span className="ml-2 text-xs text-red-600 bg-red-100 px-2 py-1 rounded-full">
              Needs Update
            </span>
          )}
        </label>
        {isEditing ? (
          <div>
            {isTextarea ? (
              <textarea
                value={editValue}
                onChange={(e) => handleInputChange(field, e.target.value, isAddress)}
                rows={3}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-saffron-500 focus:border-transparent ${
                  hasError ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder={isFieldUnavailable ? `Please enter your ${label.toLowerCase()}` : ''}
              />
            ) : (
              <input
                type={type}
                value={editValue}
                onChange={(e) => handleInputChange(field, e.target.value, isAddress)}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-saffron-500 focus:border-transparent ${
                  hasError ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder={isFieldUnavailable ? `Please enter your ${label.toLowerCase()}` : ''}
              />
            )}
            {hasError && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <AlertTriangle className="h-4 w-4 mr-1" />
                {hasError}
              </p>
            )}
          </div>
        ) : (
          <div className={`flex items-center space-x-3 p-3 rounded-lg ${
            isFieldUnavailable ? 'bg-red-50 border border-red-200' : 'bg-gray-50'
          }`}>
            <icon className={`h-5 w-5 ${isFieldUnavailable ? 'text-red-500' : 'text-gray-500'}`} />
            <span className={`${isFieldUnavailable ? 'text-red-700 italic' : 'text-gray-900'}`}>
              {isFieldUnavailable ? `Please update your ${label.toLowerCase()}` : value}
            </span>
            {isFieldUnavailable && <AlertTriangle className="h-4 w-4 text-red-500" />}
          </div>
        )}
      </div>
    );
  };

  if (!user) {
    return (
      <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <div className="bg-white rounded-2xl shadow-lg p-12">
            <User className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Please Login</h2>
            <p className="text-gray-600">You need to be logged in to view your profile.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-decorative font-bold text-saffron-800 mb-4">
            My Sacred Profile
          </h1>
          <p className="text-lg text-gray-600">
            Manage your spiritual journey and personal information
          </p>
        </div>

        {/* Profile Completion Alert */}
        {unavailableCount > 0 && (
          <div className="mb-8 bg-yellow-50 border border-yellow-200 rounded-xl p-4">
            <div className="flex items-center">
              <AlertTriangle className="h-6 w-6 text-yellow-600 mr-3" />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-yellow-800">Complete Your Profile</h3>
                <p className="text-yellow-700">
                  You have {unavailableCount} field{unavailableCount > 1 ? 's' : ''} that need{unavailableCount === 1 ? 's' : ''} to be updated. 
                  Complete your profile to get the best e-Snan experience.
                </p>
              </div>
              <button
                onClick={() => setIsEditing(true)}
                className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors font-semibold"
              >
                Update Now
              </button>
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              {/* Profile Header */}
              <div className="bg-gradient-to-r from-saffron-600 to-saffron-700 p-6 text-white text-center">
                <div className="relative inline-block mb-4">
                  <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <User className="h-12 w-12 text-white" />
                  </div>
                  <button className="absolute bottom-0 right-0 bg-spiritual-gold text-saffron-800 p-2 rounded-full hover:bg-yellow-400 transition-colors">
                    <Camera className="h-4 w-4" />
                  </button>
                </div>
                <h2 className="text-xl font-semibold mb-1">
                  {isUnavailable(profileData.n) ? 'Please update your name' : profileData.n}
                </h2>
                <p className="text-saffron-100 text-sm">Devotee since {formatDate(profileData.c)}</p>
                
                {/* Profile Completion */}
                <div className="mt-4 bg-white/20 rounded-lg p-3">
                  <div className="flex items-center justify-between text-sm">
                    <span>Profile Completion</span>
                    <span className="font-semibold">
                      {Math.round(((8 - unavailableCount) / 8) * 100)}%
                    </span>
                  </div>
                  <div className="mt-2 bg-white/20 rounded-full h-2">
                    <div 
                      className="bg-spiritual-gold h-2 rounded-full transition-all duration-300"
                      style={{ width: `${((8 - unavailableCount) / 8) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="p-6">
                <div className="space-y-4">
                  {stats.map((stat, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className={`p-2 rounded-full ${stat.color}`}>
                        <stat.icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm text-gray-600">{stat.label}</div>
                        <div className="font-semibold text-gray-900">{stat.value}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Profile Details */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg">
              {/* Header with Edit Button */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                  <Shield className="h-6 w-6 text-saffron-600 mr-2" />
                  Personal Information
                  {unavailableCount > 0 && (
                    <span className="ml-3 bg-red-100 text-red-600 px-2 py-1 rounded-full text-xs font-medium">
                      {unavailableCount} fields need update
                    </span>
                  )}
                </h3>
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center space-x-2 px-4 py-2 bg-saffron-600 text-white rounded-lg hover:bg-saffron-700 transition-colors"
                  >
                    <Edit3 className="h-4 w-4" />
                    <span>Edit Profile</span>
                  </button>
                ) : (
                  <div className="flex space-x-2">
                    <button
                      onClick={handleCancel}
                      className="flex items-center space-x-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                    >
                      <X className="h-4 w-4" />
                      <span>Cancel</span>
                    </button>
                    <button
                      onClick={handleSave}
                      disabled={loading}
                      className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                    >
                      <Save className="h-4 w-4" />
                      <span>{loading ? 'Saving...' : 'Save Changes'}</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Form Fields */}
              <div className="p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Basic Information */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-900 mb-4">Basic Details</h4>
                    
                    {renderField('Full Name', profileData.n, editData.n, 'n', User)}
                    {renderField('Email Address', profileData.e, editData.e, 'e', Mail, 'email')}
                    {renderField('Phone Number', profileData.p, editData.p, 'p', Phone, 'tel')}
                    {renderField('WhatsApp Number', profileData.w, editData.w, 'w', Phone, 'tel')}
                  </div>

                  {/* Address Information */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-900 mb-4">Address Details</h4>
                    
                    {renderField('Street Address', profileData.a.address, editData.a.address, 'address', MapPin, 'text', true, true)}
                    
                    <div className="grid grid-cols-2 gap-4">
                      {renderField('City', profileData.a.city, editData.a.city, 'city', MapPin, 'text', true)}
                      {renderField('State', profileData.a.state, editData.a.state, 'state', MapPin, 'text', true)}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      {renderField('Country', profileData.a.country, editData.a.country, 'country', MapPin, 'text', true)}
                      {renderField('PIN Code', profileData.a.pincode, editData.a.pincode, 'pincode', MapPin, 'text', true)}
                    </div>
                  </div>
                </div>

                {/* Account Info */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-4">Account Information</h4>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <Calendar className="h-5 w-5 text-gray-500" />
                      <div>
                        <div className="text-sm text-gray-600">Member Since</div>
                        <div className="font-medium text-gray-900">{formatDate(profileData.c)}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <Shield className="h-5 w-5 text-gray-500" />
                      <div>
                        <div className="text-sm text-gray-600">User ID</div>
                        <div className="font-medium text-gray-900 text-xs">{profileData.u}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Actions */}
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Privacy Settings</h3>
            <p className="text-gray-600 text-sm mb-4">Manage your privacy and security preferences</p>
            <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
              Manage Privacy
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Spiritual Preferences</h3>
            <p className="text-gray-600 text-sm mb-4">Set your preferred temples and rituals</p>
            <button className="text-green-600 hover:text-green-700 font-medium text-sm">
              Set Preferences
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300">
            <div className="w-12 h-12 bg-saffron-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="h-6 w-6 text-saffron-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Achievements</h3>
            <p className="text-gray-600 text-sm mb-4">View your spiritual journey milestones</p>
            <button className="text-saffron-600 hover:text-saffron-700 font-medium text-sm">
              View Achievements
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;