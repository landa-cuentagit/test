import { useEffect, forwardRef, useState } from "react";
import { PortableText } from "next-sanity";
import { buildImages } from '../util/Helpers';

const Intro = forwardRef(({ intro_section, onFinish, onFadeInComplete }, ref) => {

    const [activeIndex, setActiveIndex] = useState(0);
    const [fadeOut, setFadeOut] = useState(false);
    const [fadeIn, setFadeIn] = useState(false);

    useEffect(() => {

        // Activar fade-in al montar o reaparecer
        const timer = setTimeout(() => {
            setFadeIn(true);

            // Llamamos callback después del fade-in para scroll del sitio
            if (onFadeInComplete) onFadeInComplete();
        }, 50); // pequeño delay para animación CSS

        return () => clearTimeout(timer);
    }, [onFadeInComplete]);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const handleScroll = () => {
            const scrollTop = el.scrollTop;
            const sectionHeight = el.clientHeight;
            const totalHeight = el.scrollHeight - sectionHeight;
            const progress = scrollTop / totalHeight;

            if (progress < 0.33) setActiveIndex(0);
            else if (progress < 0.66) setActiveIndex(1);
            else setActiveIndex(2);

            if (progress >= 1 && !fadeOut) {
                setFadeOut(true);
                setFadeIn(false);

                setTimeout(() => {
                    // Llamamos onFinish para ocultar el intro
                    if (onFinish) onFinish();

                    // Restaurar scroll global
                    document.body.style.overflow = "auto";
                }, 1000); // coincide con la transición CSS
            }
        };

        el.addEventListener("scroll", handleScroll);
        return () => el.removeEventListener("scroll", handleScroll);
    }, [fadeOut, onFinish, ref]);

    const [isMobile, setIsMobile] = useState(false);
  const [bgSize, setBgSize] = useState(100); // porcentaje inicial

    useEffect(() => {

        // Solo se ejecuta en el cliente
        const handleResize = () => {
        setIsMobile(window.innerWidth < 768);
        };

        handleResize(); // set inicial
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);

    }, []);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const handleScroll = () => {
            const scrollTop = el.scrollTop;
            const sectionHeight = el.clientHeight;
            const totalHeight = el.scrollHeight - sectionHeight;

            const progress = scrollTop / totalHeight; // 0 a 1
            const size = 100 + progress * 20; // de 100% a 120%
            setBgSize(size);
        };

        el.addEventListener("scroll", handleScroll);
        return () => el.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div
            ref={ref}
            className={`intro-section ${fadeIn ? "fade-in" : ""} ${
                fadeOut ? "fade-out" : ""
            }`}
            style={{
                background: `url(${
                    isMobile
                        ? buildImages(intro_section.image_mobile.asset._ref).url()
                        : buildImages(intro_section.image_desktop.asset._ref).url()
                })`,
                backgroundSize: `${bgSize}%`, // tamaño dinámico
                backgroundPosition: "center",
            }}
        >
            <div className="scroll-indication">Scroll</div>
            <div className="scroll-area">
                <div className="intro-text-container">
                    <div
                        key={0}
                        className={`intro-text one ${0 === activeIndex ? "visible" : "no-visible"}`}
                    >
                        <PortableText value={intro_section.text1} />
                    </div>
                    <div
                        key={1}
                        className={`intro-text two ${1 === activeIndex ? "visible" : "no-visible"}`}
                    >
                        <PortableText value={intro_section.text2} />
                    </div>
                    <div
                        key={2}
                        className={`intro-text three ${2 === activeIndex ? "visible" : "no-visible"}`}
                    >
                        <PortableText value={intro_section.text3} />
                    </div>
                </div>
            </div>
        </div>
    );
});

export default Intro;