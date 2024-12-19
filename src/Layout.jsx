import React from 'react';
import { Navbar, Footer } from './components';

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow mt-20">{children}</main> {/* Añadido mt-20 para dar espacio al navbar */}
            <Footer />
        </div>
    );
};

export default Layout;