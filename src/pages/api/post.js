// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const { Client } = require("@notionhq/client");

export default async function handler(req, res) {
	if (req.method === "GET") {
		const { postID } = req.query;
		const notion = new Client({
			auth: process.env.NOTION_KEY,
		});

		try {
			const blocks = await notion.blocks.children.list({ block_id: postID });
			const { properties, cover } = await notion.pages.retrieve({
				page_id: postID,
			});

			const response = await notion.pages.retrieve({
				page_id: postID,
			});

			// update view count
			await notion.pages.update({
				page_id: postID,
				properties: {
					views: {
						number: properties.views.number + 1,
					},
				},
			});

			return res.status(200).json({
				cover,
				blocks: blocks?.results ?? [],
				response,
			});
		} catch (error) {
			return res.status(500).json({ error });
		}
	}
}
