import React, { useState } from 'react';
import { Calendar, MapPin, Camera, Droplets, Plus, ArrowRight, Upload, X, Image } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import AuthModal from '../components/AuthModal';
import { ref, uploadBytes, getDownloadURL, getStorage } from "firebase/storage";
import {storage} from '../firebase'
import b1 from '../../Public/IMG/b1.webp'
import b2 from '../../Public/IMG/b2.jpeg'
import b3 from '../../Public/IMG/b3.jpeg'
import b4 from '../../Public/IMG/b4.jpeg'
import b5 from '../../Public/IMG/b5.avif'
import b6 from '../../Public/IMG/b6.webp'


const BookeSnan: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState('');
  const [photo, setPhoto] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [addPhoto, setAddPhoto] = useState(false);
  const [addHolyWater, setAddHolyWater] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const { user } = useAuth();

  const holyCities = [
    {
      id: 'prayagraj',
      name: 'Prayagraj Sangam',
      description: 'Sacred confluence of Ganga, Yamuna & Saraswati',
      image: b1,
      price: '₹251'
    },
    {
      id: 'haridwar',
      name: 'Haridwar',
      description: 'Gateway to the Gods, Har Ki Pauri',
      image: b2,
      price: '₹121'
    },
    {
      id: 'varanasi',
      name: 'Varanasi',
      description: 'Ancient city of Lord Shiva, Dashashwamedh Ghat',
      image: b3,
      price: '₹131'
    },
    {
      id: 'rishikesh',
      name: 'Rishikesh',
      description: 'Yoga Capital of the World, Triveni Ghat',
      image: b4,
      price: '₹111'
    },
    {
      id: 'ujjain',
      name: 'Ujjain',
      description: 'Sacred Kshipra River, Mahakaleshwar',
      image: b5,
      price: '₹141'
    },
    {
      id: 'nashik',
      name: 'Nashik',
      description: 'Holy Godavari River, Ramkund',
      image: b6,
      price: '₹131'
    }
  ];


  //add payment

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhoto(file);
    }
  };

  const removePhoto = () => {
    setPhoto(null);
  };

  const handleBooking = async () => {
    if (!user) {
      setAuthModalOpen(true);
      return;
    }

    if (!selectedCity || !photo) {
      alert('Please add both city and photo');
      return;
    }

    setLoading(true); // Show loader

    try {
      // Get selected city details
      const selectedCityData = holyCities.find(city => city.id === selectedCity);
      let totalAmount = parseInt(selectedCityData?.price.replace('₹', '') || '0');

      if (addPhoto) totalAmount += 100;
      if (addHolyWater) totalAmount += 300;

      
      const photoRef = ref(storage, `snan_photos/${user.id}_${Date.now()}`);
      const snapshot = await uploadBytes(photoRef,photo);
      const downloadURL = await getDownloadURL(snapshot.ref);

      // === 2. Submit booking to backend ===
      const bookingData = {
        status: "active",
        uid: user.id,
        cityId: selectedCity,
        cityName: selectedCityData?.name,
        photoUrl: downloadURL,
        addPhoto,
        addHolyWater,
        totalAmount,
        email: user.email,
        name: user.name,
        timestamp: Date.now(),
        snanPhoto:"unavailable"
      };

      const bookingRes = await fetch(`https://us-central1-esnan-digital-10a7b.cloudfunctions.net/api/snan/${user.id}/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(bookingData)
      });

      if (!bookingRes.ok) throw new Error('Booking failed');

      // === 3. Success message ===


      sessionStorage.removeItem(`snanHistory_${user.id}`);

      alert(`Booking Confirmed!\n\nDear ${user.name},\n\nYour e-Snan has been booked successfully:\n\nLocation: ${selectedCityData?.name}\nPhoto Package: ${addPhoto ? 'Yes (+₹100)' : 'No'}\nHoly Water: ${addHolyWater ? 'Yes (+₹300)' : 'No'}\nTotal Amount: ₹${totalAmount}\n\nYou will receive updates via email at ${user.email}`);

    } catch (err: any) {
      console.error(err);
      alert("Something went wrong: " + err.message);
    } finally {
      setLoading(false); // Hide loader
    }
  };


  return (
    <>
      {loading && (
        <div className="fixed inset-0 bg-white bg-opacity-70 flex items-center justify-center z-50">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-saffron-600 border-opacity-60"></div>        </div>
      )}

      <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="text-center mb-12">
          <h1 className="text-2xl sm:text-3xl lg:text-5xl font-decorative font-bold text-saffron-800 mb-2 sm:mb-4">
              Book Your Sacred e-Snan
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Choose your preferred holy destination and let our qualified priests perform the sacred ritual on your behalf
            </p>
          </div>

          {/* User Welcome */}
          {user && (
            <div className="bg-saffron-50 border border-saffron-200 rounded-xl p-4 mb-8 text-center">
              <p className="text-saffron-800">
                Welcome, <span className="font-semibold">{user.name}</span>! Ready to book your divine e-Snan?
              </p>
            </div>
          )}

          {/* Holy Cities Grid */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
              <MapPin className="h-6 w-6 text-saffron-600 mr-2" />
              Select Sacred Location
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {holyCities.map((city) => (
                <div
                  key={city.id}
                  className={`relative overflow-hidden rounded-xl cursor-pointer transition-all duration-300 transform hover:scale-105 ${selectedCity === city.id
                    ? 'ring-4 ring-saffron-400 shadow-2xl'
                    : 'shadow-lg hover:shadow-xl'
                    }`}
                  onClick={() => setSelectedCity(city.id)}
                >
                  <div className="aspect-w-16 aspect-h-12">
                    <img
                      src={city.image}
                      alt={city.name}
                      className="w-full h-48 object-cover"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <h3 className="text-xl font-semibold mb-1">{city.name}</h3>
                    <p className="text-sm text-gray-200 mb-2">{city.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold text-spiritual-gold">{city.price}</span>
                      {selectedCity === city.id && (
                        <div className="bg-spiritual-gold text-saffron-900 px-3 py-1 rounded-full text-sm font-semibold">
                          Selected
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Date and Options */}
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            {/* Upload photo section */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Image className="h-5 w-5 text-saffron-600 mr-2" />
                Upload Photo for holy e-snan
              </h3>
              <p className="text-gray-600 mb-4">
                Upload your photo to be included in the e-Snan ceremony. Our priests will hold your photo during the ritual for personalized blessings.
              </p>

              {/* Upload Area */}
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-saffron-400 transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                  id="photo-upload"
                />
                <label htmlFor="photo-upload" className="cursor-pointer">
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-lg font-medium text-gray-900 mb-2">Upload Photo</p>
                  <p className="text-sm text-gray-500">
                    Drag and drop or click to select (Max 1 photo, 1MB)
                  </p>
                </label>
              </div>

              {/* Uploaded Photo Preview */}
              {photo && (
                <div className="mt-6">
                  <h4 className="text-lg font-medium text-gray-900 mb-3">Uploaded Photo</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                    <div className="relative group">
                      <img
                        src={URL.createObjectURL(photo)}
                        alt="Uploaded"
                        className="w-full h-24 object-cover rounded-lg shadow-md"
                      />
                      <button
                        onClick={removePhoto}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="h-4 w-4" />
                      </button>
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all rounded-lg"></div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    This photo will be held by our priests during your e-Snan ceremony for personalized blessings.
                  </p>
                </div>
              )}

            </div>


            {/* Additional Services */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Plus className="h-5 w-5 text-saffron-600 mr-2" />
                Additional Services
              </h3>

              <div className="space-y-4">
                <label className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-saffron-50 cursor-pointer transition-colors">
                  <input
                    type="checkbox"
                    checked={addPhoto}
                    onChange={(e) => setAddPhoto(e.target.checked)}
                    className="h-5 w-5 text-saffron-600 focus:ring-saffron-500 border-gray-300 rounded"
                  />
                  <div className="ml-3 flex-1 flex items-center justify-between">
                    <div className="flex items-center">
                      <Camera className="h-5 w-5 text-gray-500 mr-2" />
                      <span className="font-medium text-gray-900">Photo Delivery</span>
                    </div>
                    <span className="text-saffron-600 font-semibold">+₹100</span>
                  </div>
                </label>

                <label className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-saffron-50 cursor-pointer transition-colors">
                  <input
                    type="checkbox"
                    checked={addHolyWater}
                    onChange={(e) => setAddHolyWater(e.target.checked)}
                    className="h-5 w-5 text-saffron-600 focus:ring-saffron-500 border-gray-300 rounded"
                  />
                  <div className="ml-3 flex-1 flex items-center justify-between">
                    <div className="flex items-center">
                      <Droplets className="h-5 w-5 text-blue-500 mr-2" />
                      <span className="font-medium text-gray-900">Holy Water Delivery</span>
                    </div>
                    <span className="text-saffron-600 font-semibold">+₹300</span>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Photo Upload Section */}


          {/* Booking Summary & Action */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div className="mb-4 lg:mb-0">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Ready to Book?</h3>
                <p className="text-gray-600">
                  {user
                    ? 'Experience the divine blessings of sacred e-Snan from the comfort of your home'
                    : 'Please login to proceed with your booking'
                  }
                </p>

              </div>

              <button
                onClick={handleBooking}
                disabled={!selectedCity || !photo}
                className="group inline-flex items-center px-8 py-4 bg-saffron-600 text-white font-semibold rounded-full hover:bg-saffron-700 disabled:bg-gray-300 disabled:cursor-not-allowed transform hover:scale-105 transition-all duration-200 shadow-lg"
              >
                {user ? 'Proceed to Booking' : 'Login to Book'}
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
      />
    </>
  );
};

export default BookeSnan;