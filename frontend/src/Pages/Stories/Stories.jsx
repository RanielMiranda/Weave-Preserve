// src/pages/Stories/Stories.jsx
import React from 'react';
import Header from '../../Components/Header.jsx';
import Footer from '../../Components/Footer.jsx';
// Import the new module
import StoryCard from './Components/StoryCard.jsx'; 
import { Play, Clock, User, Eye } from 'lucide-react'; 

const Stories = () => {
    // Frontend-only/Fake Data Array
    const stories = [
        {
            id: 1,
            title: "The Sacred Patterns of Kalinga Weaving",
            excerpt: "Discover the spiritual significance behind the geometric patterns that have been passed down through generations of Kalinga weavers.",
            image: "https://narrastudio.com/cdn/shop/articles/95DD03DF-1433-4A83-9B49-EA773E3DEA25-3950-000002E817E8DF2E_73430612-aa79-486c-80bb-b7aa8defa30a.JPG?v=1574870438",
            author: "Dr. Maria Cawed",
            readTime: "8 min read",
            type: "article",
            views: 1250
        },
        {
            id: 2,
            title: "Voices of the Loom: Elena's Story",
            excerpt: "Meet Elena Baggao, a master weaver from Kalinga who has dedicated her life to preserving traditional techniques.",
            image: "https://i.ytimg.com/vi/yUE0X4e7iL4/maxresdefault.jpg",
            author: "Documentary Team",
            readTime: "15 min watch",
            type: "video",
            views: 890
        },
    ];

    return (
        <div className="min-h-screen flex flex-col bg-gray-50 font-sans">
            {/* Tailwind utility classes for font family setup (optional but good practice) */}
            <style>{`
                .font-playfair {
                    font-family: 'Playfair Display', serif;
                }
            `}</style>
            
            <main className="flex-grow py-16">
                <section>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h1 className="font-playfair text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                                🎨 Cultural Stories & Heritage
                            </h1>
                            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                                Immerse yourself in the rich narratives behind each thread, pattern, and tradition that makes Cordillera weaving a living cultural treasure.
                            </p>
                        </div>
        
                        {/* Stories Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                            {stories.map((story) => (
                                <StoryCard key={story.id} story={story} />
                            ))}
                        </div>
                    </div>
                </section>
            </main>

            {/* <Footer /> */}
        </div>
    );
};

export default Stories;