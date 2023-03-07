import axios from "axios";
import { useEffect, useState } from "react";

const useBlog = () => {
	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [numberOfPages, setNumberOfPages] = useState(0);

	const fetchPosts = (
		pageNumber = 1,
		searchTag = null,
		searchTerm = null,
		sort = null
	) => {
		setLoading(true);
		axios
			.post("/api/blog", { pageNumber, searchTag, searchTerm, sort })
			.then((res) => {
				setPosts(res?.data?.posts);
				setNumberOfPages(res?.data?.numberOfPages);
			})
			.catch((err) => {
				console.log(err);
			})
			.finally(() => {
				setLoading(false);
			});
	};

	useEffect(() => {
		fetchPosts();
	}, []);

	return { posts, setPosts, loading, fetchPosts, numberOfPages };
};

export default useBlog;
