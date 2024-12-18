// Función para obtener la URL de la imagen con un placeholder opcional
export const getImageUrl = (imageData, placeholder = "https://via.placeholder.com/300") => {
    if (imageData) {
        // Si es un array (para coverImg y manyImg)
        if (Array.isArray(imageData) && imageData.length > 0 && imageData[0]?.url) {
            return buildImageUrl(imageData[0].url);
        }

        // Si es un objeto con una propiedad 'url' (para authorImg)
        if (imageData?.url) {
            return buildImageUrl(imageData.url);
        }
    }

    // Devuelve un placeholder si no hay imagen válida
    return placeholder;
};

// Función para construir la URL de la imagen dependiendo del proveedor
const buildImageUrl = (url) => {
    // Asegurarse de que la URL comienza con 'http://' o 'https://'
    if (/^https?:\/\//.test(url)) {
        return url;
    }

    // Si no es absoluta, se asume que es una ruta relativa desde Strapi por defecto
    return `${import.meta.env.VITE_API_URL}${url}`;
};