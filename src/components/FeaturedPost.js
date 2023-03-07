import Image from "next/image";
import styles from "./styles/featuredPost.module.scss";
import { Button, Container, Skeleton, Typography } from "@mui/material";
import { ChevronRight } from "@mui/icons-material";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import Link from "next/link";
import cx from "classnames";

const FeaturedPost = ({ post, loading, label }) => {
	const router = useRouter();

	return (
		<>
			<Container
				maxWidth="lg"
				className={styles.featureContainer}
				sx={{ display: "flex", marginBottom: 2 }}
			>
				<Typography
					variant="h2"
					className={styles.featuredText}
					sx={{ fontSize: "3.25rem" }}
				>
					{label}
				</Typography>
			</Container>
			<Container
				maxWidth="lg"
				className={styles.featureContainer}
				sx={{ display: "flex" }}
			>
				{loading ? (
					<Skeleton
						variant="rectangular"
						height={400}
						width={400}
						className={styles.image}
					/>
				) : (
					<>
						{post?.cover?.external?.url && (
							<Image
								src={post?.cover?.external?.url ?? ""}
								width={400}
								height={400}
								alt="featured post cover photo"
								className={styles.image}
								onClick={() =>
									router.push({ pathname: `/post`, query: { postID: post.id } })
								}
								priority
							/>
						)}
					</>
				)}
				<div className={styles.contentContainer}>
					<div>
						<Typography variant="h4" sx={{ fontWeight: 200 }}>
							{loading ? (
								<Skeleton variant="text" width={300} />
							) : (
								<Link
									href={`/post/${post?.id}`}
									className={cx(styles.title, "link")}
								>
									{post?.title ?? ""}
								</Link>
							)}
						</Typography>
						<Typography variant="body2" className={styles.date}>
							{loading ? (
								<Skeleton variant="text" width={100} />
							) : (
								<>{dayjs(post?.createdTime ?? "").format("MMMM DD, YYYY")}</>
							)}
						</Typography>
						<Typography variant="body2" className={styles.views}>
							{loading ? (
								<Skeleton variant="text" width={100} />
							) : (
								<>{post?.views ?? 0} Views</>
							)}
						</Typography>
						<Typography variant="body1" className={styles.memo}>
							{loading ? (
								<>
									<Skeleton variant="text" width={300} />
									<Skeleton
										variant="text"
										width={300}
										sx={{ marginTop: 0.5 }}
									/>
									<Skeleton
										variant="text"
										width={300}
										sx={{ marginTop: 0.5 }}
									/>
								</>
							) : (
								<>{post.memo}</>
							)}
						</Typography>
					</div>
					<div>
						{loading ? (
							<Skeleton
								variant="rectangular"
								width={100}
								height={60}
								className={styles.loadingButton}
							/>
						) : (
							<Button
								variant="text"
								className={styles.readMoreButton}
								onClick={() =>
									router.push({ pathname: `/post`, query: { postID: post.id } })
								}
								cx={{ display: "flex" }}
							>
								<Typography variant="body1">Read More</Typography>
								<ChevronRight />
							</Button>
						)}
					</div>
				</div>
			</Container>
		</>
	);
};

export default FeaturedPost;
