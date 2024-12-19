import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm'; // Import remarkGfm here
import Blogs from '../components/Blogs';
import { FaFacebook, FaInstagram, FaTwitch, FaDiscord, FaYoutube, FaArrowLeft } from 'react-icons/fa';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import backButton from '../assets/back.png';
import { getImageUrl } from "../utils/imageUtils";

const BlogContent = ({ blogs }) => {
    // const { title } = useParams();
    console.log("BLOG DESDE BlogContent: " , blogs)

    const { slug } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    // Redirige al home
    const goHome = () => {
        navigate('/');
    };

    // Manejo de eventos para evitar que navegue a otras páginas con Backspace o popstate
    // useEffect(() => {
    //     const handleBackNavigation = (event) => {
    //         if (event.state === null || location.pathname.startsWith('/blog')) {
    //             navigate('/'); // Redirigir siempre al homepage
    //         }
    //     };

    //     const handleBackspaceKeyPress = (event) => {
    //         if (event.key === 'Backspace') {  // Detectamos la tecla Backspace
    //             navigate('/'); // Redirigir siempre al homepage
    //         }
    //     };

    //     window.addEventListener('popstate', handleBackNavigation);
    //     window.addEventListener('keydown', handleBackspaceKeyPress);

    //     // Limpiar eventos cuando el componente se desmonte
    //     return () => {
    //         window.removeEventListener('popstate', handleBackNavigation);
    //         window.removeEventListener('keydown', handleBackspaceKeyPress);
    //     };
    // }, [location, navigate]);

    useEffect(() => {
        const handleBackNavigation = (event) => {
            if (location.pathname.startsWith('/blog')) {
                navigate('/'); // Opcional: solo si realmente necesitas esta lógica
            }
        };
    
        window.addEventListener('popstate', handleBackNavigation);
    
        return () => {
            window.removeEventListener('popstate', handleBackNavigation);
        };
    }, [location, navigate]);
    
    const [isOpen, setIsOpen] = useState(false);
    const openCarousel = () => setIsOpen(true);
    const closeCarousel = () => setIsOpen(false);
    const handleModalClick = (e) => {
        if (e.target.id === "modalBackground") closeCarousel();
    };

    // Buscamos el blog por el slug en los datos que ya tenemos
    const blog = blogs?.data?.find(blog => blog.slug === slug);

    console.log("ESTE ES EL BLOG: " , blog)

    if (!blogs || !blogs.data) {
        return <p>Cargando el blog...</p>; // Mensaje mientras se cargan los datos
    }
    
    if (!blog) {
        return (
            <div className="w-full pb-10 bg-[#f9f9f9]">
                <div className="max-w-[1600px] mx-auto text-center py-20">
                    <h1 className="text-4xl font-bold text-red-500">No se encontró el blog</h1>
                    <p>El título no coincide con ningún blog existente.</p>
                </div>
            </div>
        );
    }

    // Si el blog es encontrado, obtén el id
    console.log("que es blog: " + blog);
    

    // const { blogTitle, blogContentOne, blogContentTwo, blogContentThree, coverImg, blogDesc } = data?.data || {};
    const combinedContent = `${blog.blogContentOne || ""}\n${blog.blogContentTwo || ""}\n${blog.blogContentThree || ""}`;

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

    const markdownContent = combinedContent;

    return (
        <div className="w-full py-12 bg-[#f9f9f9] pt-20">
            <div className="max-w-[2500px] mx-auto">
                <div id="blogZone" className="grid lg:grid-cols-1 px-6 text-black">
                    <div className="w-full pt-28">
                        {/* Flecha para regresar al homepage */}
                        <div
                            onClick={goHome}
                            className="fixed bottom-10 right-5 z-20 cursor-pointer"
                            style={{ width: '350px', height: '50px', marginRight: '-120px' }} // Tamaño de la imagen
                        >
                            <img
                                src={backButton} // Ruta a tu imagen personalizada
                                alt="Back"
                                className="w-full h-full object-contain"
                            />
                        </div>

                        {/* Imagen de portada */}
                        <img src={getImageUrl(blog.coverImg)} alt="Cover" className="w-full h-auto mb-6 rounded-lg shadow-lg" />

                        <h1 className="font-bold text-4xl my-4">{blog.blogTitle}</h1>
                        <h3 className="font-bold text-2xl my-4">{blog.blogDesc}</h3>

                        <div className="prose">
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdownContent}</ReactMarkdown>
                        </div>

                        {/* Video */}
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

                        {/* Carrusel */}
                        <div id='zoneImages'>
                            <div className="flex justify-center space-x-[-40px] relative z-10">
                                {blog.manyImg?.map((img, index) => (
                                    <img
                                        key={index}
                                        src={getImageUrl([img])} // Llamada a la función para manyImg
                                        alt={img.name || `Image ${index}`}
                                        className="w-60 h-60 object-cover rounded-md shadow-md transform hover:scale-110 cursor-pointer transition-transform duration-300"
                                        onClick={openCarousel}
                                        style={{ marginLeft: index === 0 ? '0' : '-40px' }}
                                    />
                                ))}
                            </div>

                            {/* Carrusel Modal */}
                            {isOpen && blog.manyImg?.length > 0 && (
                                <div
                                    id="modalBackground"
                                    className="fixed inset-0 bg-black bg-opacity-80 z-50 flex justify-center items-center"
                                    onClick={handleModalClick}
                                >
                                    <div className="w-full max-w-4xl p-4 relative">
                                        <button
                                            className="text-blue-500 text-3xl absolute top-4 right-0 z-20 transform translate-y-[-30px] translate-x-[30px] hover:scale-110 transition"
                                            onClick={closeCarousel}
                                        >
                                            ✖
                                        </button>
                                        <Carousel showThumbs={false} showStatus={false} infiniteLoop>
                                            {blog.manyImg.map((img, index) => (
                                                <div key={index}>
                                                    <img
                                                        src={`${import.meta.env.VITE_API_URL}${img.url}`}
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

                        {/* Zona del autor */}
                        <div id="authorZone" className="w-full bg-white rounded-xl drop-shadow-md py-8 mt-8 lg:mt-8">
                            <div className="flex items-center space-x-6">
                                <img className="p-2 w-40 h-40 rounded-full object-cover ml-4"
                                    src={getImageUrl(blog.authorImg, "https://via.placeholder.com/100")}
                                    alt={blog.authorName} />
                                <div className="text-left">
                                    <h1 className="font-bold text-3xl text-blue-900">{blog.authorName}</h1>
                                    <p className="text-gray-900 font-medium">{blog.authorDesc || "No description available"}</p>
                                </div>
                            </div>
                            <div className="flex space-x-6 mt-6 justify-end w-full pr-10">
                                <a href={blog.authorFacebook || "#"} target="_blank" rel="noopener noreferrer" className="text-2xl text-blue-600 hover:text-blue-800">
                                    <FaFacebook />
                                </a>
                                <a href={blog.authorInstagram || "#"} target="_blank" rel="noopener noreferrer" className="text-2xl text-pink-600 hover:text-pink-800">
                                    <FaInstagram />
                                </a>
                                <a href={blog.authorTwitch || "#"} target="_blank" rel="noopener noreferrer" className="text-2xl text-purple-600 hover:text-purple-800">
                                    <FaTwitch />
                                </a>
                                <a href={blog.authorDiscord || "#"} target="_blank" rel="noopener noreferrer" className="text-2xl text-indigo-600 hover:text-indigo-800">
                                    <FaDiscord />
                                </a>
                                <a href={blog.authorYoutube || "#"} target="_blank" rel="noopener noreferrer" className="text-2xl text-red-600 hover:text-red-800 mr-8">
                                    <FaYoutube />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogContent;