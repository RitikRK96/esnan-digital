import React from 'react';
import { Link } from 'react-router-dom';
import { Waves, TreePine, Users, Droplets, ArrowRight, Sparkles } from 'lucide-react';
import backgroundImage from '../../Public/IMG/banner1.png'; // ✅ Update path based on your file structure

const Home: React.FC = () => {
  const stats = [
    { icon: Droplets, value: '2,50,000', label: 'Litres of Ganga Saved', color: 'text-blue-600' },
    { icon: TreePine, value: '15,000', label: 'Trees Saved', color: 'text-green-600' },
    { icon: Users, value: '75,000+', label: 'Devotees Served', color: 'text-saffron-600' },
    { icon: Sparkles, value: '99.8%', label: 'Satisfaction Rate', color: 'text-spiritual-gold' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden text-white">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        ></div>
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px]"></div>

        {/* <div className="relative px-4 py-20 sm:px-6 lg:px-8 lg:py-32"> */}
          <div className="relative px-4 py-16 sm:px-6 lg:px-8 lg:py-20">

          <div className="mx-auto max-w-4xl text-center">
            <div className="flex justify-center mb-8">
              <div className="p-4 bg-white/20 rounded-full backdrop-blur-sm animate-float">
                <Waves className="h-16 w-16 text-spiritual-blue animate-glow" />
              </div>
            </div>

            <h1 className="text-4xl sm:text-6xl font-decorative font-bold mb-6 leading-tight">
              Experience Divinity from Anywhere with e-Snan
            </h1>

            <p className="text-xl sm:text-2xl mb-8 text-saffron-100 leading-relaxed max-w-3xl mx-auto">
              Join the sacred tradition of holy bathing while preserving our precious rivers.
              Connect with divine energy through technology and contribute to environmental conservation.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link
                to="/book-e-snan"
                className="group inline-flex items-center px-8 py-4 bg-spiritual-gold text-saffron-900 font-semibold rounded-full hover:bg-yellow-400 transform hover:scale-105 transition-all duration-200 shadow-2xl"
              >
                Book Your Divine e-Snan
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                to="/about"
                className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-saffron-800 transition-all duration-200"
              >
                Learn More
              </Link>
            </div>

            <div className="text-center text-saffron-100">
              <p className="text-sm mb-2">
                🌿 Eco-Friendly • 🙏 Spiritually Pure • 📱 Digitally Accessible
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-decorative font-bold text-saffron-800 mb-4">
              Our Sacred Impact
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Through digital devotion, we're making a real difference in preserving our sacred rivers and environment
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="flex justify-center mb-4">
                  <div className="p-4 bg-saffron-50 rounded-full group-hover:bg-saffron-100 transition-colors">
                    <stat.icon className={`h-8 w-8 ${stat.color}`} />
                  </div>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gradient-to-r from-saffron-50 to-spiritual-cream">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-decorative font-bold text-saffron-800 mb-4">
              Why Choose e-Snan?
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-blue-100 rounded-full">
                  <Droplets className="h-8 w-8 text-blue-600" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Environmental Protection</h3>
              <p className="text-gray-600">
                Reduce water pollution and overcrowding at sacred sites while maintaining spiritual connection.
              </p>
            </div>

            <div className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-saffron-100 rounded-full">
                  <Sparkles className="h-8 w-8 text-saffron-600" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Authentic Rituals</h3>
              <p className="text-gray-600">
                Traditional vedic ceremonies performed by qualified priests at sacred locations on your behalf.
              </p>
            </div>

            <div className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-green-100 rounded-full">
                  <TreePine className="h-8 w-8 text-green-600" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Accessible Devotion</h3>
              <p className="text-gray-600">
                Connect with divine energy from anywhere, making spirituality accessible to all devotees.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
