import styles from "@/styles/Home.module.scss";
import usePosts from "@/hooks/usePosts";
import BlogTile from "@/components/BlogTile";
import { Container, Grid, Typography } from "@mui/material";
import NavBar from "@/components/Navbar";
import Link from "next/link";
import { ChevronRight } from "@mui/icons-material";
import FollowHero from "@/components/FollowHero";
import FeaturedPost from "@/components/FeaturedPost";
import LoadingBlogTile from "@/components/LoadingBlogTile";
import SEO from "@/components/SEO";
import { useWindowWidth } from "@react-hook/window-size";

export default function Home() {
	const { posts, loading } = usePosts("topPosts");
	const { posts: recentPost, loading: recentLoading } = usePosts("recent");
	const onlyWidth = useWindowWidth();

	const loadingSkeleton = Array.from(Array(4).keys());

	return (
		<>
			<SEO
				title={`${process.env.NEXT_PUBLIC_SITE_NAME} | Home`}
				image="https://images.unsplash.com/photo-1496307653780-42ee777d4833?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
			/>
			<Container maxWidth="lg">
				<NavBar
					loading={loading}
					heroPhoto="https://images.unsplash.com/photo-1496307653780-42ee777d4833?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
				/>
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						gap: 12,
					}}
				>
					<section>
						<FeaturedPost
							loading={loading}
							post={posts?.length > 0 ? posts[0] : {}}
							label="Featured Post"
						/>
					</section>

					<Container maxWidth="lg">
						<section className={styles.postSection}>
							<Typography
								variant="h2"
								sx={{ marginBottom: 2, marginTop: 6, fontSize: "3.25rem" }}
								className={styles.postTextContainer}
							>
								Top Posts
								<span className={styles.seeMoreContainer}>
									<Link href="/blog" className={"link"}>
										<Typography variant="h6" className={styles.linkContainer}>
											See More Posts <ChevronRight />
										</Typography>
									</Link>
								</span>
							</Typography>
							<div className={styles.grid}>
								{loading ? (
									<>
										{loadingSkeleton
											.slice(
												1,
												onlyWidth < 1080
													? onlyWidth < 745
														? loadingSkeleton.length
														: 3
													: loadingSkeleton.length
											)
											.map((number, index) => (
												<LoadingBlogTile key={index} />
											))}
									</>
								) : (
									<>
										{posts.length > 0 &&
											posts
												.slice(
													1,
													onlyWidth < 1080
														? onlyWidth < 745
															? posts.length
															: 3
														: posts.length
												)
												.map((post, index) => (
													<BlogTile key={index} postObject={post} />
												))}
									</>
								)}
							</div>
						</section>
					</Container>
					<section style={{ marginBottom: 60, marginTop: 48 }}>
						<FeaturedPost
							loading={recentLoading}
							post={recentPost.length > 0 ? recentPost[0] : {}}
							label="Recent Post"
						/>
					</section>
					<FollowHero />
				</div>
			</Container>
		</>
	);
}
