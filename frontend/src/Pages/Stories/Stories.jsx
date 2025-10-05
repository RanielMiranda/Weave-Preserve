import React from 'react';
import Header from '../../Components/Header.jsx';
import Footer from '../../Components/Footer.jsx';
import { Play, Clock, User, Eye } from 'lucide-react';

    const Stories = () => {
      const stories = [
        {
          id: 1,
          title: "The Sacred Patterns of Kalinga Weaving",
          excerpt: "Discover the spiritual significance behind the geometric patterns that have been passed down through generations of Kalinga weavers.",
          image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          author: "Dr. Maria Cawed",
          readTime: "8 min read",
          type: "article",
          views: 1250
        },
        {
          id: 2,
          title: "Voices of the Loom: Elena's Story",
          excerpt: "Meet Elena Baggao, a master weaver from Kalinga who has dedicated her life to preserving traditional techniques.",
          image: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          author: "Documentary Team",
          readTime: "15 min watch",
          type: "video",
          views: 890
        },
        {
          id: 3,
          title: "The Revival of Inabel in Modern Times",
          excerpt: "How young entrepreneurs are bringing traditional Inabel weaving into contemporary fashion and home decor.",
          image: "https://images.unsplash.com/photo-1582582621959-48d27397dc69?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          author: "Sarah Mendoza",
          readTime: "6 min read",
          type: "article",
          views: 650
        }
      ];

      return (
        <div className="min-h-screen">
          <Header />
          <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h1 className="font-playfair text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                  Cultural Stories & Heritage
                </h1>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Immerse yourself in the rich narratives behind each thread, pattern, and tradition that makes Cordillera weaving a living cultural treasure.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {stories.map((story) => (
                  <div key={story.id} className="bg-gray-50 rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group cursor-pointer">
                    <div className="relative">
                      <img
                        src={story.image}
                        alt={story.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                      {story.type === 'video' && (
                        <div className="absolute inset-0 flex items-center justify-center bg-slate-900/50 rounded-lg">
                          <Play className="w-8 h-8 text-white" />
                        </div>
                      )}
                      <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-slate-900 capitalize">
                        {story.type}
                      </div>
                    </div>

                    <div className="p-6">
                      <h3 className="font-playfair text-xl font-bold text-slate-900 mb-3 group-hover:text-orange-600 transition-colors">
                        {story.title}
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-3">{story.excerpt}</p>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-1">
                            <User className="w-4 h-4" />
                            <span>{story.author}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{story.readTime}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Eye className="w-4 h-4" />
                          <span>{story.views}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
          <Footer />
        </div>
      );
    };

    export default Stories;