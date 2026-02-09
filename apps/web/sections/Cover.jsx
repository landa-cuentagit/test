import { useEffect, useState, useRef } from "react";
import { PortableText } from "next-sanity";
import { buildImages } from "../util/Helpers";
import Lottie from "lottie-react";

import { LandaAnimated } from "../../../packages/ui";

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';

// import required modules
import { EffectFade, Autoplay } from 'swiper/modules';

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
                            <video src={cover_section.videoUrlOne} autoPlay playsInline muted loop preload="metadata" poster="/poster01.webp" />
                        </div>
                    :
                        <Swiper
                            speed={750}
                            allowTouchMove={false} // ❌ desactiva el swipe
                            spaceBetween={30}
                            effect={'fade'}
                            modules={[EffectFade, Autoplay]}
                            className="mySwiper swiper-left"
                            autoplay={{
                                delay: 2500,
                                disableOnInteraction: false,
                            }}
                        >
                            {
                                cover_section.all_images_left.map((image, index) => (
                                    <SwiperSlide key={index}>
                                        <div
                                            className={`background-one ${(template === 'home' && hash === '') ?'wait-image-effect' : (template === 'splash') ? 'image-effect' : '' }`}
                                            style={{
                                                background: `url(${buildImages(image.asset._ref).url()})`
                                            }}
                                        />
                                    </SwiperSlide>
                                ))
                            }
                        </Swiper>
            }
            {
                (cover_section.videoUrlTwo)
                    ?
                        <div className="video-wrapper-two">
                            <video src={cover_section.videoUrlTwo} autoPlay playsInline muted loop preload="metadata" poster="/poster02.webp" />
                        </div>
                    :
                        <Swiper
                            speed={750}
                            allowTouchMove={false} // ❌ desactiva el swipe
                            spaceBetween={30}
                            effect={'fade'}
                            modules={[EffectFade, Autoplay]}
                            className="mySwiper swiper-right"
                            autoplay={{
                                delay: 2500,
                                disableOnInteraction: false,
                            }}
                        >
                            {
                                cover_section.all_images_right.map((image, index) => (
                                    <SwiperSlide key={index}>
                                        <div
                                            className={`background-one ${(template === 'home' && hash === '') ?'wait-image-effect' : (template === 'splash') ? 'image-effect' : '' }`}
                                            style={{
                                                background: `url(${buildImages(image.asset._ref).url()})`
                                            }}
                                        />
                                    </SwiperSlide>
                                ))
                            }
                        </Swiper>
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