import React, { Fragment, useEffect } from "react";
import ReactDOM, { createPortal } from "react-dom";
import { useParams, Redirect } from "react-router-dom";
import ReactMarkdown from "react-markdown";

import { siteName, galleries, siteUrl } from "../../consts";
import { deslugify, markdownToPlainText } from "../../utils";
import { NotFound } from "../";
import styles from "./gallery.css";

const imageSizes = [
	{
		size: "sm",
		media: "(max-width: 500px)",
	},
	{
		size: "md",
		media: "(max-width: 1000px)",
	},
	{
		size: "lg",
		media: "(min-width: 1001px)",
	},
];

const imageMimeTypes = ["webp", "jpeg"];

const GalleryItem = (props) => {
	const { path, name, alt, caption, width, height, genre, keywords } = props;

	return (
		<figure
			key={path}
			itemProp="image"
			itemScope=""
			itemType="https://schema.org/ImageObject"
			className={styles.galleryItem}
		>
			<picture className={styles.galleryPhoto}>
				<span
					itemScope=""
					itemProp="author"
					itemType="https://schema.org/Person"
				>
					<meta itemProp="name" content="David Calhoun" />
					<meta
						itemProp="url"
						content="https://www.themaingate.net"
					/>
				</span>
				{caption && (
					<meta
						itemProp="caption"
						content={markdownToPlainText(caption)}
					/>
				)}
				{name && <meta itemProp="name" content={name} />}
				{width && <meta itemProp="width" content={width} />}
				{height && <meta itemProp="height" content={height} />}
				<span
					itemScope=""
					itemProp="thumbnail"
					itemType="https://schema.org/ImageObject"
				>
					<meta itemProp="url" content={`${path}-sm-resize.jpeg`} />
				</span>
				{keywords && <meta itemProp="keywords" content={keywords} />}
				{genre && <meta itemProp="genre" content={genre} />}
				<meta itemProp="isFamilyFriendly" content="true" />
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
					loading="lazy"
					alt={alt}
					width={width}
					height={height}
					className={styles.galleryPhotoImg}
				/>
			</picture>
			<figcaption className={styles.galleryItemCaption}>
				<ReactMarkdown source={name} className={styles.itemName} />
				<ReactMarkdown
					source={caption}
					className={styles.itemCaption}
					linkTarget="_blank"
				/>
			</figcaption>
		</figure>
	);
};

const HeadMetaTags = (props) => {
	const { title, description, image, imageAlt, caption, galleryName } = props;
	return createPortal(
		<Fragment>
			<link rel="canonical" href={`${siteUrl}/gallery/${galleryName}`} />
			<meta property="og:locale" content="en_US" />
			<meta property="og:type" content="website" />
			<meta property="og:url" content={window.location.href} />
			<meta property="og:title" content={title} />
			<meta property="og:image" content={image} />
			<meta
				property="og:image:alt"
				content={imageAlt}
			/>
			<meta
				property="og:description"
				content={description}
			/>
			<meta property="og:site_name" content="David Calhoun Photography" />
			<meta name="twitter:card" content="summary_large_image" />
			<meta
				name="twitter:title"
				content={title}
			/>
			<meta
				name="twitter:url"
				content={window.location.href}
			/>
			<meta name="twitter:site" content="@franksvalli" />
			<meta name="twitter:creator" content="@franksvalli" />
			<meta name="twitter:domain" content="https://www.davidcalhounphotography.com/" />
			<meta
				name="twitter:description"
				content={description}
			/>
			<meta
				name="twitter:image"
				content={image}
			/>
			<meta
				name="twitter:image:alt"
				content={imageAlt}
			/>
		</Fragment>,
		document.head
	);
};

const Gallery = () => {
	const { galleryName } = useParams();
console.log(11, 'hello')
	// 	const validSlugs = galleries.map(({ slug }) => slug);
	//
	// 	if (!validSlugs.includes(galleryName)) {
	// 		return (<NotFound/>);
	// 	}

	const gallery = galleries.find(({ slug }) => slug === galleryName);

	if (!gallery) {
		return <NotFound />;
	}

	// TODO: get from const instead
	const galleryNameForDisplay = deslugify(galleryName);

	const pageTitle = `${gallery.name} Gallery - ${siteName}`;

	function init() {
		document.title = pageTitle;
	}
	useEffect(init, []);

	const firstImage = gallery.content[0];

	const metaProps = {
		title: pageTitle,
		description: 'Specializing in travel and landscape photography.',
		image: `${firstImage?.path}-lg-resize.jpeg`,
		imageAlt: firstImage?.alt,
		galleryName
	};

	return (
		<Fragment>
			<HeadMetaTags {...metaProps} />
			<div className={styles.container}>
				<h1 className={styles.heading}>{gallery.name} Gallery</h1>
				{gallery.content?.map(GalleryItem)}
			</div>
		</Fragment>
	);
};

export default Gallery;
