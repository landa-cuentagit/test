import { PortableText } from "next-sanity";
import Image from "next/image";

import { LandaLogo } from "../../../packages/ui";

const Privacy = ({ template, privacy_section }) => {
    return (
        <section className="block privacy">
            {
                (template === 'splash')
                    ?
                        <a href="/" className="logo">
                            <Image
                                alt="Landa"
                                height={LandaLogo.height}
                                src={LandaLogo.src}
                                width={LandaLogo.width}
                            />
                        </a>
                    :
                        null
            }
            <div className="holder">
                <div className="header">
                    <div className="title">{privacy_section.section_title}</div>
                </div>
                <div className="content">
                    <div className="text-wrapper">
                        <div className="text">
                            <PortableText value={privacy_section.text} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Privacy;