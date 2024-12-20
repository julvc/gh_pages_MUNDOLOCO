// src/App.jsx
import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Homepage from './pages/Homepage';
import BlogContent from './pages/BlogContent';
import Layout from './Layout';
import Navbar from './components/Navbar';

const App = () => {
    const [blogs, setBlogs] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchCategories();
        fetchBlogs();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/categories`);
            const data = await response.json();
            setCategories(data.data);
        } catch (err) {
            setError('Error loading categories.');
        }
    };

    const fetchBlogs = async (categoryId = null) => {
        setLoading(true);
        let url = `${import.meta.env.VITE_API_URL}/api/blogs?populate=*`;
        if (categoryId) {
            url += `&filters[category][id][$eq]=${categoryId}`;
        }

        try {
            const response = await fetch(url);
            const data = await response.json();
            setBlogs(data.data);
        } catch (err) {
            setError('Error loading blogs.');
        } finally {
            setLoading(false);
        }
    };

    const handleFilter = (categoryId) => {
        fetchBlogs(categoryId);
        navigate('/'); // Opcional: redirigir al home después de filtrar
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <Layout>
            <Navbar categories={categories} onFilter={handleFilter} />
            <Routes>
                <Route path="/" element={<Homepage blogs={blogs} />} />
                <Route path="/category/:category" element={<BlogContent blogs={blogs} />} />
                <Route path="/blog/:slug" element={<BlogContent blogs={blogs} />} />
            </Routes>
        </Layout>
    );
};

export default App;