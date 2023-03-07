import { constructPosts } from "@/APIHelpers/posts";

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const { Client } = require("@notionhq/client");

export default async function handler(req, res) {
	if (req.method !== "POST") {
		return res.status(405).json({ message: "Method not allowed" });
	}

	const PAGE_SIZE = 12;
	const MAX_PAGE_SIZE = 100;
	let { searchTerm, searchTag } = req.body;
	const notion = new Client({ auth: process.env.NOTION_KEY });
	const databaseId = process.env.NOTION_DATABASE_ID;
	const pageNumber = req.body.pageNumber || 1;


	try {
		const response = await notion.databases.query({
			database_id: databaseId,
			filter: {
				property: "published",
				checkbox: {
					equals: true,
				},
			},
			...(searchTag && {
				filter: {
					and: [
						{
							property: "published",
							checkbox: {
								equals: true,
							},
						},
						{
							property: "Tags",
							multi_select: {
								contains: searchTag,
							},
						},
					],
				},
			}),

			...(searchTerm && {
				filter: {
					and: [
						{
							property: "published",
							checkbox: {
								equals: true,
							},
						},
						{
							or: [
								{
									property: "Title",
									title: {
										contains: searchTerm,
									},
								},
								{
									property: "Title",
									title: {
										contains:
											searchTerm.charAt(0).toUpperCase() + searchTerm.slice(1),
									},
								},
								{
									property: "memo",
									rich_text: {
										contains: searchTerm,
									},
								},
								{
									property: "Tags",
									multi_select: {
										contains: searchTerm,
									},
								},
								{
									property: "Tags",
									multi_select: {
										contains:
											searchTerm.charAt(0).toUpperCase() + searchTerm.slice(1),
									},
								},
							],
						},
					],
				},
			}),
			sorts: [
				{
					property: "created_time",
					direction: "descending",
				},
			],
			page_size: MAX_PAGE_SIZE,
		});

		let results = response?.results;
		if (response?.has_more) {
			let next_cursor = response?.next_cursor;
			while (true) {
				const response = await notion.databases.query({
					database_id: databaseId,
					filter: {
						property: "published",
						checkbox: {
							equals: true,
						},
					},
					...(searchTag && {
						filter: {
							and: [
								{
									property: "published",
									checkbox: {
										equals: true,
									},
								},
								{
									property: "Tags",
									multi_select: {
										contains: searchTag,
									},
								},
							],
						},
					}),

					...(searchTerm && {
						filter: {
							and: [
								{
									property: "published",
									checkbox: {
										equals: true,
									},
								},
								{
									or: [
										{
											property: "Title",
											title: {
												contains: searchTerm,
											},
										},
										{
											property: "Title",
											title: {
												contains:
													searchTerm.charAt(0).toUpperCase() +
													searchTerm.slice(1),
											},
										},
										{
											property: "memo",
											rich_text: {
												contains: searchTerm,
											},
										},
										{
											property: "Tags",
											multi_select: {
												contains: searchTerm,
											},
										},
										{
											property: "Tags",
											multi_select: {
												contains:
													searchTerm.charAt(0).toUpperCase() +
													searchTerm.slice(1),
											},
										},
									],
								},
							],
						},
					}),
					sorts: [
						{
							property: "created_time",
							direction: "descending",
						},
					],
					page_size: MAX_PAGE_SIZE,
					start_cursor: next_cursor,
				});
				results = [...results, ...response?.results];
				next_cursor = response?.next_cursor;
				if (!response.has_more) break;
			}
		}

		// give pageNumber, and PAGE_SIZE slice results to return the correct content for the page
		const numberOfPages = Math.ceil(results.length / PAGE_SIZE);
		results = results.slice(
			(pageNumber - 1) * PAGE_SIZE,
			pageNumber * PAGE_SIZE
		);

		const posts = constructPosts(results);
		return res.status(200).json({ posts, numberOfPages });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Something went wrong" });
	}
}
