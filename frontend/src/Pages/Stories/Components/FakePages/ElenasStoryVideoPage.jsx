// src/pages/Stories/ElenasStoryVideoPage.jsx

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYoutube, faVimeoV } from "@fortawesome/free-brands-svg-icons";
import { Clock, User, Eye, Play, ArrowLeft } from 'lucide-react';

const ElenasStoryVideoPage = () => {
    // Data for Story ID 2
    const story = {
        id: 2,
        title: "Voices of the Loom: Elena's Story",
        excerpt: "Meet Elena Baggao, a master weaver from Kalinga who has dedicated her life to preserving traditional techniques.",
        image: "https://i.ytimg.com/vi/yUE0X4e7iL4/maxresdefault.jpg",
        author: "Documentary Team",
        readTime: "15 min watch",
        type: "video",
        views: 890,
    };

    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            <main className="py-12 md:py-20">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <button onClick={() => window.history.back()} className="text-white hover:text-orange-800 flex items-center mb-6 transition rounded-full shadow-md bg-orange-600/90 px-2 py-1">
                        <ArrowLeft className="w-5 h-5 mr-2" /> Back to Stories
                    </button>

                    {/* Video Player Mockup */}
                    <div className="relative pt-[56.25%] mb-8 rounded-xl overflow-hidden shadow-2xl bg-black">
                        {/* 16:9 Aspect Ratio container */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <img 
                                src={story.image} 
                                alt="Video Thumbnail"
                                className="w-full h-full object-cover opacity-70"
                            />
                            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                                {/* Mock Play Button */}
                                <div className="p-4 bg-white/30 backdrop-blur-sm rounded-full transition-transform hover:scale-105 cursor-pointer">
                                    <Play className="w-16 h-16 text-white fill-current" />
                                </div>
                            </div>
                            <span className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-md text-sm">
                                15:00
                            </span>
                        </div>
                    </div>

                    {/* Video Details */}
                    <div className="bg-white p-8 rounded-xl shadow-lg">
                        <h1 className="font-playfair text-3xl md:text-4xl font-bold text-slate-900 mb-3">
                            {story.title}
                        </h1>

                        <div className="flex items-center space-x-6 text-base text-gray-500 mb-6 border-b pb-4">
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

                        {/* Video Description */}
                        <h2 className="text-xl font-semibold text-slate-800 mb-3">About the Documentary</h2>
                        <p className="text-gray-700 mb-6">
                            This short documentary introduces **Elena Baggao**, a respected master weaver from a remote Kalinga village. Elena shares her personal journey, discussing the challenges of keeping the traditional craft alive in the face of commercial pressure and how the rhythmic motion of the loom connects her to her ancestors. Her story is a testament to the resilience of cultural heritage.
                        </p>

                        {/* Social/Watch Links Mock */}
                        <div className="pt-4 border-t">
                             <p className="font-semibold mb-2">Watch on other platforms:</p>
                             <div className="flex space-x-4">
                                    {/* YouTube Icon Link */}
                                    <a 
                                        href="https://www.youtube.com" 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="text-red-600 hover:text-red-800 text-2xl"
                                    >
                                        <FontAwesomeIcon icon={faYoutube} /> Youtube
                                    </a>

                                    {/* Vimeo Icon Link */}
                                    <a 
                                        href="https://www.vimeo.com" 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="text-blue-600 hover:text-blue-800 text-2xl"
                                    >
                                        <FontAwesomeIcon icon={faVimeoV} /> Vimeo
                                    </a>
                             </div>
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
};

export default ElenasStoryVideoPage;