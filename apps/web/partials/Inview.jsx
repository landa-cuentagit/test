import { useEffect } from 'react';

const useInViewEffect = () => {

    useEffect(() => {
        const applyEffect = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('apply-effect');
                    observer.unobserve(entry.target); // Una vez aplicado el efecto, deja de observar
                }
            });
        };

        const options = {
            root: null,  // Observa respecto al viewport
            rootMargin: '0px',
            threshold: 0.25 // El 25% del elemento debe estar visible
        };

        const observer = new IntersectionObserver(applyEffect, options);

        const allTexts = document.querySelectorAll('.text-effect'),
                allLines = document.querySelectorAll('.line'),
                allSimples = document.querySelectorAll('.simple-effect'),
                allImages = document.querySelectorAll('.image-effect');

        // Observa todos los elementos que necesitan el efecto
        allTexts.forEach(text => observer.observe(text));
        allLines.forEach(line => observer.observe(line));
        allSimples.forEach(simple => observer.observe(simple));
        allImages.forEach(image => observer.observe(image));

        return () => {
            // Limpiar el observer cuando el componente se desmonte
            observer.disconnect();
        };
    }, []);
};

export default useInViewEffect;