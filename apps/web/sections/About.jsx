import { useEffect, useRef, useState } from "react";
import { PortableText } from "next-sanity";
import { buildImages } from '../util/Helpers'
import TypingRotator from "../partials/TypingRotator";

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-creative';
import 'swiper/css/effect-fade';

// import required modules
import { EffectFade, EffectCreative } from 'swiper/modules';

const About = ({ about_section }) => {
    const [sentences, setSentences] = useState([]);
    const swiperRef1 = useRef(null);
    const swiperRef2 = useRef(null);

    const [activeTab, setActiveTab] = useState(0); // 0 = LEGACY, 1 = PHILOSOPHY

    const handleTabClick = (index) => {
        setActiveTab(index);

        // Cambiar ambos carouseles
        if (swiperRef1.current) swiperRef1.current.slideTo(index);
        if (swiperRef2.current) swiperRef2.current.slideTo(index);
    };

    useEffect(() => {
        if (!about_section.all_words) return;

        // Normaliza: asegúrate de tener strings, sin vacíos, sin duplicados si quieres
        const normalized = Array.from(
        new Set(
            (Array.isArray(about_section.all_words) ? about_section.all_words : [])
            .map(w => String(w.word).trim())
            .filter(Boolean)
        )
        );

        setSentences(normalized);
    }, [about_section.all_words]);

    return (
        <section className="block about">
            <div className="holder">
                <div className="header">
                    <div className="header-content simple-effect">
                        <div className="title">{about_section.section_title}</div>
                        <div className="desc">{about_section.hidden_phrase}</div>
                    </div>
                    <div className="number simple-effect">3.0</div>
                    <div className="line to-right" />
                </div>
                <div className="content">
                    <div className="text-wrapper">
                        <div className="text-holder">
                            <div className="text-one text-effect">
                                <PortableText value={about_section.text1} />
                            </div>
                            <div className="text-two text-effect">
                                <PortableText value={about_section.text2} />
                            </div>
                        </div>
                    </div>
                    <div className="carrousel-wrapper simple-effect">
                        <div className="tabs simple-effect">
                            <div className="tabs-holder">
                                <div
                                    className={`tab ${activeTab === 0 ? "active" : ""}`}
                                    onClick={() => handleTabClick(0)}
                                >
                                    {about_section.all_elements[0].element_name}
                                </div>
                                <div
                                    className={`tab ${activeTab === 1 ? "active" : ""}`}
                                    onClick={() => handleTabClick(1)}
                                >
                                    {about_section.all_elements[1].element_name}
                                </div>
                            </div>
                        </div>
                        <div className="item">
                            <div className="image-wrapper">
                                <Swiper
                                    speed={750}
                                    spaceBetween={30}
                                    effect={'creative'}
                                    modules={[EffectCreative]}
                                    className="mySwiper"
                                    allowTouchMove={false} // ❌ desactiva el swipe
                                    onSwiper={(swiper) => (swiperRef1.current = swiper)}
                                    creativeEffect={{
                                        prev: {
                                            shadow: true,
                                            translate: ['-20%', 0, -1],
                                        },
                                        next: {
                                            translate: ['100%', 0, 0],
                                        },
                                    }}
                                >
                                    {
                                        about_section.all_elements.map((element, index) => (
                                            <SwiperSlide key={index}>
                                                <div
                                                    className="image"
                                                    style={{
                                                        background: `url(${buildImages(element.image.asset._ref).url()})`
                                                    }}
                                                />
                                            </SwiperSlide>
                                        ))
                                    }
                                </Swiper>
                            </div>
                            <div className="item-text-wrapper">
                                <div className="item-text-holder">
                                    <Swiper
                                        speed={750}
                                        spaceBetween={30}
                                        effect={'fade'}
                                        modules={[EffectFade]}
                                        className="mySwiper"
                                        allowTouchMove={false} // ❌ desactiva el swipe
                                        onSwiper={(swiper) => (swiperRef2.current = swiper)}
                                    >
                                        {
                                            about_section.all_elements.map((element, index) => (
                                                <SwiperSlide className="text-slide" key={index}>
                                                    <div className="item-text-one">
                                                        <PortableText value={element.text1} />
                                                    </div>
                                                    <div className="item-text-two">
                                                        <PortableText value={element.text2} />
                                                    </div>
                                                </SwiperSlide>
                                            ))
                                        }
                                    </Swiper>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="text-three text-effect">
                        Our communities are <br/>
                        <TypingRotator
                            sentences={sentences}
                            speed={100}
                            pauseSteps={15}
                            className="typing"
                        /> the world.
                    </div>
                    <a href="#contact" className="cta simple-effect">{about_section.cta_text}</a>
                </div>
            </div>
        </section>
    );
}

export default About;