import Head from 'next/head';

import { Footer, Header, Image } from '../../components';
import styles from '../../styles/Gallery.module.css';

export default function Gallery() {
    return (
        <div className={styles.container}>
            <Head>
                <title>Japan Gallery - David Calhoun Photography</title>
                <meta name="description" content="A photo gallery preserving some memories from visits to Japan." />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <Header />
                <hgroup>
                    <h1 className={styles.title}>Japan Gallery</h1>
                </hgroup>

                <section className={styles.photos}>
                    <Image
                        loading="eager"
                        path={'/japan/5D__9044-hamarikyu-gardens-tokyo-japan-apr-2015'}
                        name="Framed Garden View"
                        alt="Looking out from a covered pavillion at blossoming plum and cherry trees in a Japanese garden."
                        caption={`In this garden pavillion I came across an elderly Japanese man who showed me a small wooden
porthole to look through to reveal the above view, perhaps a composition dreamed up through the eyes of some long gone architect.

Through the language barrier the man explained it was intended to be a place to perfectly frame the scene, and conseqently a
good spot for photographers.  Though this means my photo is one of many with this exact framing, I have still really enjoyed it.
&nbsp;\n
&nbsp;\n
*Hamarikyu Gardens, Tokyo, Japan.  April 2015.*

*浜離宮 東京 2015年4月*`}
                        width={2000}
                        height={1010}
                        genre="Travel Photography"
                        keywords="tokyo, japan, spring, hamarikyu gardens, cherry blossoms, plum blossoms, 浜離宮, 東京, 日本"
                    />
                    <Image
                        loading="eager"
                        path={'/japan/5D__0963-kiyomizudera-lightup-kyoto-japan-apr-2016'}
                        name="Night Glow at Kiyomizudera"
                        alt="Night view of a large wooden temple with a tall wooden platform in front.  Trees with green foliage surround the structure, illuminated by lights."
                        caption={`A special spring night illumination of the temple.  A beam of light is projected into the sky above
the city, guiding residents and tourists to the magical display.
&nbsp;\n
&nbsp;\n
*Kiyomizudera, Kyoto, Japan.  April 2016.*

*清水寺 京都 2016年4月*`}
                        width={2000}
                        height={1333}
                        genre="Travel Photography"
                        keywords="japan, kyoto, temple, night photography, 清水寺, 京都, 日本"
                    />
                    <Image
                        path={'/japan/IMG_7171-kyoto-tanabata-kyoto-japan-aug-2011'}
                        name="Festival on the Kamogawa at Magic Hour"
                        alt="Festival tents with an inner glow along the river, with the deep blue sky of the magic hour sunset in the background, and reflected on the river water."
                        caption={`I am very grateful I spent a summer in Kyoto long ago, being aimless and thinking I was unhappy,
and only looking back I realized this was one of the happier experiences of my life.  To attempt to recapture the feeling I had there,
I returned to Kyoto a few more times, but it's impossible to relive it.

Sometimes I also think of the pretty girl in a kimono, prepping backstage for a dance with her dance troupe, who saw me taking pictures and smiled
such a great smile.  I sometimes think about that girl and how her life must have changed so much since then.  I'm probably now the
only one who remembers that moment, preserving the memory.

\n\nA [nostalgic English poem](https://en.wikipedia.org/wiki/A_Shropshire_Lad) expresses some of thee nostalgic feelings:
&nbsp;\n
&nbsp;\n
> Into my heart an air that kills\n
> From yon far country blows:\n
> What are those blue remembered hills,\n
> What spires, what farms are those?\n
> &nbsp;\n
> That is the land of lost content,\n
> I see it shining plain,\n
> The happy highways where I went\n
> And cannot come again.
&nbsp;\n
&nbsp;\n
*Kamogawa River, Kyoto, Japan. August 2011 during Tanabata (Star Festival)*

*鴨川 京都 2011年8月 七夕*`}
                        width={2000}
                        height={1333}
                        genre="Travel Photography"
                        keywords="japan, kyoto, night photography, 鴨川, 京都, 七夕, 日本, tanabata, star festival, summer"
                    />
                    <Image
                        path={'/japan/5D__0024-bridge-to-kansai-airport-osaka-japan-mar-2016'}
                        name="Bridge to Kansai Airport"
                        alt="View of an illuminated orange bridge over water at magic hour, leading to a floating sea of lights in the distance."
                        caption={`Bridge to Kansai International Airport, which carries both trains and motor vehicles.                        
This airport is like a bookend - the first and last part of many peoples' journeys in Japan.

This fantastic view was a bit of a surprise for me after checking into the Star Gate Hotel.
&nbsp;\n
&nbsp;\n
*Izumisano, Osaka, Japan.  March 2016.*

*泉佐野市 大阪 2011年3月*`}
                        width={1333}
                        height={2000}
                        genre="Travel Photography"
                        keywords="osaka, japan, airport, night, 大阪, 泉佐野市, 日本"
                    />
                    <Image
                        path={'/japan/IMG_8723-kyoto-arashiyama-bamboo-lightup-kyoto-japan-dec-2012'}
                        name="Bamboo forest night illumination"
                        alt="Night scene of a path leading through tall bamboo trees.  The trees are illuminated and the path itself is illuminated by small lanterns."
                        caption={`This specific area has become famous in its own rite, and is recognizable by many
people who haven't set foot in Japan.  Consequently it's usually very crowded here, especially during special
illuminations such as this.  But if you're willing to visit very early in the morning just as the light starts to
filter in, it will help ensure that at least part of your visit will be more tranquil.
&nbsp;\n
&nbsp;\n
*Arashiyama Bamboo Forest, Kyoto, December 2012*

*嵐山 京都 2012年12月*`}
                        width={1333}
                        height={2000}
                        genre="Travel Photography"
                        keywords="arashiyama, bamboo forest, kyoto, japan, 嵐山, 京都, 日本, Arashiyama Bamboo Grove, Sagano Bamboo Forest, illumination, night, lightup"
                    />
                    <Image
                        path={'/japan/IMG_9854-bicycle-in-snow-kyoto-japan-feb-2013'}
                        name="Snow Falling On A Bike"
                        alt="Snow piling up on a bike, starting to fill its attached basket.  In the background part of a wet street is visible, with a green traffic light visible in the distance."
                        caption={`When I was studying Japanese in Kyoto I lived in a student dorm.  My classmate
had been eagerly anticipating snow but was disappointed by mild winter.  One day in February it finally happened -
it started snowing!  They knocked on my room's door to wake me up and let me know.  We walked outside together and
I took a few photos - before retreating back into my warm room.
&nbsp;\n
&nbsp;\n
*Sakyo Ward, Kyoto, Japan.  February 2013.*

*左京区 京都 2013年2月*`}
                        width={1333}
                        height={2000}
                        genre="Travel Photography"
                        keywords="snow, bike, kyoto, sakyo, 左京区, 京都, japan, 日本, winter, night"
                    />
                    <Image
                        path={'/japan/IMG_5061-aoi-matsuri-kyoto-japan-may-2013'}
                        name="Aoi Matsuri"
                        alt="A man wearing traditional Japanese clothes.  In the background out of focus is a parade procession of people in traditional styles, some mounted on horseback."
                        caption={`It's a joy to watch a traditional parade in Kyoto, even if it's hard to understand
what's going on.  This particular festival is great because of the large amount of space, making it not as claustrophobic
as other events (like Gion Matsuri).

For this particular parade I learned a lot of great tips from [the blog of Jeffrey Friedl](http://regex.info/blog/2006-05-18/195),
who is a Kyoto resident and happened to also work at Yahoo many years ago, like myself.  I'm pretty sure I spotted him
in the crowd with a very large lens.

*Aoi Matsuri at Kyoto Imperial Palace, Kyoto, Japan.  May 2013.*

*京都 2013年5月*`}
                        width={2000}
                        height={1333}
                        genre="Travel Photography"
                        keywords="葵祭, 京都, aoi matsuri, hollyhock festival, kyoto, japan, 日本, festival, tradition, japanese clothing"
                    />
                    <Image
                        path={'/japan/5D__2135-shirakawa-doorway-gifu-japan-may-2016'}
                        name=""
                        alt="."
                        caption={`Gasshō-zukuri (合掌造) minka home (民家).  The heat out here was still bearable,
but things were starting to warm up for sure.  I was pretty delighted to find the great symmetry and the asymmetry
in this shot.  Just imagine waking up and opening up your front door to this scene!

*Shirakawa village, Gifu Prefecture, Japan.  May 2016.*

*白川村 岐阜県 2016年5月*`}
                        width={2000}
                        height={1333}
                        genre="Travel Photography"
                        keywords="合掌造, 民家, 白川村, 岐阜県, gasshō-zukuri, minka, japan, Shirakawa village, Gifu, 日本"
                    />
                </section>
            </main>

            <Footer />
        </div>
    );
}
