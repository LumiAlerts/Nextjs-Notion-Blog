const { Client } = require("@notionhq/client");

export default async function handler(req, res) {
	if (req.method !== "POST") {
		return res.status(405).json({ message: "Method not allowed" });
	}

	const { email } = req.body;
	if (!email) {
		return res.status(400).json({ message: "Email is required" });
	}

	const emailRegex =
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	if (!emailRegex.test(email)) {
		return res.status(400).json({ message: "Invalid email" });
	}

	const databaseId = process.env.NOTION_NEWS_LETTER_DATABASE_ID;
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
								content: email,
							},
						},
					],
				},
				Email: {
					type: "rich_text",
					rich_text: [
						{
							type: "text",
							text: { content: email },
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
