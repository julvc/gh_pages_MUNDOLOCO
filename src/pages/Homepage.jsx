import React from 'react';
import { Blogs } from '../components';

const Homepage = ({ blogs }) => {
    return (
        <div className="pt-[120px]"> {/* Ajusta 120px a la altura del Navbar */}
            <Blogs blogs={blogs ? blogs : ''} />
        </div>
    );
};

export default Homepage;