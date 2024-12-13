import { useEffect, useState } from 'react';

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null); // Resetear el error antes de cada nueva solicitud
            try {
                const res = await fetch(url);

                // Verificar si la respuesta es correcta (200-299)
                if (!res.ok) {
                    throw new Error('Error en la solicitud de la API');
                }

                const json = await res.json();
                setData(json); // Guardar los datos de la API
                setLoading(false); // Finaliza el estado de carga
            } catch (error) {
                setError(error.message || 'Algo salió mal al cargar los datos'); // Almacenar el mensaje de error
                setLoading(false); // Finaliza el estado de carga
            }
        };

        fetchData();
    }, [url]);

    // Depuración: imprimir en consola
    // console.log('Cargando:', loading);
    // console.log('Datos:', data);
    // console.log('Error:', error);

    return { loading, error, data };
};

export default useFetch;