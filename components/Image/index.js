import ReactMarkdown from 'react-markdown';
import remarkExternalLinks from 'remark-external-links'

import { markdownToPlainText } from '../../utils';
import styles from '../../styles/Image.module.css';

const imageMimeTypes = ['webp', 'jpeg'];

const imageSizes = [
    {
        size: 'sm',
        media: '(max-width: 500px)'
    },
    {
        size: 'md',
        media: '(max-width: 1000px)'
    },
    {
        size: 'lg',
        media: '(min-width: 1001px)'
    }
];

/** SEO-rich responsive image markup. */
const Image = (props) => {
    const { path, name, alt, caption, width, height, genre, keywords, loading, children, decoding } = props;

    return (
        <figure
            key={path}
            itemProp="image"
            itemScope=""
            itemType="https://schema.org/ImageObject"
            className={styles.container}
        >
            <picture className={styles.imageContainer}>
                <span itemScope="" itemProp="author" itemType="https://schema.org/Person">
                    <meta itemProp="name" content="David Calhoun" />
                    <meta itemProp="url" content="https://www.themaingate.net" />
                </span>
                {caption && <meta itemProp="caption" content={markdownToPlainText(caption)} />}
                {name && <meta itemProp="name" content={name} />}
                {width && <meta itemProp="width" content={width} />}
                {height && <meta itemProp="height" content={height} />}
                <span itemScope="" itemProp="thumbnail" itemType="https://schema.org/ImageObject">
                    <meta itemProp="url" content={`${path}-sm-resize.jpeg`} />
                </span>
                {keywords && <meta itemProp="keywords" content={keywords} />}
                {genre && <meta itemProp="genre" content={genre} />}
                <meta itemProp="isFamilyFriendly" content="true" />
                <a href={`${path}-lg-resize.jpeg`}>
                    {imageMimeTypes.map((mime) => {
                        return imageSizes.map(({ size, media }) => {
                            return (
                                <source
                                    key={`${mime}${size}`}
                                    type={`image/${mime}`}
                                    media={media}
                                    srcSet={`${path}-${size}-resize.${mime}`}
                                />
                            );
                        });
                    })}
                    <img
                        itemProp="url"
                        src={`${path}-lg-resize.jpeg`}
                        loading={ loading || "lazy" }
                        decoding={ decoding || "async" }
                        alt={alt}
                        width={width}
                        height={height}
                        className={styles.image}
                    />
                </a>
            </picture>
            <figcaption className={styles.captionContainer}>
                <ReactMarkdown className={styles.captionTitle}>
                    {name}
                </ReactMarkdown>
                <ReactMarkdown className={styles.captionDescription} linkTarget="_blank" remarkPlugins={[remarkExternalLinks]}>
                    {caption}
                </ReactMarkdown>
            </figcaption>
        </figure>
    );
};

export default Image;
