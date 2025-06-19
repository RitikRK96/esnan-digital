import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, Clock, ArrowRight, Search, Filter, TreePine, Droplets, Heart, Sparkles } from 'lucide-react';

const Blogs: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Articles', icon: Sparkles },
    { id: 'spiritual-places', name: 'Sacred Places', icon: Heart },
    { id: 'environment', name: 'Environment', icon: TreePine },
    { id: 'digital-devotion', name: 'Digital Devotion', icon: Droplets },
  ];

  const blogPosts = [
    {
      id: 1,
      title: 'The Sacred Waters of Ganga: A Digital Pilgrimage Revolution',
      excerpt: 'Discover how e-Snan is transforming traditional pilgrimage while preserving the sanctity of our holy rivers.',
      content: 'The Ganges, revered as the most sacred river in Hinduism, has been a source of spiritual purification for millions of devotees for thousands of years...',
      category: 'digital-devotion',
      author: 'Dr. Priya Sharma',
      date: '2024-03-15',
      readTime: '8 min read',
      image: 'https://images.pexels.com/photos/1603111/pexels-photo-1603111.jpg?auto=compress&cs=tinysrgb&w=800',
      featured: true
    },
    {
      id: 2,
      title: 'Reducing Carbon Footprint: The Environmental Impact of Digital Snan',
      excerpt: 'Learn how choosing e-Snan over physical pilgrimage can reduce your carbon footprint by up to 75%.',
      content: 'Traditional pilgrimage involves extensive travel, often by air or long-distance road transport, contributing significantly to carbon emissions...',
      category: 'environment',
      author: 'Environmental Team',
      date: '2024-03-10',
      readTime: '6 min read',
      image: 'https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpg?auto=compress&cs=tinysrgb&w=800',
      featured: false
    },
    {
      id: 3,
      title: 'Haridwar: Gateway to the Gods in the Digital Age',
      excerpt: 'Explore the spiritual significance of Haridwar and how digital ceremonies maintain its sacred essence.',
      content: 'Haridwar, literally meaning "Gateway to God," has been a center of Hindu pilgrimage for centuries...',
      category: 'spiritual-places',
      author: 'Pandit Rajesh Kumar',
      date: '2024-03-08',
      readTime: '10 min read',
      image: 'https://images.pexels.com/photos/3680912/pexels-photo-3680912.jpeg?auto=compress&cs=tinysrgb&w=800',
      featured: false
    },
    {
      id: 4,
      title: 'Preserving Sacred Waters: How e-Snan Protects River Ecosystems',
      excerpt: 'Understanding the environmental challenges facing our holy rivers and how digital solutions offer hope.',
      content: 'The sacred rivers of India face unprecedented environmental challenges due to pollution, over-extraction, and climate change...',
      category: 'environment',
      author: 'Dr. Meera Patel',
      date: '2024-03-05',
      readTime: '7 min read',
      image: 'https://images.pexels.com/photos/1000084/pexels-photo-1000084.jpg?auto=compress&cs=tinysrgb&w=800',
      featured: false
    },
    {
      id: 5,
      title: 'Varanasi: The Eternal City Embraces Digital Devotion',
      excerpt: 'How the ancient city of Varanasi is adapting to modern spiritual practices while preserving tradition.',
      content: 'Varanasi, one of the oldest continuously inhabited cities in the world, has witnessed the evolution of spiritual practices...',
      category: 'spiritual-places',
      author: 'Prof. Anand Mishra',
      date: '2024-03-01',
      readTime: '9 min read',
      image: 'https://images.pexels.com/photos/1007025/pexels-photo-1007025.jpg?auto=compress&cs=tinysrgb&w=800',
      featured: false
    },
    {
      id: 6,
      title: 'The Science Behind Sacred Rituals: Digital vs Traditional Ceremonies',
      excerpt: 'Exploring the spiritual and psychological benefits of both traditional and digital religious practices.',
      content: 'Recent studies in neuroscience and psychology have begun to uncover the mechanisms behind the benefits of religious practices...',
      category: 'digital-devotion',
      author: 'Dr. Kavita Singh',
      date: '2024-02-28',
      readTime: '12 min read',
      image: 'https://images.pexels.com/photos/4214159/pexels-photo-4214159.jpeg?auto=compress&cs=tinysrgb&w=800',
      featured: false
    },
    {
      id: 7,
      title: 'Rishikesh: Yoga Capital Leads Digital Spiritual Innovation',
      excerpt: 'How Rishikesh is pioneering the integration of technology with ancient spiritual practices.',
      content: 'Known as the Yoga Capital of the World, Rishikesh has always been at the forefront of spiritual innovation...',
      category: 'spiritual-places',
      author: 'Swami Dharmananda',
      date: '2024-02-25',
      readTime: '8 min read',
      image: 'https://images.pexels.com/photos/2166553/pexels-photo-2166553.jpg?auto=compress&cs=tinysrgb&w=800',
      featured: false
    },
    {
      id: 8,
      title: 'Water Conservation Through Digital Devotion: A Sustainable Future',
      excerpt: 'How e-Snan contributes to water conservation efforts while maintaining spiritual authenticity.',
      content: 'Water scarcity is becoming an increasingly critical issue globally, and India\'s sacred rivers are not immune to this challenge...',
      category: 'environment',
      author: 'Water Conservation Team',
      date: '2024-02-20',
      readTime: '6 min read',
      image: 'https://images.pexels.com/photos/2166711/pexels-photo-2166711.jpg?auto=compress&cs=tinysrgb&w=800',
      featured: false
    }
  ];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredPost = blogPosts.find(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-decorative font-bold text-saffron-800 mb-6">
            Spiritual Wisdom & Environmental Insights
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Explore the intersection of ancient wisdom and modern sustainability through our collection of 
            articles on sacred places, environmental conservation, and digital devotion.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-12">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-saffron-500 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center space-x-2 overflow-x-auto pb-2 lg:pb-0">
              {categories.map((category) => {
                const IconComponent = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-full font-medium transition-all duration-300 whitespace-nowrap ${
                      selectedCategory === category.id
                        ? 'bg-saffron-600 text-white shadow-lg'
                        : 'bg-white text-gray-600 hover:bg-saffron-50 hover:text-saffron-600 shadow-md'
                    }`}
                  >
                    <IconComponent className="h-4 w-4" />
                    <span>{category.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Featured Article */}
        {featuredPost && selectedCategory === 'all' && !searchTerm && (
          <div className="mb-16">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
              <Sparkles className="h-6 w-6 text-saffron-600 mr-2" />
              Featured Article
            </h2>
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden hover:shadow-3xl transition-all duration-300">
              <div className="lg:flex">
                <div className="lg:w-1/2">
                  <img
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    className="w-full h-64 lg:h-full object-cover"
                  />
                </div>
                <div className="lg:w-1/2 p-8 lg:p-12">
                  <div className="flex items-center space-x-2 mb-4">
                    <span className="bg-saffron-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      Featured
                    </span>
                    <span className="text-saffron-600 text-sm font-medium">
                      {categories.find(cat => cat.id === featuredPost.category)?.name}
                    </span>
                  </div>
                  <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4 leading-tight">
                    {featuredPost.title}
                  </h3>
                  <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-1" />
                        {featuredPost.author}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {new Date(featuredPost.date).toLocaleDateString()}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {featuredPost.readTime}
                      </div>
                    </div>
                  </div>
                  <Link
                    to={`/blog/${featuredPost.id}`}
                    className="inline-flex items-center bg-saffron-600 text-white px-6 py-3 rounded-lg hover:bg-saffron-700 transition-colors font-semibold group"
                  >
                    Read Full Article
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Articles Grid */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-8">
            {selectedCategory === 'all' ? 'Latest Articles' : `${categories.find(cat => cat.id === selectedCategory)?.name} Articles`}
          </h2>
          
          {regularPosts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularPosts.map((post, index) => (
                <article 
                  key={post.id} 
                  className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden animate-fadeIn"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="aspect-w-16 aspect-h-9">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center space-x-2 mb-3">
                      <span className="bg-saffron-100 text-saffron-600 px-3 py-1 rounded-full text-xs font-semibold">
                        {categories.find(cat => cat.id === post.category)?.name}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2 hover:text-saffron-600 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-1" />
                        {post.author}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {post.readTime}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">
                        {new Date(post.date).toLocaleDateString()}
                      </span>
                      <Link
                        to={`/blog/${post.id}`}
                        className="text-saffron-600 hover:text-saffron-700 font-semibold text-sm flex items-center group"
                      >
                        Read More
                        <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="mx-auto w-24 h-24 bg-saffron-100 rounded-full flex items-center justify-center mb-4">
                <Search className="h-12 w-12 text-saffron-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Articles Found</h3>
              <p className="text-gray-600 mb-6">Try adjusting your search terms or category filter</p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                }}
                className="bg-saffron-600 text-white px-6 py-3 rounded-lg hover:bg-saffron-700 transition-colors font-semibold"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>

        {/* Newsletter Subscription */}
        <div className="bg-gradient-to-r from-saffron-600 to-saffron-700 rounded-2xl p-8 lg:p-12 text-white text-center">
          <h2 className="text-3xl font-decorative font-bold mb-4">
            Stay Connected with Sacred Wisdom
          </h2>
          <p className="text-saffron-100 text-lg mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter for the latest articles on spiritual practices, 
            environmental conservation, and digital devotion insights.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:ring-2 focus:ring-spiritual-gold focus:outline-none"
            />
            <button className="bg-spiritual-gold text-saffron-900 px-6 py-3 rounded-lg hover:bg-yellow-400 transition-colors font-semibold">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blogs;