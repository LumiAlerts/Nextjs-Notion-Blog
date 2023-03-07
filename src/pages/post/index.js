import usePost from "@/hooks/usePost";
import {
	Button,
	Container,
	IconButton,
	Skeleton,
	Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { Render } from "@9gustin/react-notion-render";
import NavBar from "@/components/Navbar";
import prism from "../../assets/prism";
import { useEffect } from "react";
import styles from "./index.module.scss";
import SEO from "@/components/SEO";
import AskAQuestion from "@/components/AskAQuestion";
import dayjs from "dayjs";
import useTimeRead from "@/hooks/useTimeRead";
import { ChevronLeft } from "@mui/icons-material";

const Post = () => {
	const router = useRouter();
	const { postID } = router.query;
	const { post, loading } = usePost(postID);
	const { timeFormatted } = useTimeRead(loading || post);
	const { blocks, cover, response } = post;

	useEffect(() => {
		if (!loading) {
			prism.highlightAll();
		}
	}, [loading]);

	const skeletonMap = Array.from(Array(20).keys());

	return (
		<>
			<SEO
				title={post?.response?.properties?.Title?.formula?.string}
				image={cover?.external?.url}
			/>
			<NavBar heroPhoto={cover?.external?.url} loading={loading} />
			{loading ? (
				<Container maxWidth="md" className={styles.loadingContainer}>
					<Skeleton
						variant="rectangular"
						height={40}
						sx={{ marginBottom: 2 }}
					/>
					{skeletonMap?.map((n, index) => (
						<Skeleton variant="rectangular" height={20} key={index} />
					))}
				</Container>
			) : (
				<Container maxWidth="md">
					<Typography variant="body2" className={styles.details}>
						<IconButton variant="link" onClick={() => router.back()}>
							<ChevronLeft />
						</IconButton>
						{dayjs(response?.properties?.created_time?.created_time).format(
							"MM/DD/YYYY"
						)}{" "}
						| {timeFormatted}
					</Typography>

					<Render blocks={blocks} useStyles simpleTitles emptyBlocks />
				</Container>
			)}
			<AskAQuestion />
		</>
	);
};

export default Post;
