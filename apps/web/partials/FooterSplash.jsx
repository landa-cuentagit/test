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
        <footer className={`footer-splash ${template}`}>
            <div className="holder">
                <div className="content">
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
                    </div>
                    <div className="flex-content">
                        <div className="left">
                            <div className="copyright text-effect">All rights reserved Landa® 2025</div>
                        </div>
                        <div className="right">
                            <a className="link text-effect" href="https://www.latentestudio.com/en" target="_blank" rel="noopener noreferrer">Creative Strategy</a>
                        </div>
                    </div>
                </div>
                <div className="desktop-links">
                    <div className="left-links">
                        <div className="flex-content">
                            <div className="left-column">
                                <a target="_blank" rel="noopener noreferrer" href={`tel: ${contact_section.phone}`} className="link text-effect">T. {contact_section.phone}</a>
                                <a target="_blank" rel="noopener noreferrer" href={`mailto: ${contact_section.mail}`} className="link text-effect with-mt">{contact_section.mail}</a>
                            </div>
                            <div className="right-column">
                                <a target="_blank" rel="noopener noreferrer" href={contact_section.maps} className="link text-effect location">
                                    {contact_section.location}
                                    <div className="subline" />
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="right-links">
                        <div className="copyright text-effect">All rights reserved Landa® 2025</div>
                        <a className="link text-effect" href="https://www.latentestudio.com/en" target="_blank" rel="noopener noreferrer">Creative Strategy</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;