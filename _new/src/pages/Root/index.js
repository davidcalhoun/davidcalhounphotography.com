import React, { Fragment, useEffect } from "react";
import { useParams } from "react-router-dom";
import { HoverSlideshow, HoverSlideshowAnimated } from "react-hover-slideshow";
import { Link } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import ReactDOM, { createPortal } from "react-dom";

import { siteName, galleries, siteUrl } from "../../consts";
import { slugify } from "../../utils";
import styles from "./root.css";

const LoadingPreview = ({ progressPercent }) => {
	return <CircularProgress variant="determinate" value={progressPercent} />;
};

const HeadMetaTags = () => {
	return createPortal(
		<Fragment>
			<link rel="canonical" href={siteUrl} />
		</Fragment>,
		document.head
	);
};

const GalleryPreview = ({ name, imageURLs, ...otherProps }) => {
	return (
		<Link
			to={`/gallery/${slugify(name)}`}
			className={styles.galleryPreview}
			{...otherProps}
		>
			<HoverSlideshowAnimated
				aria-label={name}
				images={imageURLs}
				width="400px"
				height="266.6666px"
				className={styles.galleryHoverSlideshow}
				LoadingPlaceholder={LoadingPreview}
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
			<HeadMetaTags />
			<h1 className={styles.heading}>Photo Galleries</h1>

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
