export const constructPosts = (results) => {
	const posts = results.map(
		({ properties, created_time, last_edited_time, cover, id }) => ({
			tags: properties.Tags.multi_select.map(({ name, color }) => ({
				name,
				color,
			})),
			title: properties.Title.formula.string,
			createdTime: created_time,
			views: properties.views.number,
			lastEdited: last_edited_time,
			cover: cover,
			memo: properties.memo.rich_text[0].plain_text,
			id,
			author: properties.author,
			author_picture: properties,
		})
	);

	return posts;
};
