import Head from 'next/head';
import Link from 'next/link';
import { HoverSlideshow, HoverSlideshowAnimated } from 'react-hover-slideshow';

import { Footer, Header } from '../components';
import styles from '../styles/Home.module.css';

const japanImageURLs = [
    '/japan-previews/03.jpg',
    '/japan-previews/02.jpg',
    '/japan-previews/01.jpg',
    '/japan-previews/04.jpg',
    '/japan-previews/05.jpg',
    '/japan-previews/06.jpg',
    '/japan-previews/07.jpg',
    '/japan-previews/08.jpg'
];

const easternSierraURLs = [
    '/eastern-sierra-california-previews/01.jpg',
    '/eastern-sierra-california-previews/02.jpg',
    '/eastern-sierra-california-previews/03.jpg',
    '/eastern-sierra-california-previews/04.jpg'
]

export default function Home() {
    return (
        <div className={styles.container}>
            <Head>
                <title>David Calhoun - Landscape and Travel Photography</title>
                <meta name="description" content="Landscape and travel photography portfolio." />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={styles.main}>
                <div className="gradient-bg">
                    <Header isMainIndex />
                    <div className="layer base"></div>
                    <div className="layer treatment"></div>
                    <div className="layer glow"></div>
                    <div className="layer vignette"></div>
                    <div className="layer noise"></div>
                    <div className="layer particles"></div>
                    <div className="layer base"></div>
                </div>

                <div className={styles.galleries}>
                    <h2>Photo Galleries</h2>
                    <ul className={styles.galleriesThumbs}>
                        <li>
                            <Link
                                href="/gallery/japan"
                                className={styles.galleryName}
                                aria-label="Japan Gallery">

                                <HoverSlideshowAnimated
                                    aria-label={'Japan Gallery'}
                                    images={japanImageURLs}
                                    width="400px"
                                    height="267px"
                                    className={styles.gallery}
                                >
                                    <span>Japan</span>
                                </HoverSlideshowAnimated>

                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/gallery/eastern-sierra"
                                className={styles.galleryName}
                                aria-label="Eastern Sierra Gallery">

                                <HoverSlideshowAnimated
                                    aria-label={'Eastern Sierra Gallery'}
                                    images={easternSierraURLs}
                                    width="400px"
                                    height="267px"
                                    className={styles.gallery}
                                >
                                    <span>Eastern Sierra</span>
                                </HoverSlideshowAnimated>

                            </Link>
                        </li>
                    </ul>
                </div>
            </main>
            <Footer />
        </div>
    );
}
