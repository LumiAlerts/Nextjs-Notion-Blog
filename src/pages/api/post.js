import { FetchNotionBlocks } from "notion-blocks";

export default async function handler(req, res) {
	if (req.method === "GET") {
		const { postID } = req.query;
		const { cover, response, blocks } = await FetchNotionBlocks({
			notionPageId: postID,
			notionKey: process.env.NOTION_KEY,
		});

		return res.status(200).json({
			cover,
			response,
			blocks,
		});
	}
}
