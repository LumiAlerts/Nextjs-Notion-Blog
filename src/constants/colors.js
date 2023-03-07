const notionColor = [
	{
		color: "yellow",
		hex: "#ffe894",
	},
	{
		color: "brown",
		hex: "#e0c9a0",
	},
];

export const resolveColor = (color) => {
	return `${
		notionColor.find((notionColor) => notionColor.color === color)?.hex
	}`;
};
