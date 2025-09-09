import { useEffect, useRef } from "react";
import { PortableText } from "next-sanity";
import { buildImages } from "../util/Helpers";
import Lottie from "lottie-react";

import { LandaAnimated } from "../../../packages/ui";

const Cover = ({ template, cover_section }) => {

    const lottieRef = useRef();

    useEffect(() => {
        const timer = setTimeout(() => {
        // inicia la animación después de 1s
        lottieRef.current?.play();
        }, 1500);

        return () => clearTimeout(timer);
    }, []);

    return (
        <section className="block cover">
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
            <div
                className="background-one image-effect"
                style={{
                    background: `url(${buildImages(cover_section.image1.asset._ref).url()})`
                }}
            />
            <div
                className="background-two image-effect"
                style={{
                    background: `url(${buildImages(cover_section.image2.asset._ref).url()})`
                }}
            />
            <div className="holder">
                <div className="content">
                    <div className="text-wrapper">
                        <div className="text text-effect">
                            <PortableText value={cover_section.text} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Cover;