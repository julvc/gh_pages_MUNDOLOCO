import React from 'react';
import { Link } from 'react-router-dom';
import { FaRegClock } from 'react-icons/fa'; // Icono de reloj

const Blogs = ({ blogs }) => {
    if (!blogs?.data?.length) {
        return (
            <div className="w-full text-center py-20">
                <h1 className="text-3xl font-bold text-gray-500">No hay blogs disponibles</h1>
            </div>
        );
    }

    const getCoverImageUrl = (coverImg) => {
        if (coverImg && coverImg[0] && coverImg[0].url) {
            return `http://localhost:1337${coverImg[0].url}`;
        }
        return "https://via.placeholder.com/300"; // Imagen por defecto
    };

    const formatDate = (date) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(date).toLocaleDateString('es-ES', options); // Formato: 10 dic. 2024
    };

    return (
        <div className="w-full py-12 bg-[#f9f9f9]">
            <div className="max-w-screen-2xl mx-auto px-4">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogs.data.map(blog => {
                        return (
                            <div key={blog.id} className="overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                                <Link to={`/blog/${encodeURIComponent(blog.blogTitle.replace(/\s+/g, '-'))}`} className="block group">
                                    {/* Imagen con efecto hover */}
                                    <div className="relative w-full h-80 bg-cover bg-center transition-all duration-300" style={{ backgroundImage: `url(${getCoverImageUrl(blog.coverImg)})` }}>
                                        {/* Fondo oscuro al hacer hover */}
                                        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
                                        {/* Contenido del texto */}
                                        <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white p-4">
                                            <h2 className="text-5xl font-bold text-white tracking-widest mb-2">
                                                {blog.blogTitle}
                                            </h2>
                                            <p className="text-lg mb-4 flex items-center justify-center space-x-2">
                                                <FaRegClock className="text-blue-500" />
                                                <span>{formatDate(blog.createdAt)}</span>
                                            </p>
                                            <p className="text-white text-xl font-roboto font-bold tracking-wider mb-4 text-justify">
                                                {blog.blogContentOne?.slice(0, 150) || "Sin descripción"}...
                                            </p>
                                            <span className="text-blue-400 font-roboto font-bold hover:underline">
                                                Leer más
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Blogs;
