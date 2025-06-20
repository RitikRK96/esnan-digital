import React, { useState, useEffect, useRef } from "react";
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
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

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
  const editSectionRef = useRef<HTMLDivElement>(null);

  const [profileData, setProfileData] = useState<UserProfile>({
    u: "207nCh7oyKXWRUQt88o37kPXKZT2",
    n: "",
    e: "",
    p: "",
    w: "",
    c: "2025-06-19T17:38:37.716Z",
    a: {
      address: "",
      city: "",
      state: "",
      country: "",
      pincode: "",
    },
  });

  const [editData, setEditData] = useState<UserProfile>(profileData);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error"; visible: boolean }>({
    message: "",
    type: "success",
    visible: false,
  });

  useEffect(() => {
    // Initialize edit data with proper phone number formatting
    const initialData = { ...profileData };

    // Set default +91 for phone numbers if they are unavailable or don't start with +91
    if (
      initialData.p === "phone no" ||
      initialData.p === "unavailable" ||
      !initialData.p.startsWith("+91")
    ) {
      initialData.p = "+91 ";
    }
    if (
      initialData.w === "whatsapp no" ||
      initialData.w === "unavailable" ||
      !initialData.w.startsWith("+91")
    ) {
      initialData.w = "+91 ";
    }

    setEditData(initialData);
  }, [profileData]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (toast.visible) {
      timer = setTimeout(() => setToast((prev) => ({ ...prev, visible: false })), 3000);
    }
    return () => clearTimeout(timer);
  }, [toast.visible]);

  const isUnavailable = (value: string) => {
    return (
      value === "" ||
      value === "" ||
      value === "" ||
      !value ||
      value.trim() === ""
    );
  };

  const getDisplayValue = (
    value: string,
    placeholder: string = "Not provided"
  ) => {
    return isUnavailable(value) ? placeholder : value;
  };

  const scrollToEditSection = () => {
    if (editSectionRef.current) {
      editSectionRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    }
  };

  const handleStartEditing = () => {
    setIsEditing(true);
    // Small delay to ensure the edit section is rendered before scrolling
    setTimeout(() => {
      scrollToEditSection();
    }, 100);
  };

  const validateField = (
    field: string,
    value: string,
    isAddress = false
  ): string => {
    if (isAddress) {
      if (isUnavailable(value)) {
        return "Required field";
      }
      return "";
    }

    switch (field) {
      case "n":
        if (!value || value.trim().length < 2) {
          return "Name must be at least 2 characters";
        }
        return "";

      case "e":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          return "Invalid email format";
        }
        return "";

      case "p":
      case "w":
        if (!value.startsWith("+91 ")) {
          return "Must start with +91";
        }
        const phoneNumber = value.replace("+91 ", "").trim();
        if (phoneNumber.length !== 10 || !/^\d{10}$/.test(phoneNumber)) {
          return "Enter valid 10-digit number";
        }
        return "";

      default:
        if (isUnavailable(value)) {
          return "Required field";
        }
        return "";
    }
  };

  const validateAllFields = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Validate basic fields
    newErrors.n = validateField("n", editData.n);
    newErrors.e = validateField("e", editData.e);
    newErrors.p = validateField("p", editData.p);
    newErrors.w = validateField("w", editData.w);

    // Validate address fields
    newErrors["a.address"] = validateField("address", editData.a.address, true);
    newErrors["a.city"] = validateField("city", editData.a.city, true);
    newErrors["a.state"] = validateField("state", editData.a.state, true);
    newErrors["a.country"] = validateField("country", editData.a.country, true);
    newErrors["a.pincode"] = validateField("pincode", editData.a.pincode, true);

    // Additional pincode validation
    if (editData.a.pincode && editData.a.pincode !== "unavailable") {
      if (!/^\d{6}$/.test(editData.a.pincode)) {
        newErrors["a.pincode"] = "PIN must be 6 digits";
      }
    }

    // Remove empty errors
    Object.keys(newErrors).forEach((key) => {
      if (!newErrors[key]) {
        delete newErrors[key];
      }
    });

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      setToast({ message: "Please fix the errors in the form.", type: "error", visible: true });
    }
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    field: string,
    value: string,
    isAddress = false
  ) => {
    if (isAddress) {
      setEditData((prev) => ({
        ...prev,
        a: {
          ...prev.a,
          [field]: value,
        },
      }));

      // Clear error for this field
      const errorKey = `a.${field}`;
      if (errors[errorKey]) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[errorKey];
          return newErrors;
        });
      }
    } else {
      // Handle phone number formatting
      if (field === "p" || field === "w") {
        if (!value.startsWith("+91 ")) {
          value = "+91 " + value.replace(/^\+91\s*/, "");
        }
        // Only allow digits after +91
        const phoneDigits = value.replace("+91 ", "").replace(/\D/g, "");
        if (phoneDigits.length <= 10) {
          value = "+91 " + phoneDigits;
        } else {
          return; // Don't update if more than 10 digits
        }
      }

      setEditData((prev) => ({
        ...prev,
        [field]: value,
      }));

      // Clear error for this field
      if (errors[field]) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[field];
          return newErrors;
        });
      }
    }
  };

  const handleSave = async () => {
    if (!validateAllFields()) {
      return; // Toast for validation errors is handled in validateAllFields
    }

    setLoading(true);
    try {
      // Simulate API call - replace with actual PUT request
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setProfileData(editData);
      setIsEditing(false);
      setErrors({});
      setToast({ message: "Profile updated successfully!", type: "success", visible: true });
    } catch (error) {
      setToast({ message: "Failed to update profile. Please try again.", type: "error", visible: true });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setEditData(profileData);
    setIsEditing(false);
    setErrors({});
  };

  const handleCloseToast = () => {
    setToast((prev) => ({ ...prev, visible: false }));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getUnavailableFieldsCount = () => {
    let count = 0;
    if (isUnavailable(profileData.n)) count++;
    if (isUnavailable(profileData.p) || profileData.p === "+91 ") count++;
    if (isUnavailable(profileData.w) || profileData.w === "+91 ") count++;
    if (isUnavailable(profileData.a.address)) count++;
    if (isUnavailable(profileData.a.city)) count++;
    if (isUnavailable(profileData.a.state)) count++;
    if (isUnavailable(profileData.a.country)) count++;
    if (isUnavailable(profileData.a.pincode)) count++;
    return count;
  };

  const unavailableCount = getUnavailableFieldsCount();

  const stats = [
    {
      icon: Heart,
      label: "e-Snan Completed",
      value: "12",
      color: "text-red-600 bg-red-100",
    },
    {
      icon: Award,
      label: "Sacred Points",
      value: "2,450",
      color: "text-yellow-600 bg-yellow-100",
    },
    {
      icon: Sparkles,
      label: "Blessings Received",
      value: "48",
      color: "text-purple-600 bg-purple-100",
    },
  ];

  const renderField = (
    label: string,
    value: string,
    editValue: string,
    field: string,
    icon: React.ElementType,
    type: string = "text",
    isAddress: boolean = false,
    placeholder: string = ""
  ) => {
    const isFieldUnavailable = isUnavailable(value);
    const errorKey = isAddress ? `a.${field}` : field;
    const hasError = errors[errorKey];

    return (
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          {label}
          {isFieldUnavailable && isEditing && (
            <span className="ml-2 text-xs text-red-600 bg-red-100 px-2 py-1 rounded-full">
              Required
            </span>
          )}
        </label>
        {isEditing ? (
          <div>
            <div className="relative">
              <icon
                className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
              />
              <input
                type={type}
                value={editValue}
                onChange={(e) =>
                  handleInputChange(field, e.target.value, isAddress)
                }
                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-saffron-500 focus:border-transparent ${
                  hasError ? "border-red-500" : "border-gray-300"
                }`}
                placeholder={
                  placeholder ||
                  (isFieldUnavailable ? `Enter ${label.toLowerCase()}` : "")
                }
              />
            </div>
            {hasError && (
              <p className="text-sm text-red-600 flex items-center mt-1">
                <AlertTriangle className="h-4 w-4 mr-1" />
                {hasError}
              </p>
            )}
          </div>
        ) : (
          <div
            className={`flex items-center space-x-3 p-3 rounded-lg ${
              isFieldUnavailable
                ? "bg-red-50 border border-red-200"
                : "bg-gray-50"
            }`}
          >
            <icon
              className={`h-5 w-5 ${
                isFieldUnavailable ? "text-red-500" : "text-gray-500"
              }`}
            />
            <span
              className={`flex-1 ${
                isFieldUnavailable ? "text-red-700 italic" : "text-gray-900"
              }`}
            >
              {getDisplayValue(value, `Add ${label.toLowerCase()}`)}
            </span>
            {isFieldUnavailable && (
              <AlertTriangle className="h-4 w-4 text-red-500" />
            )}
          </div>
        )}
      </div>
    );
  };

  if (!user) {
    return (
      <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-md text-center">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <User className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Please Login
            </h2>
            <p className="text-gray-600">Access your profile by logging in.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-4 sm:py-8 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-5xl font-decorative font-bold text-saffron-800 mb-2 sm:mb-4">
            My Profile
          </h1>
          <p className="text-base sm:text-lg text-gray-600">
            Manage your spiritual journey
          </p>
        </div>

        {/* Profile Completion Alert */}
        {unavailableCount > 0 && (
          <div className="mb-6 sm:mb-8 bg-yellow-50 border border-yellow-200 rounded-xl p-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <AlertTriangle className="h-6 w-6 text-yellow-600 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-yellow-800">
                  Complete Your Profile
                </h3>
                <p className="text-yellow-700 text-sm">
                  {unavailableCount} field{unavailableCount > 1 ? "s" : ""} need
                  {unavailableCount === 1 ? "s" : ""} updating for the best
                  experience.
                </p>
              </div>
              <button
                onClick={handleStartEditing}
                className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors font-semibold text-sm whitespace-nowrap transform hover:scale-105 duration-200"
              >
                Update Now
              </button>
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              {/* Profile Header */}
              <div className="bg-gradient-to-r from-saffron-600 to-saffron-700 p-6 text-white text-center relative">
                <div className="relative inline-block mb-4">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <User className="h-10 w-10 sm:h-12 sm:w-12 text-white" />
                  </div>
                  <button className="absolute bottom-0 right-0 bg-spiritual-gold text-saffron-800 p-2 rounded-full hover:bg-yellow-400 transition-colors">
                    <Camera className="h-4 w-4" />
                  </button>
                </div>
                <h2 className="text-lg sm:text-xl font-semibold mb-1">
                  {getDisplayValue(profileData.n, "Add your name")}
                </h2>
                <p className="text-saffron-100 text-sm">
                  Devotee since {formatDate(profileData.c)}
                </p>

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
                      style={{
                        width: `${((8 - unavailableCount) / 8) * 100}%`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="p-6 space-y-4">
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="text-red-600 bg-red-100 p-2 rounded-full">
                    <Heart className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">e-Snan Completed</div>
                    <div className="font-semibold text-gray-900">12</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="text-yellow-600 bg-yellow-100 p-2 rounded-full">
                    <Award className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Sacred Points</div>
                    <div className="font-semibold text-gray-900">2,450</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="text-purple-600 bg-purple-100 p-2 rounded-full">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Blessings Received</div>
                    <div className="font-semibold text-gray-900">48</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-6 mt-6">
              <h4 className="font-semibold text-gray-900 mb-4">Account Information</h4>
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <Calendar className="h-5 w-5 text-gray-500" />
                <div>
                  <div className="text-sm text-gray-600">Member Since</div>
                  <div className="font-medium text-gray-900">
                    {formatDate(profileData.c)}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg mt-4">
                <Shield className="h-5 w-5 text-gray-500" />
                <div>
                  <div className="text-sm text-gray-600">User ID</div>
                  <div className="font-medium text-gray-900 text-xs truncate">
                    {profileData.u}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Details */}
          <div className="lg:col-span-2" ref={editSectionRef}>
            <div className="bg-white rounded-2xl shadow-lg">
              {/* Header with Edit Button */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 sm:p-6 border-b border-gray-200 gap-3 bg-gradient-to-r from-saffron-600 to-saffron-700 texet-white rounded-t-2xl">
                <div className="flex items-center">
                  <Shield className="h-5 w-5 sm:h-6 sm:w-6 text-white mr-2" />
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold text-white">
                      Personal Information
                    </h3>
                    {unavailableCount > 0 && (
                      <span className="text-xs sm:text-sm text-white">
                        {unavailableCount} field
                        {unavailableCount > 1 ? "s" : ""} need updating
                      </span>
                    )}
                  </div>
                </div>
                {!isEditing ? (
                  <button
                    onClick={handleStartEditing}
                    className="flex items-center space-x-2 px-4 py-2 bg-saffron-600 text-white rounded-lg hover:bg-saffron-700 transition-colors text-sm transform hover:scale-105 duration-200"
                  >
                    <Edit3 className="h-4 w-4" />
                    <span>Edit</span>
                  </button>
                ) : (
                  <div className="flex space-x-2">
                    <button
                      onClick={handleCancel}
                      className="flex items-center space-x-2 px-3 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors text-sm"
                    >
                      <X className="h-4 w-4" />
                      <span>Cancel</span>
                    </button>
                    <button
                      onClick={handleSave}
                      disabled={loading}
                      className="flex items-center space-x-2 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 text-sm"
                    >
                      <Save className="h-4 w-4" />
                      <span>{loading ? "Saving..." : "Save"}</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Form Fields */}
              <div className="p-4 sm:p-6">
                <div className="space-y-6">
                  {/* Basic Information */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-4 text-sm sm:text-base">
                      Basic Details
                    </h4>
                    <div className="grid gap-4 sm:gap-6">
                      {renderField(
                        "Full Name",
                        profileData.n,
                        editData.n,
                        "n",
                        User
                      )}
                      {renderField(
                        "Email Address",
                        profileData.e,
                        editData.e,
                        "e",
                        Mail,
                        "email"
                      )}

                      <div className="grid sm:grid-cols-2 gap-4">
                        {renderField(
                          "Phone Number",
                          profileData.p,
                          editData.p,
                          "p",
                          Phone,
                          "tel",
                          false,
                          "+91 1234567890"
                        )}
                        {renderField(
                          "WhatsApp Number",
                          profileData.w,
                          editData.w,
                          "w",
                          Phone,
                          "tel",
                          false,
                          "+91 1234567890"
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Address Information */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-4 text-sm sm:text-base">
                      Address Details
                    </h4>
                    <div className="space-y-4">
                      {renderField(
                        "Address",
                        profileData.a.address,
                        editData.a.address,
                        "address",
                        MapPin,
                        "text",
                        true
                      )}

                      <div className="grid sm:grid-cols-2 gap-4">
                        {renderField(
                          "City",
                          profileData.a.city,
                          editData.a.city,
                          "city",
                          MapPin,
                          "text",
                          true
                        )}
                        {renderField(
                          "State",
                          profileData.a.state,
                          editData.a.state,
                          "state",
                          MapPin,
                          "text",
                          true
                        )}
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        {renderField(
                          "Country",
                          profileData.a.country,
                          editData.a.country,
                          "country",
                          MapPin,
                          "text",
                          true
                        )}
                        {renderField(
                          "PIN Code",
                          profileData.a.pincode,
                          editData.a.pincode,
                          "pincode",
                          MapPin,
                          "text",
                          true,
                          "123456"
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Account Info */}
                </div>
              </div>

              {isEditing && (
                <div className="p-6 border-t border-gray-200 flex justify-center">
                  <button
                    onClick={handleSave}
                    disabled={loading}
                    className="flex items-center justify-center space-x-2 px-4 py-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 w-full "
                  >
                    <Save className="h-4 w-4" />
                    <span>{loading ? "Saving..." : "Save Changes"}</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Additional Actions */}
        <div className="mt-6 sm:mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 text-center hover:shadow-xl transition-all duration-300">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <Shield className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">
              Privacy Settings
            </h3>
            <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4">
              Manage privacy preferences
            </p>
            <button className="text-blue-600 hover:text-blue-700 font-medium text-xs sm:text-sm">
              Manage Privacy
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 text-center hover:shadow-xl transition-all duration-300">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <Heart className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">
              Spiritual Preferences
            </h3>
            <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4">
              Set preferred temples
            </p>
            <button className="text-green-600 hover:text-green-700 font-medium text-xs sm:text-sm">
              Set Preferences
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 text-center hover:shadow-xl transition-all duration-300 sm:col-span-2 lg:col-span-1">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-saffron-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <Award className="h-5 w-5 sm:h-6 sm:w-6 text-saffron-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">
              Achievements
            </h3>
            <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4">
              View spiritual milestones
            </p>
            <button className="text-saffron-600 hover:text-saffron-700 font-medium text-xs sm:text-sm">
              View Achievements
            </button>
          </div>
        </div>

        {/* Toast Message */}
        {toast.visible && (
          <div
            style={{ zIndex: 999 }}
            className={`fixed bottom-4 left-4 p-4 rounded-lg shadow-lg ${
              toast.type === "success" ? "bg-green-500" : "bg-red-500"
            } text-white flex items-center justify-between max-w-xs transform transition-all duration-300 ease-in-out ${
              toast.visible ? "translate-x-0 opacity-100 scale-100" : "translate-x-[-100%] opacity-0 scale-95"
            }`}
          >
            <span>{toast.message}</span>
            <button
              onClick={handleCloseToast}
              className="ml-4 text-white hover:text-gray-200 transition-colors duration-200"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
