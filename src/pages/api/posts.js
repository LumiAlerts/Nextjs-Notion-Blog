// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const { Client } = require("@notionhq/client");

import { constructPosts } from "@/APIHelpers/posts";
import cache from "memory-cache";

export default async function handler(req, res) {
	if (req.method === "GET") {
		const notion = new Client({ auth: process.env.NOTION_KEY });
		const databaseId = process.env.NOTION_DATABASE_ID;
		try {
			let results;
			if (req.query.queryType === "topPosts") {
				const cachedTopPosts = cache.get("topPosts");

				if (
					process.env.NODE_ENV === "production" &&
					cachedTopPosts?.posts &&
					Date.now() - cachedTopPosts?.fetchedAt < 30 * 60 * 1000 // 30 minutes
				) {
					return res.status(200).json({ posts: cachedTopPosts.posts });
				}

				const response = await notion.databases.query({
					database_id: databaseId,
					filter: {
						property: "published",
						checkbox: {
							equals: true,
						},
					},
					sorts: [
						{
							property: "views",
							direction: "descending",
						},
					],
					page_size: 4,
				});

				results = response?.results;
				const posts = constructPosts(results);
				cache.put("topPosts", { posts, fetchedAt: Date.now() });
			} else if (req.query.queryType === "recent") {
				const cachedRecentPosts = cache.get("recentPosts");

				if (
					process.env.NODE_ENV === "production" &&
					cachedRecentPosts?.posts &&
					Date.now() - cachedRecentPosts?.fetchedAt < 30 * 60 * 1000 // 30 minutes
				) {
					return res.status(200).json({ posts: cachedRecentPosts.posts });
				}

				const response = await notion.databases.query({
					database_id: databaseId,
					filter: {
						property: "published",
						checkbox: {
							equals: true,
						},
					},
					sorts: [
						{
							property: "created_time",
							direction: "descending",
						},
					],
					page_size: 2,
				});
				results = response?.results;
				const posts = constructPosts(results);
				cache.put("recentPosts", { posts, fetchedAt: Date.now() });
			} else {
				const response = await notion.databases.query({
					database_id: databaseId,
					filter: {
						property: "published",
						checkbox: {
							equals: true,
						},
					},
					sorts: [
						{
							property: "created_time",
							direction: "descending",
						},
					],
				});
				results = response?.results;
			}

			const posts = constructPosts(results);

			return res.status(200).json({ posts });
		} catch (error) {
			return res.status(500).json({ error });
		}
	}

	return res.status(405).json({ error: "Method not allowed" });
}
