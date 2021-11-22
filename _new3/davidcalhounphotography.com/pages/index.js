import Head from 'next/head';
import Image from 'next/image';
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

export default function Home() {
    return (
        <div className={styles.container}>
            <Head>
                <title>David Calhoun - Landscape and Travel Photography</title>
                <meta name="description" content="Portfolio of landscape and travel photography." />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <Header />

                <div className={styles.galleries}>
                    <h2>Galleries</h2>
                    <ul className={styles.galleriesThumbs}>
                        <li>
                            <Link href="/gallery/japan" passHref>
                                <a className={styles.galleryName} aria-label="Japan Gallery">
                                    <HoverSlideshowAnimated
                                        aria-label={'Japan Gallery'}
                                        images={japanImageURLs}
                                        width="400px"
                                        height="266.6666px"
                                        className={styles.gallery}
                                    >
                                        <span>Japan</span>
                                    </HoverSlideshowAnimated>
                                </a>
                            </Link>
                        </li>
                    </ul>
                </div>
            </main>

            <Footer />
        </div>
    );
}
