import React from 'react';
import { Play, Clock, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Storytelling = () => {
  const stories = [
    {
      id: 1,
      title: "The Sacred Patterns of Kalinga Weaving",
      excerpt: "Discover the spiritual significance behind the geometric patterns that have been passed down through generations of Kalinga weavers.",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      author: "Dr. Maria Cawed",
      readTime: "8 min read",
      type: "article",
      featured: true
    },
    {
      id: 2,
      title: "Voices of the Loom: Elena's Story",
      excerpt: "Meet Elena Baggao, a master weaver from Kalinga who has dedicated her life to preserving traditional techniques.",
      image: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      author: "Documentary Team",
      readTime: "15 min watch",
      type: "video",
      featured: false
    },
    {
      id: 3,
      title: "The Revival of Inabel in Modern Times",
      excerpt: "How young entrepreneurs are bringing traditional Inabel weaving into contemporary fashion and home decor.",
      image: "https://images.unsplash.com/photo-1582582621959-48d27397dc69?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      author: "Sarah Mendoza",
      readTime: "6 min read",
      type: "article",
      featured: false
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Cultural Stories & Heritage
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Immerse yourself in the rich narratives behind each thread, pattern, and tradition 
            that makes Cordillera weaving a living cultural treasure.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Featured Story */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <div className="relative group cursor-pointer">
              <img
                src={stories[0].image}
                alt={stories[0].title}
                className="w-full h-80 object-cover rounded-lg"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent rounded-lg"></div>
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <div className="flex items-center space-x-4 mb-3">
                  <span className="bg-orange-600 px-3 py-1 rounded-full text-sm font-semibold">Featured</span>
                  <span className="bg-purple-400 px-3 py-1 rounded-full text-sm font-semibold capitalize">{stories[0].type}</span>
                </div>
                <h3 className="font-playfair text-2xl font-bold mb-2 group-hover:text-orange-600 transition-colors">
                  {stories[0].title}
                </h3>
                <p className="text-gray-200 mb-4 line-clamp-2">{stories[0].excerpt}</p>
                <div className="flex items-center space-x-4 text-sm text-gray-300">
                  <div className="flex items-center space-x-1">
                    <User className="w-4 h-4" />
                    <span>{stories[0].author}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{stories[0].readTime}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Side Stories */}
          <div className="space-y-6">
            {stories.slice(1).map((story, index) => (
              <motion.div
                key={story.id}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: (index + 1) * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="flex space-x-4">
                  <div className="relative flex-shrink-0">
                    <img
                      src={story.image}
                      alt={story.title}
                      className="w-24 h-24 object-cover rounded-lg"
                      loading="lazy"
                    />
                    {story.type === 'video' && (
                      <div className="absolute inset-0 flex items-center justify-center bg-slate-900/50 rounded-lg">
                        <Play className="w-6 h-6 text-white" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className={`px-2 py-1 rounded text-xs font-semibold capitalize ${
                        story.type === 'video' ? 'bg-fuchsia-100 text-fuchsia-600' : 'bg-purple-100 text-purple-600'
                      }`}>
                        {story.type}
                      </span>
                    </div>
                    <h4 className="font-semibold text-slate-900 mb-2 group-hover:text-orange-600 transition-colors line-clamp-2">
                      {story.title}
                    </h4>
                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">{story.excerpt}</p>
                    <div className="flex items-center space-x-3 text-xs text-gray-500">
                      <span>{story.author}</span>
                      <span>•</span>
                      <span>{story.readTime}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <Link to = '/stories' className="bg-gradient-to-r from-orange-600 to-fuchsia-500 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105">
            Explore All Stories
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Storytelling;