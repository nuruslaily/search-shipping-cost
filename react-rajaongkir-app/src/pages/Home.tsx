import React from 'react';
import '../App.css'; 
import ImageCarousel from '../components/image-carousel';

const Home: React.FC = () => {

    return (
        <>
            <div className="navbar">
                <div className="logo">
                    <img src={'../../logo.png'} alt={"Raja Ongkir"} style={{ width: '100%', borderRadius: '8px' }}  />
                </div>
                <ul className="nav-links">
                    <li><a href="/">Home</a></li>
                    <li><a href="#">About</a></li>
                    <li><a href="#">Services</a></li>
                    <li><a href="#">Contact</a></li>
                    <li><a href='/login'>Login</a></li>
                </ul>
            </div>
            <div className="home-container">
                <ImageCarousel />
            </div>
        </>

    );
};

export default Home;
