export const siteName = "David Calhoun Photography";
export const siteSubname = "Landscape and Travel Photography";

export const galleries = [
	{
		name: "National Parks",
		slug: "national-parks",
		previews: [
			"https://www.davidcalhounphotography.com/japan/japan-01.jpg",
			"https://www.davidcalhounphotography.com/japan/japan-02.jpg",
			"https://www.davidcalhounphotography.com/japan/japan-03.jpg"
		],
		content: [
			{
				path: "/photos/japan/20190412-IMG_2745",
				name: "test name",
				alt: "test alt",
				caption: "test caption",
				width: 1500,
				height: 1000,
				genre: "Travel Photography",
				keywords: "foo, bar, baz",
			},
			{
				path: "/photos/japan/20190412-IMG_2754",
				name: "test name 2",
				alt: "test alt 2",
				caption: "test caption 2",
				width: 2000,
				height: 1500,
				genre: "Travel Photography",
				keywords: "foo, bar, baz",
			}
		]
	},
	{
		name: "Japan",
		slug: "japan",
		previews: [
			"https://www.davidcalhounphotography.com/japan/japan-01.jpg",
			"https://www.davidcalhounphotography.com/japan/japan-02.jpg",
			"https://www.davidcalhounphotography.com/japan/japan-03.jpg"
		]
	}
];

export const BREAKPOINTS = {
	1: 100,
	4: 480,
	7: 768,
	9: 992,
	12: 1200
}