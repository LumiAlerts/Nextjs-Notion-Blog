import axios from "axios";
import { useEffect, useState } from "react";

const usePost = (postID) => {
	const [post, setPost] = useState({});
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (postID) {
			setLoading(true);
			axios
				.get(`/api/post?postID=${postID}`)
				.then((res) => {
					setPost(res.data);
				})
				.catch((err) => {
					console.log(err);
				})
				.finally(() => {
					setLoading(false);
				});
		}
	}, [postID]);

	return { post, loading };
};

export default usePost;
