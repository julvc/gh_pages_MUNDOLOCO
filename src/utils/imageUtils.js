// Función para obtener la URL de una imagen desde Strapi/Cloudinary
export const getImageUrl = (imageData, placeholder = "https://via.placeholder.com/300") => {
    if (imageData) {
        // Si es un array (para coverImg y manyImg)
        if (Array.isArray(imageData) && imageData.length > 0 && imageData[0].url) {
            return imageData[0].url;
        }

        // Si es un objeto con una propiedad 'url' (para authorImg)
        if (imageData.url) {
            return imageData.url;
        }
    }

    // Devuelve un placeholder si no hay imagen válida
    return placeholder;
};
