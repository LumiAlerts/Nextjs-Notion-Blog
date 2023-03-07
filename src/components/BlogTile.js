import { Typography } from "@mui/material";
import Image from "next/image";
import styles from "./styles/index.module.scss";
import dayjs from "dayjs";
import Link from "next/link";
import { useRouter } from "next/router";
import { ChevronRight } from "@mui/icons-material";

const BlogTile = ({ postObject, display = "tile" }) => {
	const router = useRouter();

	const isList = display === "list";
	return (
		<div
			className={styles.container}
			style={{
				flexDirection: isList ? "row" : "column",
				width: isList ? "100%" : "315px",
				alignItems: "center",
				gap: isList ? 24 : 8,
			}}
		>
			{!!postObject?.cover && postObject?.cover?.type === "external" && (
				<Image
					className={styles.image}
					src={postObject.cover.external.url}
					height={315}
					width={315}
					alt={"Blog tile image"}
					onClick={() =>
						router.push({
							pathname: `/post`,
							query: { postID: postObject?.id },
						})
					}
				/>
			)}
			<div
				style={{
					display: "flex",
					flexDirection: "column",
				}}
			>
				<Typography variant="h5" sx={{ marginTop: 2 }}>
					<Link
						href={`/post?postID=${postObject?.id}`}
						className={styles.title}
					>
						{postObject?.title ?? ""}
					</Link>
				</Typography>
				<Typography variant="body2" className={styles.date}>
					{dayjs(postObject?.createdTime ?? "").format("MMMM DD, YYYY")}
				</Typography>
				<Typography variant="body2" className={styles.date}>
					{postObject?.views ?? 0} Views
				</Typography>
				<Typography
					variant="body2"
					sx={{ marginTop: 2 }}
					className={styles.memo}
				>
					{postObject?.memo ?? ""}
				</Typography>

				<div className={styles.tagContainer}>
					{postObject?.tags?.length > 0 &&
						postObject?.tags.map((tag, index) => {
							return (
								<Typography
									variant="caption"
									key={index}
									className={styles.tag}
								>
									{tag?.name}
								</Typography>
							);
						})}
				</div>
				<Link
					className={styles.readMore}
					href={`/post?postID=${postObject?.id}`}
				>
					<Typography
						variant="body2"
						sx={{ marginTop: 2 }}
						className={styles.readMoreType}
					>
						Read Post <ChevronRight />
					</Typography>
				</Link>
			</div>
		</div>
	);
};

export default BlogTile;
