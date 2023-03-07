import axios from "axios";
import { useEffect, useState } from "react";

const usePosts = (type) => {
	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		axios
			.get(`/api/posts?queryType=${type}`)
			.then((res) => {
				setPosts(res.data.posts);
			})
			.catch((err) => {
				console.log(err);
			})
			.finally(() => {
				setLoading(false);
			});
	}, [type]);
	return { posts, setPosts, loading };
};

export default usePosts;
