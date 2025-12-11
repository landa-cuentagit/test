import { useEffect, forwardRef, useState, useRef } from "react";
import { PortableText } from "next-sanity";
import { buildImages } from '../util/Helpers';
import Lottie from "lottie-react";

import { LandaAnimated } from "../../../packages/ui";

const Intro = forwardRef(({ intro_section, onFinish, onFadeInComplete }, ref) => {

    const lottieRef = useRef();

    useEffect(() => {
        const timer = setTimeout(() => {
        // inicia la animación después de 1s
        lottieRef.current?.play();
        }, 1500);

        return () => clearTimeout(timer);
    }, []);

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

    const [isMobile, setIsMobile] = useState(false);
    const [scaleSize, setScaleSize] = useState(1); // porcentaje inicial

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
            let allImagesWaiting= document.querySelectorAll('.wait-image-effect'),
                allTextWaiting = document.querySelectorAll('.wait-text-effect')

            const progress = scrollTop / totalHeight; // 0 a 1
            const size = 100 + progress * 20; // de 100% a 120%
            const scaleValue = size / 100
            setScaleSize(scaleValue);

            if (progress < 0.33) setActiveIndex(0);
            else if (progress < 0.66) setActiveIndex(1);
            else setActiveIndex(2);

            if (progress >= 0.98 && !fadeOut) {

                allImagesWaiting.forEach(image => {
                    image.classList.add('apply-effect')
                })

                allTextWaiting.forEach(text => {
                    text.classList.add('apply-effect')
                })

                setFadeOut(true);
                setFadeIn(false);

                setTimeout(() => {
                    if (onFinish) onFinish();
                    // Llamamos onFinish para ocultar el intro

                    // Restaurar scroll global
                    document.body.style.overflow = "auto";
                }, 1000); // coincide con la transición CSS
            }
        };

        el.addEventListener("scroll", handleScroll);
        return () => el.removeEventListener("scroll", handleScroll);
    }, [fadeOut, onFinish, ref]);

    return (
        <div
            ref={ref}
            className={`intro-section ${fadeIn ? "fade-in" : ""} ${
                fadeOut ? "fade-out" : ""
            }`}
        >
            <div
                className="background"
                style={{
                    background: `url(${
                        isMobile
                            ? buildImages(intro_section.image_mobile.asset._ref).url()
                            : buildImages(intro_section.image_desktop.asset._ref).url()
                    })`,
                    transform: `scale(${scaleSize})`, // tamaño dinámico
                }}
            />
            <div className="logo">
                <Lottie
                    animationData={LandaAnimated}
                    loop={false} // Solo una vez
                    lottieRef={lottieRef}
                    autoplay={true}
                />
            </div>
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