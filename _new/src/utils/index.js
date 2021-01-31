export { default as useWindowResize } from './useWindowResize';
export * from './markdownToText';

export const capitalizeFirstLetter = str => `${str[0].toUpperCase()}${str.substr(1)}`;

export const capitalize = str => str.split(' ').map(word => capitalizeFirstLetter(word)).join(' ');


/**
 * Converts a string to a URL-friendly slug.
 */
export const slugify = str => {
	return encodeURIComponent(str.replace(/\(|\)|\//g, "").replace(/\s/g, "-").toLowerCase());
}

/**
 * Converts a URL slug to a string for display.
 */
export const deslugify = str => {
	return capitalize(decodeURIComponent(str.replace(/-/g, " ")));
}
