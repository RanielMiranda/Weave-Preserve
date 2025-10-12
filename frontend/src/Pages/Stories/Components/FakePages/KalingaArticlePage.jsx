// src/pages/Stories/KalingaArticlePage.jsx

import React from 'react';
import { Clock, User, Eye, ArrowLeft } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const KalingaArticlePage = () => {
    // Data for Story ID 1
    const story = {
        id: 1,
        title: "The Sacred Patterns of Kalinga Weaving",
        excerpt: "Discover the spiritual significance behind the geometric patterns that have been passed down through generations of Kalinga weavers.",
        image: "https://narrastudio.com/cdn/shop/articles/95DD03DF-1433-4A83-9B49-EA773E3DEA25-3950-000002E817E8DF2E_73430612-aa79-486c-80bb-b7aa8defa30a.JPG?v=1574870438",
        author: "Dr. Maria Cawed",
        readTime: "8 min read",
        type: "article",
        views: 1250,
        // Fake long-form content
        content: [
            "The Kalinga, an indigenous group residing in the Cordillera Administrative Region of the Philippines, holds a deep reverence for their woven textiles. These are not merely garments or blankets; they are visual narratives of social status, history, and cosmological beliefs.",
            "Central to Kalinga weaving are the geometric patterns, particularly the diamond and zigzag motifs. The **'binakol'** pattern, a dizzying optical illusion of intersecting lines, is traditionally believed to ward off evil spirits, protecting the wearer from harm. Other motifs often represent elements of nature, such as mountains, rivers, and the python (or 'sawa'), symbolizing strength and longevity.",
            "The art is strictly passed down from mother to daughter. Learning to weave is a ritualistic process, where young women must not only master the technical skill of the backstrap loom but also internalize the cultural meaning of every thread and color. The vibrant colors—red, black, and white—are carefully sourced from natural dyes, further connecting the cloth to the land.",
            "In modern times, while the techniques remain the same, the weaves have found new life in contemporary fashion. However, for the Kalinga people, the true value of the cloth remains in its spiritual and communal role, binding the past generations with the future."
        ]
    };

    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            <main className="py-12 md:py-20">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white shadow-xl rounded-xl">
                    <button onClick={() => window.history.back()} className="text-white hover:text-orange-800 flex items-center mb-6 transition rounded-full shadow-md bg-orange-600/90 px-2 py-1">
                        <ArrowLeft className="w-5 h-5 mr-2" /> Back to Stories
                    </button>

                    {/* Featured Image */}
                    <img
                        src={story.image}
                        alt={story.title}
                        className="w-full h-96 object-cover rounded-lg mb-8 shadow-lg brightness-75"
                        loading="lazy"
                    />

                    {/* Article Header */}
                    <h1 className="font-playfair text-4xl md:text-5xl font-bold text-slate-900 mb-4 leading-tight">
                        {story.title}
                    </h1>

                    <div className="flex items-center space-x-6 text-base text-gray-500 mb-8 border-b pb-4">
                        <div className="flex items-center space-x-1">
                            <User className="w-4 h-4 text-orange-500" />
                            <span>{story.author}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4 text-orange-500" />
                            <span>{story.readTime}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                            <Eye className="w-4 h-4 text-orange-500" />
                            <span>{story.views} views</span>
                        </div>
                    </div>

                    {/* Article Content */}
                    <div className="prose max-w-none text-lg text-gray-700 pb-10">
                        {story.content.map((paragraph, index) => (
                            <p key={index} className="mb-6">{paragraph}</p>
                        ))}
                    </div>

                    <blockquote className="border-l-4 border-orange-600 pl-4 py-2 italic text-gray-600 mb-10">
                        "The pattern is the prayer, woven into permanence."
                    </blockquote>
                    
                    {/* Call to Action */}
                    <div className="text-center py-6 border-t pt-8">
                        <p className="font-semibold mb-3">Support Kalinga weavers directly.</p>
                        <NavLink to="/marketplace" className="bg-orange-600 text-white px-8 py-3 rounded-full font-bold hover:bg-orange-700 transition">
                            View Kalinga Products
                        </NavLink>
                    </div>

                </div>
            </main>
        </div>
    );
};

export default KalingaArticlePage;