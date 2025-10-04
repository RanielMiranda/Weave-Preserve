import react from 'react';
import Header from '../Components/Header.jsx';
import Hero from './Components/Hero.jsx';
import FeaturedProducts from './Components/Featuredproducts.jsx';
import StoryTelling from './Components/Storytelling.jsx';
import Fundraising from './Components/Fundraising.jsx';
import Footer from '../Components/Footer.jsx';


export default function Home() {
    return (
        <div className = "w-full h-full">
            <Header />
            <Hero />
            <FeaturedProducts />            
            <StoryTelling />
            <Fundraising />
            <Footer />            
        </div>
    ) 
}