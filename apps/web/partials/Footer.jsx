import { useRef } from 'react'
import { Formik, Field, Form } from 'formik'
import * as Yup from 'yup'
import Image from 'next/image'

import { LandaIcon } from '../../../packages/ui'

const Footer = ({ template, contact_section }) => {

    const NewsletterContactForm = useRef(null);

    const initalValuesNewsletter = {
        Email: ""
    }

    const validationNewsletter = Yup.object().shape({
        Email: Yup.string().email().required()
    });

    async function handleSubmitNewsletter(values, { resetForm }){

        NewsletterContactForm.current.classList.add('sent');

        setTimeout(() => {
            resetForm();
            NewsletterContactForm.current.classList.remove('sent');
        }, 6000);
    }

    const ContactForm = useRef(null);

    const initalValuesContact = {
        Name: "",
        Email: "",
        Phone: "",
        Position: "",
        Company: "",
        Message: ""
    }

    const validationContact = Yup.object().shape({
        Name: Yup.string().required(),
        Email: Yup.string().email().required(),
        Phone: Yup.number().required(),
        Position: Yup.string().required(),
        Company: Yup.string().required(),
        Message: Yup.string().required()
    });

    async function handleSubmitContact(values, { resetForm }){

        ContactForm.current.classList.add('sent');

        setTimeout(() => {
            resetForm();
            ContactForm.current.classList.remove('sent');
        }, 6000);
    }

    const textareaRef = useRef(null);

    const handleTextarea = () => {
        const el = textareaRef.current;
        el.style.height = "auto"; // resetear
        el.style.height = `${el.scrollHeight}px`; // ajustar
    };

    return (
        <footer className={`footer ${template}`}>
            {
                (template === 'splash' || template === 'privacy')
                    ?
                        <div className="float-icon">
                            <Image
                                alt='Landa'
                                height={LandaIcon.height}
                                src={LandaIcon.src}
                                width={LandaIcon.width}
                            />
                        </div>
                    :
                        null
            }
            <div className="holder">
                <div className="header">
                    <div className="header-content text-effect">
                        <div className="title">{contact_section.section_title}</div>
                        <div className="desc">{contact_section.hidden_phrase}</div>
                    </div>
                    <div className="number text-effect">4.0</div>
                    <div className="line to-right" />
                </div>
                <div className="content">
                    <div className="text-wrapper">
                        <div className="text text-effect">{contact_section.contact_text}</div>
                    </div>
                    <div className="form-wrapper">
                        <Formik
                            initialValues={initalValuesContact}
                            validationSchema={validationContact}
                            onSubmit={handleSubmitContact}
                        >
                            {({errors, touched}) => (
                                <Form className="contact-form" ref={ContactForm}>
                                    <div className="contact-success-message">
                                        <div>Message received, possibilities ahead.</div>
                                        <div>Thank you for connecting with us. At Landa, every conversation is the beginning of something meaningful. We'll be in touch very soon.</div>
                                    </div>
                                    <div className="wrapper-content-form">
                                        <div className="input-flex first">
                                            <div className="input-container flex text-effect">
                                                <label className='label-name' htmlFor="name">Hello my name is</label>
                                                <Field
                                                    autoComplete='off'
                                                    type='text'
                                                    name='Name'
                                                    id='name'
                                                    className={`contact-input ${errors.Name && touched.Name ? ("isError") : null}`}
                                                    placeholder='...'
                                                />
                                            </div>
                                            <div className="input-container flex text-effect">
                                                <label className='label-email' htmlFor="email">email me at</label>
                                                <Field
                                                    autoComplete='off'
                                                    type='text'
                                                    name='Email'
                                                    id='email'
                                                    className={`contact-input ${errors.Email && touched.Email ? ("isError") : null}`}
                                                    placeholder='...'
                                                />
                                            </div>
                                        </div>
                                        <div className="input-flex">
                                            <div className="input-container flex text-effect">
                                                <label className='label-phone' htmlFor="phone">or call me</label>
                                                <Field
                                                    autoComplete='off'
                                                    type='number'
                                                    name='Phone'
                                                    id='phone'
                                                    className={`contact-input ${errors.Phone && touched.Phone ? ("isError") : null}`}
                                                    placeholder='...'
                                                />
                                            </div>
                                            <div className="info-personal">
                                                <div className="input-container flex text-effect">
                                                    <label className='label-position' htmlFor="position">I’m the</label>
                                                    <Field
                                                        autoComplete='off'
                                                        type='text'
                                                        name='Position'
                                                        id='position'
                                                        className={`contact-input ${errors.Position && touched.Position ? ("isError") : null}`}
                                                        placeholder='...'
                                                    />
                                                </div>
                                                <div className="input-container flex text-effect">
                                                    <label className='label-company' htmlFor="company">at</label>
                                                    <Field
                                                        autoComplete='off'
                                                        type='text'
                                                        name='Company'
                                                        id='company'
                                                        className={`contact-input ${errors.Company && touched.Company ? ("isError") : null}`}
                                                        placeholder='...'
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="input-container text-effect">
                                            <label className='label-message' htmlFor="message">I’d like to connect with you about</label>
                                            <Field
                                                autoComplete='off'
                                                as="textarea"
                                                name='Message'
                                                id='message'
                                                rows={1} // empieza pequeñito
                                                className={`contact-input ${errors.Message && touched.Message ? ("isError") : null}`}
                                                placeholder='Type'
                                                ref={textareaRef}
                                                onInput={handleTextarea}
                                            />
                                        </div>
                                        <div className="flex-content-form text-effect">
                                            <button type='submit'>
                                                Submit
                                            </button>
                                            <div className="extra-text">By clicking "submit", you agree to Landa's {/*}<a href='/privacy-policy'>Terms of use</a> and{*/} <a href='/privacy-policy'>Privacy Policy</a></div>
                                        </div>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                    <div className="newsletter-wrapper">
                        <div className="newsletter-text text-effect">{contact_section.newsletter_text}</div>
                        <div className="newsletter-form text-effect">
                            <Formik
                                initialValues={initalValuesNewsletter}
                                validationSchema={validationNewsletter}
                                onSubmit={handleSubmitNewsletter}
                            >
                                {({errors, touched}) => (
                                    <Form className="contact-form" ref={NewsletterContactForm}>
                                        <div className="newsletter-success-message">Thank you for subscribing. We look forward to sharing inspiring updates with you.</div>
                                        <div className="wrapper-content-form">
                                            <div className="input-container no-top text-inview">
                                                <Field
                                                    autoComplete='off'
                                                    type='text'
                                                    name='Email'
                                                    id='email'
                                                    className={`newsletter-input ${errors.Email && touched.Email ? ("isError") : null}`}
                                                    placeholder='Email'
                                                />
                                            </div>
                                            <button type='submit'>
                                                Subscribe
                                            </button>
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </div>
                </div>
                <div className="mobile-links">
                    <div className="flex-content">
                        <div className="left">
                            <a target="_blank" rel="noopener noreferrer" href={`tel: ${contact_section.phone}`} className="link text-effect">T. {contact_section.phone}</a>
                            <a target="_blank" rel="noopener noreferrer" href={`mailto: ${contact_section.mail}`} className="link text-effect">{contact_section.mail}</a>
                            <a target="_blank" rel="noopener noreferrer" href={contact_section.maps} className="link location text-effect">{contact_section.location}</a>
                        </div>
                        <div className="right">
                            <a href={contact_section.instagram} target="_blank" rel="noopener noreferrer" className="link text-effect">Instagram</a>
                            <a href={contact_section.linkedin} target="_blank" rel="noopener noreferrer" className="link text-effect">Linkedin</a>
                            <a className="link text-effect" href="https://www.latentestudio.com/en" target="_blank" rel="noopener noreferrer">Creative Strategy</a>
                        </div>
                    </div>
                    <div className="flex-content">
                        <div className="left">
                            <div className="copyright text-effect">All rights reserved Landa® 2025</div>
                        </div>
                        <div className="right">
                            <a href={(template === 'privacy') ? '#' : '/privacy-policy' } className={`link text-effect ${(template === 'privacy') ? 'active' : '' }`}>Privacy Policy</a>
                        </div>
                    </div>
                </div>
                <div className="desktop-links">
                    <div className="left-links">
                        <div className="flex-content">
                            <div className="left-column">
                                <a href={contact_section.instagram} target="_blank" rel="noopener noreferrer" className="link text-effect">Instagram</a>
                                <a href={contact_section.linkedin} target="_blank" rel="noopener noreferrer" className="link text-effect with-mt">Linkedin</a>
                            </div>
                            <div className="right-column">
                                <a target="_blank" rel="noopener noreferrer" href={`tel: ${contact_section.phone}`} className="link text-effect">T. {contact_section.phone}</a>
                                <a target="_blank" rel="noopener noreferrer" href={`mailto: ${contact_section.mail}`} className="link text-effect with-mt">{contact_section.mail}</a>
                            </div>
                        </div>
                    </div>
                    <div className="center-links">
                        <div className="left-column">
                            <a target="_blank" rel="noopener noreferrer" href={contact_section.maps} className="link text-effect location">
                                {contact_section.location}
                                <div className="subline" />
                            </a>
                        </div>
                        <div className="right-column">
                            <a className="link text-effect" href="https://www.latentestudio.com/en" target="_blank" rel="noopener noreferrer">Creative Strategy</a>
                        </div>
                    </div>
                    <div className="right-links">
                        <div className="copyright text-effect">All rights reserved Landa® 2025</div>
                        <a href={(template === 'privacy') ? '#' : '/privacy-policy' } className={`link text-effect ${(template === 'privacy') ? 'active' : '' }`}>Privacy Policy</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;