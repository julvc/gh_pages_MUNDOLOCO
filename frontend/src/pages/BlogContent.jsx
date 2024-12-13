import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import Blogs from '../components/Blogs';
import { FaFacebook, FaInstagram, FaTwitch, FaDiscord, FaYoutube, FaArrowLeft } from 'react-icons/fa';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import backButton from '../assets/back.png';

const BlogContent = ({ blogs }) => {
    const { category, title } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    // Redirige al home
    const goHome = () => {
        navigate('/'); 
    };

    // Manejo de eventos para evitar que navegue a otras páginas con Backspace o popstate
    useEffect(() => {
        const handleBackNavigation = (event) => {
            if (event.state === null || location.pathname.startsWith('/blog')) {
                navigate('/'); // Redirigir siempre al homepage
            }
        };

        const handleBackspaceKeyPress = (event) => {
            if (event.key === 'Backspace') {  // Detectamos la tecla Backspace
                navigate('/'); // Redirigir siempre al homepage
            }
        };

        window.addEventListener('popstate', handleBackNavigation);
        window.addEventListener('keydown', handleBackspaceKeyPress);

        // Limpiar eventos cuando el componente se desmonte
        return () => {
            window.removeEventListener('popstate', handleBackNavigation);
            window.removeEventListener('keydown', handleBackspaceKeyPress);
        };
    }, [location, navigate]);

    const [isOpen, setIsOpen] = useState(false);
    const openCarousel = () => setIsOpen(true);
    const closeCarousel = () => setIsOpen(false);
    const handleModalClick = (e) => {
        if (e.target.id === "modalBackground") closeCarousel();
    };

    if (title) {
        const blog = blogs?.data?.find(blog => blog.blogTitle === title.replace(/-/g, ' '));

        if (!blog) {
            return (
                <div className="w-full pb-10 bg-[#f9f9f9]">
                    <div className="max-w-[1600px] mx-auto text-center py-20">
                        <h1 className="text-4xl font-bold text-red-500">No se encontró el blog</h1>
                        <p>El título "{title}" no coincide con ningún blog existente.</p>
                    </div>
                </div>
            );
        }

        const getCoverImageUrl = (coverImg) => {
            if (coverImg && Array.isArray(coverImg) && coverImg.length > 0 && coverImg[0].url) {
                return `http://localhost:1337${coverImg[0].url}`;
            }
            return "https://via.placeholder.com/300";
        };

        const getAuthorImageUrl = (authorImg) => {
            if (authorImg && authorImg.url) {
                return `http://localhost:1337${authorImg.url}`;
            }
            return "https://via.placeholder.com/100";
        };

        const getVideoEmbedUrl = (video) => {
            if (!video || !video.provider || !video.providerUid) return null;

            switch (video.provider) {
                case "youtube":
                    return `https://www.youtube.com/embed/${video.providerUid}`;
                case "vimeo":
                    return `https://player.vimeo.com/video/${video.providerUid}`;
                default:
                    return video.url;
            }
        };

        return (
            <div className="w-full py-12 bg-[#f9f9f9] pt-20">
                <div className="max-w-[2500px] mx-auto">
                    <div id="blogZone" className="grid lg:grid-cols-1 px-6 text-black">
                        {/* Contenido del blog */}
                        <div className="w-full pt-28">
                            {/* Flecha para regresar al homepage */}
                            <div
                                onClick={goHome}
                                className="fixed bottom-10 right-5 z-20 cursor-pointer"
                                style={{ width: '350px', height: '50px' , marginRight: '-120px'}} // Tamaño de la imagen
                            >
                                <img
                                    src={backButton} // Ruta a tu imagen personalizada
                                    alt="Back"
                                    className="w-full h-full object-contain"
                                />
                            </div>

                            <img src={getCoverImageUrl(blog.coverImg)} alt="Cover" className="w-full h-auto mb-6 rounded-lg shadow-lg" />
                            <h1 className="font-bold text-4xl my-4">{blog.blogTitle}</h1>
                            <h3 className="font-bold text-2xl my-4">{blog.blogDesc}</h3>
                            <ReactMarkdown>{blog.blogContentOne || "No content available"}</ReactMarkdown>
                            <p className="mt-4">{blog.blogContentTwo || "No additional content"}</p>
                            <ReactMarkdown className="mt-4">{blog.blogContentThree || ""}</ReactMarkdown>

                            {/* Zona correspondientes al video */}
                            <div id="zoneVideo" className="pt-4 flex justify-center mb-8">
                                {blog.blogVideo ? (
                                    <div className="relative w-full max-w-4xl px-4">
                                        <iframe
                                            className="w-full h-[350px] rounded-lg shadow-lg"
                                            src={getVideoEmbedUrl(blog.blogVideo)}
                                            border="0"
                                            allow="autoplay; encrypted-media"
                                            allowFullScreen
                                            title="Video"
                                        ></iframe>
                                    </div>
                                ) : (
                                    <p>No video available</p>
                                )}
                            </div>

                            {/* Zona correspondientes a carrusel de imagenes */}
                            <div id='zoneImages'>
                                <div className="flex justify-center space-x-[-40px] relative z-10">
                                    {blog.manyImg?.map((img, index) => (
                                        <img
                                            key={index}
                                            src={`http://localhost:1337${img.url}`}
                                            alt={img.name || `Image ${index}`}
                                            className="w-60 h-60 object-cover rounded-md shadow-md transform hover:scale-110 cursor-pointer transition-transform duration-300"
                                            onClick={openCarousel}
                                            style={{ marginLeft: index === 0 ? '0' : '-40px' }}
                                        />
                                    ))}
                                </div>

                                {/* Carrusel */}
                                {isOpen && blog.manyImg?.length > 0 && (
                                    <div
                                        id="modalBackground"
                                        className="fixed inset-0 bg-black bg-opacity-80 z-50 flex justify-center items-center"
                                        onClick={handleModalClick}
                                    >
                                        <div className="w-full max-w-4xl p-4 relative">
                                            {/* Botón de cierre */}
                                            <button
                                                className="text-blue-500 text-3xl absolute top-4 right-0 z-20 transform translate-y-[-30px] translate-x-[30px] hover:scale-110 transition"
                                                onClick={closeCarousel}
                                            >
                                                ✖
                                            </button>
                                            {/* Carrusel */}
                                            <Carousel showThumbs={false} showStatus={false} infiniteLoop>
                                                {blog.manyImg.map((img, index) => (
                                                    <div key={index}>
                                                        <img
                                                            src={`http://localhost:1337${img.url}`}
                                                            alt={img.name || `Image ${index}`}
                                                            className="rounded-lg"
                                                        />
                                                    </div>
                                                ))}
                                            </Carousel>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (category) {
        const filteredBlogs = blogs?.data?.filter(blog => blog.categories?.some(cat => cat.name === category));

        if (!filteredBlogs?.length) {
            return (
                <div className="w-full pb-10 bg-[#f9f9f9]">
                    <div className="max-w-[1600px] mx-auto text-center py-20">
                        <h1 className="text-4xl font-bold text-red-500">No se encontró contenido en esta categoría</h1>
                        <p>Esta categoría "{category}" no contiene ningún blog.</p>
                    </div>
                </div>
            );
        }

        return <Blogs blogs={filteredBlogs} />;
    }

    return <div>Cargando...</div>;
};

export default BlogContent;