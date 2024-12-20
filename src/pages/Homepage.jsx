import React from 'react';
import { useParams } from 'react-router-dom';
import Blogs from '../components/Blogs';

const Homepage = ({ blogs }) => {
    const { category } = useParams();

    // Filtrar blogs por categoría si existe el parámetro
    const filteredBlogs = category
        ? blogs?.data?.filter((blog) =>
            blog.categories?.some(
                (cat) => cat.name.toLowerCase() === category.toLowerCase()
            )
        )
        : blogs?.data;

    return <Blogs blogs={{ data: filteredBlogs }} />;
};

export default Homepage;