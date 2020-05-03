import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { HoverSlideshow, HoverSlideshowAnimated } from "react-hover-slideshow";
import { Link } from "react-router-dom";

import { siteName, galleries } from "../../consts";
import { slugify } from "../../utils";
import styles from "./root.css";

const GalleryPreview = ({ name, imageURLs, ...otherProps }) => {
	return (
		<Link
			to={`/gallery/${slugify(name)}`}
			replace
			className={styles.galleryPreview}
			{...otherProps}
		>
			<HoverSlideshowAnimated
				aria-label={name}
				images={imageURLs}
				width="400px"
				height="300px"
				className={styles.galleryHoverSlideshow}
			>
				<h2 className={styles.galleryName}>{name}</h2>
			</HoverSlideshowAnimated>
		</Link>
	);
};

const Root = () => {
	function init() {
		document.title = siteName;
	}
	useEffect(init, []);

	return (
		<div>
			<h1>Root</h1>

			<div className={styles.galleriesContainer}>
			{galleries.map(({ name, previews }) => {
				return (
					<GalleryPreview
						key={name}
						name={name}
						imageURLs={previews}
					/>
				);
			})}
			</div>
		</div>
	);
};

export default Root;
