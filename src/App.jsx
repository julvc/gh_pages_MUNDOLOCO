import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import BlogContent from './pages/BlogContent';
import useFetch from './hooks/useFetch';
import Layout from './Layout';

const apiUrl = import.meta.env.VITE_API_URL;

const App = () => {
    const { loading, data, error } = useFetch(`${apiUrl}/api/blogs?populate=*`);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading blogs.</p>;

    return (
        <div>
            <Navbar />
            <Routes>
                <Route path="/" element={<Homepage blogs={data} />} />
                <Route path="/category/:category" element={<BlogContent blogs={data} />} />
                <Route path="/blog/:title" element={<BlogContent blogs={data} />} />
            </Routes>
            <Footer />
        </div>
    );
};

export default App;