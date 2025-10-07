import React from 'react'
import Head from 'next/head'

const Template = ({ children, title, description, keywords, template }) => {

    const siteUrl = "https://landa.com.mx/";
    const img = "https://landa.com.mx/social.png"; // asegúrate 1200x630, PNG/JPG, pública

    return (
        <>
            <Head>
                <meta charSet="UTF-8" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />

                <title>{title}</title>
                <meta name="description" content={description} />
                {keywords && <meta name="keywords" content={keywords} />}
                <meta name="author" content="Goplek" />
                <meta name="robots" content="index, follow" />

                {/* Evita href vacío; si no tienes alternates aún, quita esta línea */}
                {/* <link rel="alternate" hrefLang="es" href={siteUrl} /> */}

                <link rel="icon" href={`${siteUrl}favicon.png`} />
                <link rel="apple-touch-icon" sizes="180x180" href={`${siteUrl}favicon.png`} />

                {/* Open Graph */}
                <meta property="og:type" content="website" />
                <meta property="og:site_name" content="Landa" />
                <meta property="og:title" content={title} />
                <meta property="og:description" content={description} />
                <meta property="og:url" content={siteUrl} />
                <meta property="og:image" content={img} />
                <meta property="og:image:secure_url" content={img} />
                <meta property="og:image:type" content="image/png" />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />
                <meta property="og:image:alt" content="Landa" />
                {/* opcional: <meta property="og:locale" content="es_ES" /> */}

                {/* Twitter/X */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:site" content="@TuUsuario" />
                <meta name="twitter:title" content={title} />
                <meta name="twitter:description" content={description} />
                <meta name="twitter:image" content={img} />
                {/* twitter:url no es necesario; usa og:url */}
                <meta name="theme-color" content="#F1EDE5" />
                <meta name="apple-mobile-web-app-status-bar-style" content="#F1EDE5" />
            </Head>
            <div className={`outer-wrapper ${template}`}>
                {children}
            </div>
        </>
    );
}

export default Template;