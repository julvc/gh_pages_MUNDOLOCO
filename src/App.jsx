// import React from 'react';
// import { Routes, Route } from 'react-router-dom';
// import Homepage from './pages/Homepage';
// import BlogContent from './pages/BlogContent';
// import Layout from './Layout';
// import useFetch from '../src/hooks/useFetch';

// const App = () => {
//     // const { loading, data, error } = useFetch(`${import.meta.env.VITE_API_URL}/api/blogs?populate=*`);
//     const { loading, data, error } = useFetch(`${import.meta.env.VITE_API_URL}/api/blogs?populate=*`);
//     console.log("Datos recibidos:", data);

//     if (loading) return <p>Loading...</p>;
//     if (error) return <p>Error loading blogs.</p>;

//     return (
//         <Layout>
//             <Routes>
//                 <Route path="/" element={<Homepage blogs={data} />} />
//                 <Route path="/category/:category" element={<BlogContent blogs={data} />} />
//                 {/* <Route path="/blog/:title" element={<BlogContent blogs={data} />} /> */}
//                 <Route path="/blog/:slug" element={<BlogContent blogs={data} />} />
//             </Routes>
//         </Layout>
//     );
// };

// export default App;

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import BlogContent from './pages/BlogContent';
import Layout from './Layout';
import useFetch from '../src/hooks/useFetch';

const App = () => {
    const { loading, data, error } = useFetch(`${import.meta.env.VITE_API_URL}/api/blogs?populate=*`);
    console.log("Datos recibidos:", data);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading blogs.</p>;

    return (
        <Layout>
            <Routes>
                <Route path="/" element={<Homepage blogs={data} />} />
                <Route path="/category/:category" element={<BlogContent blogs={data} />} />
                <Route path="/blog/:slug" element={<BlogContent blogs={data} />} />
            </Routes>
        </Layout>
    );
};

export default App;