// src/components/Navbar.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import close from '../assets/close.svg';
import menu from '../assets/menu.svg';

const Navbar = () => {
    const [toggle, setToggle] = useState(false);
    const [logoOpacity, setLogoOpacity] = useState(true);
    const navigate = useNavigate();

    const handleClick = () => setToggle(!toggle);

    const handleLogoClick = () => {
        setLogoOpacity(false);
        navigate('/'); // Navegar a la página principal
        setTimeout(() => setLogoOpacity(true), 200);
    };

    const handleCategoryClick = (category) => {
        navigate(`/category/${category}`); // Navegar a la página de la categoría seleccionada
        setToggle(false); // Cerrar el menú móvil después de hacer clic
    };

    return (
        <div className="w-full h-[120px] z-10 bg-white fixed drop-shadow-lg">
            <div className="max-w-screen-2xl mx-auto flex justify-between items-center h-full px-4">
                <div className="flex items-center">
                    <img
                        src={logo}
                        alt="logo"
                        className={`sm:ml-10 ss:ml-10 md:ml-3 w-[120px] h-auto cursor-pointer transition-opacity duration-300
                        ${logoOpacity ? 'opacity-[65%] hover:opacity-100' : 'opacity-100'}`}
                        onClick={handleLogoClick}
                    />
                </div>

                <div className="flex items-center">
                    <ul className="hidden md:flex text-sm space-x-8">
                        {["anime", "videojuegos", "peliculas", "series", "tecnologia", "reseñas"].map((category) => (
                            <li
                                key={category}
                                className="text-blue-800 font-bold cursor-pointer transition-transform duration-200 hover:scale-110 capitalize"
                                onClick={() => handleCategoryClick(category)}
                            >
                                {category}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="hidden md:flex">
                    <button className="border-none bg-transparent text-black mr-4">Login</button>
                    <button className="px-8 py-3 bg-blue-500 text-white rounded-lg">Registro</button>
                </div>

                <div className="md:hidden" onClick={handleClick}>
                    <img
                        src={!toggle ? menu : close}
                        alt="menu"
                        className="w-[28px] h-[28px] object-contain mr-4"
                    />
                </div>
            </div>

            {/* Menú desplegable para móviles */}
            <ul className={toggle ? 'absolute bg-white w-full px-8 md:hidden' : 'hidden'}>
                {["anime", "videojuegos", "peliculas", "series", "tecnologia", "reseñas"].map((category) => (
                    <li
                        key={category}
                        className="py-2 text-blue-800 font-bold cursor-pointer transition-transform duration-200 hover:scale-110 capitalize"
                        onClick={() => handleCategoryClick(category)}
                    >
                        {category}
                    </li>
                ))}
                <div className="flex flex-col my-4">
                    <button className="bg-transparent text-black mb-4 py-3">Login</button>
                    <button className="px-8 py-3 bg-blue-500 text-white rounded-lg">Registro</button>
                </div>
            </ul>
        </div>
    );
};

export default Navbar;