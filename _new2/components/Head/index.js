import React, { ReactElement } from 'react';
import NextHead from 'next/head';

const siteMeta = {
    name: "David Calhoun Photography",
    description: "Landscape and travel photography by David Calhoun.",
    domain: "https://www.davidcalhounphotography.com/",
    image: {
        url: "",
        alt: ""
    },
    author: {
        name: "David Calhoun",
        twitter: "@franksvalli"
    },

}

export const Head = (props) => {
    const { title, description, image, imageAlt, children } = props;

    const meta = {
        // e.g. <meta property="og:locale" content="en_US" />
        property: {
            /*
             * Facebook Open Graph
             * Debugger: https://developers.facebook.com/tools/debug/
             */
            "og:locale": "en_US",
            "og:type": "website",
            "og:url": "",
            "og:title": title || siteMeta.name,
            "og:image": image || siteMeta.image.url,
            "og:image:alt": imageAlt || siteMeta.image.alt,
            "og:description": description || siteMeta.description,
            "og:site_name": siteMeta.name,
        },
        // e.g. <meta name="twitter:card" content="summary_large_image" />
        name: {
            /*
             * Twitter Cards
             * Debugger: https://cards-dev.twitter.com/validator
             */
            "twitter:card": "summary_large_image",
            "twitter:title": title || siteMeta.name,
            "twitter:url": "",
            "twitter:site": siteMeta.author.twitter,
            "twitter:creator": siteMeta.author.twitter,
            "twitter:domain": siteMeta.domain,
            "twitter:description": description || siteMeta.description,
            "twitter:image": image || siteMeta.image.url,
            "twitter:image:alt": imageAlt || siteMeta.image.alt
        },
        // e.g. <meta itemProp="name" content="" />
        itemProp: {
            /*
             * Schema.org
             * Debugger: https://search.google.com/test/rich-results
             */
            "name": title || siteMeta.name,
            "headline": "",
            "description": description || siteMeta.description,
            "image": image || siteMeta.image.url
        }
    }

    return (
        <NextHead>
            <meta charSet="utf-8" />
            <title>{title}</title>
            <meta content={description} name="description" />
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            <meta name="author" content={siteMeta.author.name} />
            <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
            <meta httpEquiv="content-language" content="en" />
            <meta httpEquiv="X-UA-Compatible" content="IE=edge" />

            {
                Object.entries(meta).reduce((metaElts, [keyProp, contentEntries]) => {
                    const meta = Object.entries(contentEntries).map(([key, val]) => {
                        const metaProps = {
                            key: `${keyProp}-${key}`,
                            [keyProp]: key,
                            content: val
                        }
                        return <meta {...metaProps} />
                    });

                    return [...metaElts, ...meta];
                }, [])
            }

            {/* Fav icons and theme styling. */}
            <link rel="shortcut icon" type="image/png" href="/favicons/favicon-96x96.png" sizes="16x16 32x32 64x64" />
            <link rel="apple-touch-icon" sizes="57x57" href="/favicons/apple-icon-57x57.png" />
            <link rel="apple-touch-icon" sizes="60x60" href="/favicons/apple-icon-60x60.png" />
            <link rel="apple-touch-icon" sizes="72x72" href="/favicons/apple-icon-72x72.png" />
            <link rel="apple-touch-icon" sizes="76x76" href="/favicons/apple-icon-76x76.png" />
            <link rel="apple-touch-icon" sizes="114x114" href="/favicons/apple-icon-114x114.png" />
            <link rel="apple-touch-icon" sizes="120x120" href="/favicons/apple-icon-120x120.png" />
            <link rel="apple-touch-icon" sizes="144x144" href="/favicons/apple-icon-144x144.png" />
            <link rel="apple-touch-icon" sizes="152x152" href="/favicons/apple-icon-152x152.png" />
            <link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-icon-180x180.png" />
            <link rel="icon" type="image/png" sizes="192x192" href="/favicons/android-icon-192x192.png" />
            <link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png" />
            <link rel="icon" type="image/png" sizes="96x96" href="/favicons/favicon-96x96.png" />
            <link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16x16.png" />
            <meta name="msapplication-TileColor" content="#ffffff" />
            <meta name="msapplication-TileImage" content="/favicons/ms-icon-144x144.png" />
            <meta name="theme-color" content="#ffffff" />
            {children}
        </NextHead>
    );
};

export default Head;