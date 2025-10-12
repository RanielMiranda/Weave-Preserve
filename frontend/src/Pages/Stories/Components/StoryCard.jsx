// src/pages/Stories/Components/StoryCard.jsx
import React from 'react';
import { Play, Clock, User, Eye, BookOpen } from 'lucide-react';

const StoryCard = ({ story }) => {

    const TypeIcon = story.type === 'video' ? Play : BookOpen;
    
    // Helper function to format views
    const formatViews = (views) => {
        return views >= 1000 ? `${(views / 1000).toFixed(1)}k` : views;
    };

    let linkPath = `/stories/${story.id}`; 
    if (story.id === 1 && story.type === 'article') {
        linkPath = '/stories/kalinga-patterns'; 
    } else if (story.id === 2 && story.type === 'video') {
        linkPath = '/stories/elena-video'; 
    }

    return (
        <a href={linkPath} className="block">
            <div key={story.id} className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group cursor-pointer">
                
                <div className="relative">
                    {/* Story Image */}
                    <img
                        src={story.image}
                        alt={story.title}
                        className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                        onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/600x400/f3f4f6/333?text=Cultural+Story"; }}
                    />

                    {/* Video Overlay (if type is video) */}
                    {story.type === 'video' && (
                        <div className="absolute inset-0 flex items-center justify-center bg-slate-900/50 transition-opacity opacity-0 group-hover:opacity-100">
                            <Play className="w-12 h-12 text-white fill-current" />
                        </div>
                    )}

                    {/* Type Tag */}
                    <div className="absolute top-4 left-4 flex items-center bg-orange-600/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-white capitalize shadow-md">
                        <TypeIcon className="w-4 h-4 mr-1.5" />
                        {story.type}
                    </div>
                </div>

                <div className="p-6 md:p-8">
                    {/* Title */}
                    <h3 className="font-playfair text-2xl font-bold text-slate-900 mb-3 group-hover:text-orange-700 transition-colors line-clamp-2">
                        {story.title}
                    </h3>
                    
                    {/* Excerpt */}
                    <p className="text-gray-600 mb-4 line-clamp-3">{story.excerpt}</p>
                    
                    {/* Metadata */}
                    <div className="flex items-center justify-between text-sm text-gray-500 border-t border-gray-100 pt-4">
                        <div className="flex items-center space-x-4">
                            {/* Author */}
                            <div className="flex items-center space-x-1">
                                <User className="w-4 h-4 text-orange-500" />
                                <span className="font-medium text-slate-700">{story.author}</span>
                            </div>
                            {/* Read/Watch Time */}
                            <div className="flex items-center space-x-1">
                                <Clock className="w-4 h-4 text-orange-500" />
                                <span>{story.readTime}</span>
                            </div>
                        </div>
                        
                        {/* Views */}
                        <div className="flex items-center space-x-1">
                            <Eye className="w-4 h-4 text-orange-500" />
                            <span>{formatViews(story.views)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </a>
    );
};

export default StoryCard;