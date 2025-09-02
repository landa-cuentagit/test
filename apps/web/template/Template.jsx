import React from 'react'
import Head from 'next/head'

const Template = ({ children, title, description, keywords, template }) => {

    return (
        <>
            <Head>
                <meta charSet="UTF-8"/>
                <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>

                <title>{title}</title> 
                <meta name="description" content={description} />
                <meta name="keywords" content={keywords} />
                <meta name="author" content="Goplek" />
                {/*}<meta name="robots" content="INDEX, FOLLOW, ARCHIVE" />{*/}

                <link rel="alternate" hrefLang="es" href='' />

                <link rel="shortcut icon" href="https://landa-site.netlify.app/favicon.png" type="image/x-icon" />
                <link rel="apple-touch-icon" sizes="72x72" href="https://landa-site.netlify.app/favicon.png" />
                <link rel="apple-touch-icon" sizes="114x114" href="https://landa-site.netlify.app/favicon.png" />

                <meta itemProp="name" content={title}/>
                <meta itemProp="description" content={description}/>
                <meta itemProp="url" content='https://landa-site.netlify.app/' />
                <meta itemProp="image" content='https://landa-site.netlify.app/social.png'/>

                <meta property="fb:app_id" content="app-id"/>
                <meta property="og:site_name" content={title}/>
                <meta property="og:title" content={title}/>
                <meta property="og:description" content={description}/>
                <meta property="og:url" content='https://landa-site.netlify.app/' />
                <meta property="og:image" content='https://landa-site.netlify.app/social.png' />
                <meta property="og:type" content="website"/>

                <meta name="twitter:site" content={title}/>
                <meta name="twitter:title" content={title}/>
                <meta name="twitter:description" content={description}/>
                <meta name="twitter:url" content='https://landa-site.netlify.app/' />
                <meta name="twitter:image" content='https://landa-site.netlify.app/social.png' />
                <meta name="twitter:card" content="summary"/>

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