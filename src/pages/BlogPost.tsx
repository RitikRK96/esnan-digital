import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, User, Clock, ArrowLeft, Share2, Heart, BookOpen } from 'lucide-react';

const BlogPost: React.FC = () => {
  const { id } = useParams();

  // Mock blog data - in a real app, this would come from an API
  const blogPosts = {
    '1': {
      title: 'The Sacred Waters of Ganga: A Digital Pilgrimage Revolution',
      content: `
        <p>The Ganges, revered as the most sacred river in Hinduism, has been a source of spiritual purification for millions of devotees for thousands of years. Today, as we face unprecedented environmental challenges and global connectivity, the concept of e-Snan emerges as a revolutionary approach to traditional pilgrimage.</p>

        <h2>The Ancient Tradition</h2>
        <p>For millennia, devotees have traveled from across the Indian subcontinent and beyond to bathe in the holy waters of the Ganga. This sacred ritual, known as Snan, is believed to wash away sins and provide spiritual purification. The tradition is deeply rooted in Hindu scriptures and has been passed down through generations.</p>

        <p>The Ganga is not just a river; it is considered a goddess, Ganga Mata, who descended from heaven to earth to purify humanity. The act of bathing in her waters is seen as a direct communion with the divine.</p>

        <h2>Modern Challenges</h2>
        <p>However, the modern world presents unique challenges to this ancient practice:</p>
        <ul>
          <li><strong>Environmental Impact:</strong> Millions of pilgrims visiting sacred sites annually has led to significant environmental stress on these delicate ecosystems.</li>
          <li><strong>Accessibility:</strong> Physical limitations, distance, and financial constraints prevent many devotees from undertaking traditional pilgrimages.</li>
          <li><strong>Overcrowding:</strong> Popular pilgrimage sites often become overcrowded, diminishing the spiritual experience for many.</li>
          <li><strong>Carbon Footprint:</strong> Long-distance travel contributes significantly to carbon emissions and climate change.</li>
        </ul>

        <h2>The Digital Solution</h2>
        <p>e-Snan represents a thoughtful integration of technology with spirituality. Through carefully orchestrated digital ceremonies, qualified priests perform traditional rituals at authentic sacred locations on behalf of devotees worldwide.</p>

        <p>This innovative approach maintains the spiritual authenticity of the ritual while addressing modern challenges:</p>
        <ul>
          <li><strong>Environmental Protection:</strong> Reduces physical footprint on sacred sites</li>
          <li><strong>Global Accessibility:</strong> Makes sacred rituals available to devotees worldwide</li>
          <li><strong>Authentic Experience:</strong> Maintains traditional elements through qualified priests and sacred locations</li>
          <li><strong>Documentation:</strong> Provides photo and video evidence of the ceremony</li>
        </ul>

        <h2>Spiritual Authenticity in the Digital Age</h2>
        <p>Critics might question whether a digital ceremony can provide the same spiritual benefits as physical presence. However, Hindu philosophy has always emphasized the importance of intention (sankalpa) and devotion (bhakti) over mere physical presence.</p>

        <p>The Bhagavad Gita teaches us that God resides in the heart of every devotee. When a sincere devotee participates in an e-Snan ceremony with pure intention and devotion, the spiritual benefits are equally valid.</p>

        <h2>Environmental Impact</h2>
        <p>Each e-Snan ceremony saves approximately:</p>
        <ul>
          <li>50 liters of sacred water</li>
          <li>Reduces carbon emissions by 75% compared to physical pilgrimage</li>
          <li>Minimizes waste generation at sacred sites</li>
          <li>Protects local ecosystems from overcrowding</li>
        </ul>

        <h2>The Future of Digital Devotion</h2>
        <p>As we move forward, e-Snan represents more than just a technological innovation; it's a conscious choice to preserve our sacred traditions while protecting the environment for future generations.</p>

        <p>This approach aligns with the ancient Hindu principle of "Vasudhaiva Kutumbakam" - the world is one family. By embracing digital devotion, we're ensuring that sacred traditions remain accessible to all while protecting the very environment that sustains these holy sites.</p>

        <h2>Conclusion</h2>
        <p>The sacred waters of Ganga continue to flow, carrying with them the prayers and devotion of millions. Through e-Snan, we ensure that these waters remain pure and accessible for generations to come, while maintaining the spiritual essence that has made them sacred for thousands of years.</p>

        <p>In choosing e-Snan, devotees become part of a larger movement toward sustainable spirituality - honoring the past while protecting the future.</p>
      `,
      author: 'Dr. Priya Sharma',
      date: '2024-03-15',
      readTime: '8 min read',
      image: 'https://images.pexels.com/photos/1603111/pexels-photo-1603111.jpg?auto=compress&cs=tinysrgb&w=1200',
      category: 'Digital Devotion'
    },
    '2': {
      title: 'Reducing Carbon Footprint: The Environmental Impact of Digital Snan',
      content: `
        <p>Traditional pilgrimage involves extensive travel, often by air or long-distance road transport, contributing significantly to carbon emissions. A single round-trip flight from Delhi to Varanasi generates approximately 0.2 tons of CO2 per passenger. When multiplied by millions of annual pilgrims, the environmental impact becomes substantial.</p>

        <h2>The Carbon Cost of Traditional Pilgrimage</h2>
        <p>Let's examine the environmental impact of traditional pilgrimage:</p>
        <ul>
          <li><strong>Transportation:</strong> Air travel, trains, and buses contribute to greenhouse gas emissions</li>
          <li><strong>Accommodation:</strong> Hotels and lodges consume energy and resources</li>
          <li><strong>Food and Water:</strong> Increased demand strains local resources</li>
          <li><strong>Waste Generation:</strong> Millions of pilgrims generate significant waste</li>
        </ul>

        <h2>e-Snan: A Sustainable Alternative</h2>
        <p>Digital Snan ceremonies offer a remarkable reduction in environmental impact:</p>
        <ul>
          <li>75% reduction in carbon emissions</li>
          <li>90% less water consumption</li>
          <li>Minimal waste generation</li>
          <li>Reduced pressure on local ecosystems</li>
        </ul>

        <h2>Protecting Sacred Rivers</h2>
        <p>Our holy rivers face unprecedented challenges from pollution and overuse. e-Snan helps protect these sacred waters by reducing physical impact while maintaining spiritual connection.</p>
      `,
      author: 'Environmental Team',
      date: '2024-03-10',
      readTime: '6 min read',
      image: 'https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpg?auto=compress&cs=tinysrgb&w=1200',
      category: 'Environment'
    }
  };

  const post = blogPosts[id as keyof typeof blogPosts];

  if (!post) {
    return (
      <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Article Not Found</h1>
          <p className="text-gray-600 mb-8">The article you're looking for doesn't exist.</p>
          <Link
            to="/blogs"
            className="inline-flex items-center bg-saffron-600 text-white px-6 py-3 rounded-lg hover:bg-saffron-700 transition-colors"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Back to Blogs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        {/* Back Button */}
        <Link
          to="/blogs"
          className="inline-flex items-center text-saffron-600 hover:text-saffron-700 mb-8 font-medium group"
        >
          <ArrowLeft className="mr-2 h-5 w-5 group-hover:-translate-x-1 transition-transform" />
          Back to All Articles
        </Link>

        {/* Article Header */}
        <article className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Hero Image */}
          <div className="aspect-w-16 aspect-h-9">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-64 lg:h-96 object-cover"
            />
          </div>

          {/* Article Content */}
          <div className="p-8 lg:p-12">
            {/* Category Badge */}
            <div className="mb-4">
              <span className="bg-saffron-100 text-saffron-600 px-4 py-2 rounded-full text-sm font-semibold">
                {post.category}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 leading-tight">
              {post.title}
            </h1>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-8 pb-8 border-b border-gray-200">
              <div className="flex items-center">
                <User className="h-5 w-5 mr-2" />
                <span className="font-medium">{post.author}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                <span>{new Date(post.date).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-5 w-5 mr-2" />
                <span>{post.readTime}</span>
              </div>
            </div>

            {/* Article Body */}
            <div 
              className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-headings:font-semibold prose-p:text-gray-700 prose-p:leading-relaxed prose-li:text-gray-700 prose-strong:text-gray-900"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Article Footer */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                {/* Share Buttons */}
                <div className="flex items-center space-x-4">
                  <span className="text-gray-600 font-medium">Share this article:</span>
                  <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors">
                    <Share2 className="h-5 w-5" />
                    <span>Share</span>
                  </button>
                  <button className="flex items-center space-x-2 text-red-600 hover:text-red-700 transition-colors">
                    <Heart className="h-5 w-5" />
                    <span>Like</span>
                  </button>
                </div>

                {/* Read More */}
                <Link
                  to="/blogs"
                  className="inline-flex items-center text-saffron-600 hover:text-saffron-700 font-medium group"
                >
                  <BookOpen className="mr-2 h-5 w-5" />
                  Read More Articles
                </Link>
              </div>
            </div>
          </div>
        </article>

        {/* Related Articles */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Articles</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Link
              to="/blog/2"
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
            >
              <img
                src="https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpg?auto=compress&cs=tinysrgb&w=600"
                alt="Environmental Impact"
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-saffron-600 transition-colors">
                  Reducing Carbon Footprint: The Environmental Impact of Digital Snan
                </h3>
                <p className="text-gray-600 text-sm">
                  Learn how choosing e-Snan over physical pilgrimage can reduce your carbon footprint by up to 75%.
                </p>
              </div>
            </Link>

            <div className="bg-gradient-to-br from-saffron-50 to-spiritual-cream rounded-xl p-6 flex items-center justify-center text-center">
              <div>
                <BookOpen className="h-12 w-12 text-saffron-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Explore More Articles</h3>
                <p className="text-gray-600 mb-4">Discover more insights on spiritual practices and environmental conservation.</p>
                <Link
                  to="/blogs"
                  className="inline-flex items-center bg-saffron-600 text-white px-6 py-3 rounded-lg hover:bg-saffron-700 transition-colors font-semibold"
                >
                  View All Articles
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;