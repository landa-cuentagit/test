import { useEffect, useRef } from 'react'
import { PortableText } from "next-sanity";
import { buildImages } from '../util/Helpers'
import Image from "next/image";

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-creative';

// import required modules
import { EffectCreative } from 'swiper/modules';

const Capabilities = ({ capabilities_section }) => {

    const swiperRef = useRef(null);

    const firstItemRef = useRef(null);

    const expando = (e, index) => {
        let item = e.target,
            itemContent = item.querySelector('.item-content'),
            itemDesc = item.querySelector('.item-desc'),
            newHeight = itemDesc.offsetHeight,
            allItems = document.querySelectorAll('.block.capabilities .item');

        if(item.classList.contains('expando')) {
            item.classList.remove('expando');
            itemContent.style.height = '0';
        } else {

            allItems.forEach(item => {
                let itemHeader = item.querySelector('.item-header'),
                    content = item.querySelector('.item-content');
                item.classList.remove('expando')
                itemHeader.classList.remove('expando')
                content.style.height = '0'
            })

            item.classList.add('expando');
            itemContent.style.height = newHeight + 'px'
        }

        if(window.innerWidth > 767) {
            if (swiperRef.current) {
                swiperRef.current.slideTo(index);
            }
        }
    }

    useEffect(() => {
        if (firstItemRef.current) {
            firstItemRef.current.click(); // simula el click en el primer item
        }
    }, []);

    return (
        <section className="block capabilities">
            <div className="holder">
                <div className="header">
                    <div className="header-content simple-effect">
                        <div className="title">{capabilities_section.section_title}</div>
                        <div className="desc">{capabilities_section.hidden_phrase}</div>
                    </div>
                    <div className="number simple-effect">2.0</div>
                    <div className="line to-right" />
                </div>
                <div className="content">
                    <div className="text-wrapper">
                        <div className="text-holder">
                            <div className="text-one text-effect">
                                <PortableText value={capabilities_section.text1} />
                            </div>
                            <div className="text-two text-effect">
                                <PortableText value={capabilities_section.text2} />
                            </div>
                        </div>
                    </div>
                    <div className="expando-elements-wrapper">
                        <div className="images-wrapper simple-effect hidden-xs">
                            <Swiper
                                speed={750}
                                allowTouchMove={false} // ❌ desactiva el swipe
                                spaceBetween={30}
                                effect={'creative'}
                                modules={[EffectCreative]}
                                className="mySwiper"
                                onSwiper={(swiper) => (swiperRef.current = swiper)}
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
                                    capabilities_section.all_capabilities.map((capability, index) => (
                                        <SwiperSlide className="image" key={index}>
                                            {
                                                (capability.videoUrl)
                                                    ?
                                                        <video src={capability.videoUrl} muted autoPlay loop />
                                                    :
                                                        <Image
                                                            alt={capability.capability_name}
                                                            height={550}
                                                            src={buildImages(capability.image.asset._ref).url()}
                                                            width={480}
                                                        />
                                            }
                                        </SwiperSlide>
                                    ))
                                }
                            </Swiper>
                        </div>
                        <div className="all-expando-elements">
                            {
                                capabilities_section.all_capabilities.map((capability, index) => (
                                        <div
                                            className="item"
                                            key={index}
                                            onClick={(e) => expando(e, index)}
                                            ref={index === 0 ? firstItemRef : null}
                                        >
                                            <div className="item-header">
                                                <div className="line to-right" />
                                                <div className="item-indicator text-effect">
                                                    {String.fromCharCode(65 + index)}.
                                                </div>
                                                <div className="item-title text-effect">{capability.capability_name}</div>
                                            </div>
                                            <div className="item-content">
                                                <div className="item-desc">
                                                    {
                                                        (capability.videoUrl)
                                                            ?
                                                                <video className='simple-effect visible-xs' src={capability.videoUrl} muted autoPlay loop />
                                                            :
                                                                (capability.image_mobile)
                                                                    ?
                                                                        <div
                                                                            className="image-mobile simple-effect visible-xs"
                                                                            style={{
                                                                                background: `url(${buildImages(capability.image_mobile.asset._ref).url()})`
                                                                            }}
                                                                        />
                                                                    :
                                                                        <div
                                                                            className="image-mobile simple-effect visible-xs"
                                                                            style={{
                                                                                background: `url(${buildImages(capability.image.asset._ref).url()})`
                                                                            }}
                                                                        />
                                                    }
                                                    <div className="capability-text-one text-effect">{capability.text1}</div>
                                                    <div className="capability-text-two text-effect">
                                                        <PortableText value={capability.text2} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                            }
                        </div>
                    </div>
                    <a href="#contact" className="cta visible-xs">{capabilities_section.cta_text}</a>
                </div>
            </div>
        </section>
    );
}

export default Capabilities;