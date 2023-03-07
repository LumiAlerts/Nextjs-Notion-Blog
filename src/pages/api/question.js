const { Client } = require("@notionhq/client");

export default async function handler(req, res) {
	if (req.method !== "POST") {
		return res.status(405).json({ message: "Method not allowed" });
	}

	const { question } = req.body;
	if (!question) {
		return res.status(400).json({ message: "Question is required" });
	}
	const databaseId = process.env.NOTION_QUESTION_DATABASE_ID;
	const notion = new Client({
		auth: process.env.NOTION_KEY,
	});

	try {
		await notion.pages.create({
			parent: {
				database_id: databaseId,
			},
			properties: {
				Document: {
					title: [
						{
							text: {
								content: question,
							},
						},
					],
				},
				Question: {
					type: "rich_text",
					rich_text: [
						{
							type: "text",
							text: { content: question },
						},
					],
				},
			},
		});

		return res.status(200).json({ message: "Success" });
	} catch (error) {
		return res.status(500).json({ message: "Something went wrong" });
	}
}
