import { useEffect, useState, useRef } from "react";
import { PortableText } from "next-sanity";
import { buildImages } from "../util/Helpers";
import Lottie from "lottie-react";

import { LandaAnimated } from "../../../packages/ui";

const Cover = ({ template, cover_section }) => {

    const lottieRef = useRef();
    const [hash, setHash] = useState('')

    useEffect(() => (
        setHash(window.location.hash)
    ), [])

    useEffect(() => {
        const timer = setTimeout(() => {
        // inicia la animación después de 1s
        lottieRef.current?.play();
        }, 1500);

        return () => clearTimeout(timer);
    }, []);

    const ref = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // si ya scrolleaste al menos el alto de la ventana → esconder
            setIsVisible(window.scrollY >= window.innerHeight);
    };

    window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <section
            ref={ref}
            className={`block cover ${(template === 'splash') ? 'cover-splash' : ''} ${!isVisible ? "" : "no-visible"}`}
        >
            {
                (template === 'splash')
                    ?
                        <div className="logo">
                            <Lottie
                                animationData={LandaAnimated}
                                loop={false} // Solo una vez
                                lottieRef={lottieRef}
                                autoplay={true}
                            />
                        </div>
                    :
                        null
            }
            {
                (cover_section.videoUrlOne)
                    ?
                        <div className="video-wrapper-one">
                            <video src={cover_section.videoUrlOne} autoPlay muted loop />
                        </div>
                    :
                        <div
                            className={`background-one ${(template === 'home' && hash === '') ?'wait-image-effect' : (template === 'splash') ? 'image-effect' : '' }`}
                            style={{
                                background: `url(${buildImages(cover_section.image1.asset._ref).url()})`
                            }}
                        />
            }
            {
                (cover_section.videoUrlTwo)
                    ?
                        <div className="video-wrapper-two">
                            <video src={cover_section.videoUrlTwo} autoPlay muted loop />
                        </div>
                    :
                        <div
                            className={`background-two ${(template === 'home' && hash === '') ?'wait-image-effect' : (template === 'splash') ? 'image-effect' : '' }`}
                            style={{
                                background: `url(${buildImages(cover_section.image2.asset._ref).url()})`
                            }}
                        />
            }
            <div className="holder">
                <div className="content">
                    <div className="text-wrapper">
                        <div className={`text ${(template === 'home' && hash === '') ? 'wait-text-effect' : (template === 'splash') ? 'text-effect' : '' }`}>
                            <PortableText value={cover_section.text} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Cover;