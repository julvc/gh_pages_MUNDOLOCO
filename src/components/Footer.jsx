import React from 'react';
import { FaFacebook, FaGithub, FaInstagram, FaTwitter, FaTwitch, FaDiscord, FaYoutube} from 'react-icons/fa';

export const Footer = () => {
    return (
        <div className="w-full bg-[#02044A] text-gray-300 py-8">
            <div className="max-w-screen-2xl mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-6 gap-4 border-b-2 border-gray-600 py-8">
                    <div>
                        <h6 className="font-bold uppercase py-2">Categorías</h6>
                        <ol>
                            <li className="py-1">Anime</li>
                            <li className="py-1">Videojuegos</li>
                            <li className="py-1">Películas</li>
                            <li className="py-1">Series</li>
                            <li className="py-1">Tecnología</li>
                        </ol>
                    </div>
                    <div>
                        <h6 className="font-bold uppercase py-2">Enlaces Útiles</h6>
                        <ol>
                            <li className="py-1">Contacto</li>
                            <li className="py-1">Términos de Uso</li>
                            <li className="py-1">Privacidad</li>
                        </ol>
                    </div>
                    <div className="col-span-2 md:col-span-4">
                        <p className="font-bold uppercase">Suscríbete</p>
                        <p className="py-4">
                            Obtén las últimas noticias y artículos en tu correo.
                        </p>
                        <form className="flex flex-col sm:flex-row gap-2">
                            <input
                                className="w-full p-2 rounded-md"
                                type="email"
                                placeholder="Ingresa tu correo electrónico"
                            />
                            <button className="p-2 bg-[#00B86E] text-white rounded-md">
                                Suscribirse
                            </button>
                        </form>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center text-center text-gray-500 py-4">
                    <p>© 2024 MP XVO, LLC. Todos los derechos reservados.</p>
                    <div className="flex space-x-4 text-2xl pt-4 md:pt-0">
                        <FaFacebook />
                        <FaGithub />
                        <FaInstagram />
                        <FaTwitch />
                        <FaTwitter />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;