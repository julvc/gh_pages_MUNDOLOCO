import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import close from '../assets/close.svg';
import menu from '../assets/menu.svg';

const Navbar = () => {
    const [toggle, setToggle] = useState(false);
    const [logoOpacity, setLogoOpacity] = useState(true); // Estado para manejar opacidad al hacer clic
    const navigate = useNavigate(); // Hook de navegación de React Router

    const handleClick = () => setToggle(!toggle);

    const handleLogoClick = () => {
        setLogoOpacity(false); // Cambiar opacidad a 100% (sin transparencia)
        navigate('/'); // Redirigir a la página principal
        setTimeout(() => setLogoOpacity(true), 200); // Restaurar opacidad tras 200ms
    };

    const handleCategoryClick = (category) => {
        navigate(`/category/${category}`); // Redirigir a la página de la categoría seleccionada
    };

    return (
        <div className="w-full h-[120px] z-10 bg-white fixed drop-shadow-lg">
            <div className="max-w-screen-2xl mx-auto flex justify-between items-center h-full px-4">
                {/* Logo */}
                <div className="flex items-center">
                    <img
                        src={logo}
                        alt="logo"
                        className={`sm:ml-10 ss:ml-10 md:ml-3 w-[120px] h-auto cursor-pointer transition-opacity duration-300
                        ${logoOpacity ? 'opacity-[65%] hover:opacity-100' : 'opacity-100'}`}
                        onClick={handleLogoClick}
                    />
                </div>

                {/* Menú de navegación */}
                <div className="flex items-center">
                    <ul className="hidden md:flex text-sm space-x-8">
                        {["Anime", "Videojuegos", "Peliculas", "Series", "Tecnologia", "Reseñas"].map((category) => (
                            <li
                                key={category}
                                className="text-blue-800 font-bold cursor-pointer transition-transform duration-200 hover:scale-110"
                                onClick={() => handleCategoryClick(category)}
                            >
                                {category}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Botones */}
                <div className="hidden md:flex">
                    <button className="border-none bg-transparent text-black mr-4">Login</button>
                    <button className="px-8 py-3 bg-blue-500 text-white rounded-lg">Registro</button>
                </div>

                {/* Menú móvil */}
                <div className="md:hidden" onClick={handleClick}>
                    <img
                        src={!toggle ? menu : close}
                        alt="menu"
                        className="w-[28px] h-[28px] object-contain mr-4"
                    />
                </div>
            </div>

            {/* Dropdown para móviles */}
            <ul className={toggle ? 'absolute bg-white w-full px-8 md:hidden' : 'hidden'}>
                {["Anime", "Videojuegos", "Peliculas", "Series", "Tecnologia", "Reseñas"].map((category) => (
                    <li
                        key={category}
                        className="py-2 text-blue-800 font-bold cursor-pointer transition-transform duration-200 hover:scale-110"
                        onClick={() => {
                            handleCategoryClick(category);
                            setToggle(false); // Cierra el menú después de hacer clic
                        }}
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
