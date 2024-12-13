import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import BlogContent from './pages/BlogContent';
import useFetch from './hooks/useFetch';
import Layout from './Layout';

const App = () => {
    const { loading, data, error } = useFetch('http://localhost:1337/api/blogs?populate=*');
    // const { loading, data, error } = useFetch('http://localhost:1337/api/blogs?populate=coverImg,authorImg');

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading blogs.</p>;

    return (
        <Layout>
            <Routes>
                <Route path="/" element={<Homepage blogs={data} />} />
                <Route path="/category/:category" element={<BlogContent blogs={data} />} />
                <Route path="/blog/:title" element={<BlogContent blogs={data} />} />
                {/* <Route path="/blog/:id" element={<BlogContent blogs={data} />} /> */}
            </Routes>
        </Layout>
    );
};

export default App;