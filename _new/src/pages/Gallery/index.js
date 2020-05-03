import React, { useEffect } from "react";
import { useParams, Redirect } from "react-router-dom";

import { siteName, galleries } from "../../consts";
import { deslugify } from "../../utils";
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
			<a href={`${path}-lg-resize.jpeg`}>
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
					{caption && <meta itemProp="caption" content={caption} />}
					{name && <meta itemProp="name" content={name} />}
					{width && <meta itemProp="width" content={width} />}
					{height && <meta itemProp="height" content={height} />}
					<span
						itemScope=""
						itemProp="thumbnail"
						itemType="https://schema.org/ImageObject"
					>
						<meta
							itemProp="url"
							content={`${path}-sm-resize.jpeg`}
						/>
					</span>
					{keywords && (
						<meta itemProp="keywords" content={keywords} />
					)}
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
					/>
				</picture>
			</a>
			<figcaption>
				{caption}
			</figcaption>
		</figure>
	);
};

const Gallery = () => {
	const { galleryName } = useParams();

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

	function init() {
		document.title = `${galleryNameForDisplay} Gallery - ${siteName}`;
	}
	useEffect(init, []);

	return (
		<div className={styles.container}>
			<h1 className={styles.heading}>{galleryNameForDisplay} Gallery</h1>
			{gallery.content.map(GalleryItem)}
		</div>
	);
};

export default Gallery;
