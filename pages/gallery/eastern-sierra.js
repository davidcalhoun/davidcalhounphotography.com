import Head from 'next/head';

import { Footer, Header, Image } from '../../components';
import styles from '../../styles/Gallery.module.css';

export default function Gallery() {
    return (
        <div className={styles.container}>
            <Head>
                <title>Eastern Sierra Gallery - David Calhoun Photography</title>
                <meta name="description" content="Photo highlights from the Eastern Sierra in California." />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <Header isMainIndex={false} />
                <h1 className={styles.title}>Eastern Sierra Gallery</h1>

                <section className={styles.photos}>
                    <Image
                        path={'/eastern-sierra-california/5D__4867-yosemite-falls-in-winter'}
                        name="Frozen Falls"
                        alt="Zoomed-in view of Yosemite Falls on the right, and on the left a bare rock face covered with stripes of black lichens."
                        caption={`Icy Yosemite falls on the right gives a sense of a lively flow, while on the left the black lichens hang onto on the bare cliff face and give a sense of a much slower flow.
&nbsp;\n
&nbsp;\n
*Yosemite National Park, California, USA.  March 2017.*`}
                        width={2000}
                        height={1333}
                        genre="Travel Photography"
                        keywords="eastern sierra, national park, snow, waterfall, winter, yosemite, frozen, ice, cold"
                    />
                    <Image
                        loading="eager"
                        decoding="sync"
                        path={'/eastern-sierra-california/2V9A0755-manzanar-soul-consoling-tower-慰霊塔-cemetery-mount-williamson-eastern-sierra-california'}
                        name="Manzanar Morning"
                        alt="Vibrant sunrise view of the white monument (the Kanji characters literally mean soul consoling tower, 慰霊塔) at Manzanar Cemetery, with Mount Williamson and the Eastern Sierra seen in the background being touched by the first soft pink sunlight of the new day."
                        caption={`The soul-consoling tower (慰霊塔) at Manzanar cemetery is a quiet remembrance standing out from the desert floor..  Mount Williamson can be seen centered in the background, amongst the mountains of the Eastern Sierra being touched by the first soft pink light of the new day..
&nbsp;\n
&nbsp;\n
*Manazar, California, USA.  December 2021.*`}
                        width={2000}
                        height={1334}
                        genre="Travel Photography"
                        keywords="慰霊塔, manzanar, cemetery, california, eastern sierra, internment camp, japanese, morning, mount williamson, mountains, sunrise"
                    />
                    <Image
                        path={'/eastern-sierra-california/2V9A0793-goodale-mountain-sunrise-eastern-sierra-california'}
                        name="Sunrise at Goodale Mountain"
                        alt="The first soft pink light of the day touching Goodale Mountain in the distance.  In the foreground is the high desert floor with a few trees and many shrubs."
                        caption={`The first soft pink light of the day touching Goodale Mountain in the distance, seen from Manzanar.
&nbsp;\n
&nbsp;\n
*Manazar Cemetery, California, USA.  December 2021.*`}
                        width={2000}
                        height={1334}
                        genre="Travel Photography"
                        keywords="goodale mountain, california, eastern sierra, manzanar, morning, mountains, sunrise"
                    />
                    <Image
                        path={'/eastern-sierra-california/5D__4997-yosemite-cliff-near-mirror-lake'}
                        name="Cliff face near Mirror Lake"
                        alt="A jagged cliff face in the distance, with a few trees amongst the rocks trying to grow in austere conditions."
                        caption={`A few lone trees managing to survive amongst the rock cliff faces in Yosemite, from a hike near Mirror Lake.
&nbsp;\n
&nbsp;\n
*Yosemite National Park, California, USA.  March 2017.*`}
                        width={2000}
                        height={1333}
                        genre="Travel Photography"
                        keywords="cliff, eastern sierra, landscape photography, national park, yosemite"
                    />
                </section>
            </main>

            <Footer />
        </div>
    );
}
