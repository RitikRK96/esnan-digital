import React from 'react';
import { Leaf, Heart, Users, Award, TreePine, Droplets } from 'lucide-react';

const About: React.FC = () => {
  const values = [
    {
      icon: Leaf,
      title: 'Environmental Conservation',
      description: 'Reducing pollution and overcrowding at sacred sites while maintaining spiritual connection.'
    },
    {
      icon: Heart,
      title: 'Authentic Spirituality',
      description: 'Traditional vedic rituals performed by qualified priests at authentic holy locations.'
    },
    {
      icon: Users,
      title: 'Accessible Devotion',
      description: 'Making sacred ceremonies accessible to devotees worldwide, regardless of physical limitations.'
    },
    {
      icon: Award,
      title: 'Quality Assurance',
      description: 'Certified priests, blessed waters, and documented ceremonies for your peace of mind.'
    }
  ];

  const impactStats = [
    { value: '2,50,000', label: 'Litres of Sacred Water Saved', icon: Droplets },
    { value: '15,000', label: 'Trees Protected', icon: TreePine },
    { value: '75,000+', label: 'Devotees Served', icon: Users },
    { value: '50+', label: 'Sacred Locations', icon: Award }
  ];

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-decorative font-bold text-saffron-800 mb-6">
            About e-Snan: Digital Devotion for a Sacred Future
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            e-Snan represents a revolutionary approach to traditional spirituality, combining ancient wisdom 
            with modern technology to preserve our sacred heritage while protecting the environment.
          </p>
        </div>

        {/* Mission Section */}
        <div className="bg-gradient-to-r from-saffron-50 to-spiritual-cream rounded-2xl p-8 lg:p-12 mb-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-decorative font-bold text-saffron-800 mb-6">
                Our Sacred Mission
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                In today's world, millions of devotees travel to sacred rivers for spiritual purification, 
                often causing environmental stress and overcrowding. e-Snan offers a solution that honors 
                both our spiritual traditions and Mother Earth.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                Through carefully orchestrated digital ceremonies performed by qualified priests at authentic 
                holy sites, we enable devotees to receive divine blessings while significantly reducing the 
                environmental impact of mass pilgrimage.
              </p>
              <div className="bg-white/70 rounded-lg p-4 border-l-4 border-saffron-600">
                <p className="text-saffron-800 font-medium italic">
                  "Technology in service of spirituality, tradition preserved through innovation."
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/1603111/pexels-photo-1603111.jpg?auto=compress&cs=tinysrgb&w=800"
                alt="Sacred Ganga Aarti"
                className="rounded-xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-saffron-900/20 to-transparent rounded-xl"></div>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-decorative font-bold text-center text-saffron-800 mb-12">
            Our Core Values
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="flex justify-center mb-4">
                  <div className="p-4 bg-saffron-100 rounded-full">
                    <value.icon className="h-8 w-8 text-saffron-600" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* How It Works Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 lg:p-12 mb-16">
          <h2 className="text-3xl font-decorative font-bold text-center text-saffron-800 mb-12">
            How e-Snan Works
          </h2>
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-saffron-600 text-white rounded-full flex items-center justify-center text-2xl font-bold">
                  1
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Book Your e-Snan</h3>
              <p className="text-gray-600">
                Choose your preferred sacred location, date, and additional services through our platform.
              </p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-saffron-600 text-white rounded-full flex items-center justify-center text-2xl font-bold">
                  2
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Sacred Ceremony</h3>
              <p className="text-gray-600">
                Qualified priests perform traditional rituals on your behalf at the chosen holy site.
              </p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-saffron-600 text-white rounded-full flex items-center justify-center text-2xl font-bold">
                  3
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Receive Blessings</h3>
              <p className="text-gray-600">
                Get photos, blessed water, and a certificate of your sacred ceremony delivered to your home.
              </p>
            </div>
          </div>
        </div>

        {/* Impact Statistics */}
        <div className="bg-gradient-to-r from-saffron-800 to-saffron-900 rounded-2xl p-8 lg:p-12 text-white mb-16">
          <h2 className="text-3xl font-decorative font-bold text-center mb-12">
            Our Environmental Impact
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {impactStats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-4 bg-white/20 rounded-full">
                    <stat.icon className="h-8 w-8 text-spiritual-gold" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-spiritual-gold mb-2">{stat.value}</div>
                <div className="text-saffron-100 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Quote Section */}
        <div className="text-center bg-spiritual-cream rounded-2xl p-8 lg:p-12">
          <blockquote className="text-2xl lg:text-3xl font-decorative text-saffron-800 mb-6 italic">
            "Ganga Snan is not just a bath, it's a rebirth of the soul. Through e-Snan, we honor this 
            sacred tradition while protecting the very waters that bless us."
          </blockquote>
          <cite className="text-saffron-600 font-medium">— Ancient Vedic Wisdom, Modern Application</cite>
        </div>
      </div>
    </div>
  );
};

export default About;