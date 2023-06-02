import { Container, Grid, Typography } from "@mui/material";
import styles from "./blog.module.scss";
import useBlog from "@/hooks/useBlog";
import BlogTile from "@/components/BlogTile";
import NavBar from "@/components/Navbar";
import SearchBar from "@/components/SearchBar";
import { useWindowWidth } from "@react-hook/window-size";
import { useEffect, useState } from "react";
import LoadingBlogTile from "@/components/LoadingBlogTile";
import SEO from "@/components/SEO";
import PaginationButtons from "@/components/PaginationButtons";
import { SORTED_TAG_OPTIONS } from "@/constants";
import NoPosts from "@/components/NoPosts";
import StyledAutoComplete from "@/components/StyledAutoComplete";
import AskAQuestion from "@/components/AskAQuestion";

const Blog = () => {
	const { posts, loading, fetchPosts, numberOfPages } = useBlog();
	const [searchTag, setSearchTag] = useState(null);
	const [searchTerm, setSearchTerm] = useState(null);
	const [page, setPage] = useState(1);

	const onlyWidth = useWindowWidth();
	const [displayTile, setDisplayTile] = useState("list");

	useEffect(() => {
		if (onlyWidth < 600 && displayTile === "list") {
			setDisplayTile("tile");
		} else if (onlyWidth >= 600 && displayTile === "tile") {
			setDisplayTile("list");
		}
	}, [displayTile, onlyWidth]);

	const handleSearch = (searchTerm) => {
		fetchPosts(1, null, searchTerm);
	};

	const loadingSkeleton = Array.from(Array(4).keys());

	const image =
		"https://images.unsplash.com/photo-1619252584172-a83a949b6efd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80";
	return (
		<>
			<SEO
				title={`${process.env.NEXT_PUBLIC_SITE_NAME} | Blog`}
				image={image}
			/>
			<NavBar heroPhoto={image} />
			<Container maxWidth="md">
				<Typography
					variant="h2"
					sx={{ marginBottom: 2, marginTop: 6 }}
					className={styles.header}
				>
					Posts
				</Typography>
				<div className={styles.searchContainer}>
					<SearchBar
						showBack={true}
						className={styles.searchBar}
						onSearch={(value) => {
							handleSearch(value);
							setPage(1);
						}}
						disableBack={false}
						controlled={true}
						onChange={(e) => setSearchTerm(e)}
						value={searchTerm}
					/>
					<StyledAutoComplete
						options={SORTED_TAG_OPTIONS}
						className={styles.searchTag}
						label="Search Category"
						onChange={(value) => {
							fetchPosts(1, value, null);
							setSearchTag(value);
							setPage(1);
						}}
						value={searchTag}
					/>
				</div>
				<Grid
					container
					spacing={{ xs: 3, md: 3 }}
					columns={
						displayTile === "list"
							? { xs: 12, sm: 12, md: 12 }
							: { xs: 4, sm: 4, md: 4 }
					}
					justifyContent={"center"}
					className={styles.grid}
				>
					{loading && (
						<>
							{loadingSkeleton.map((n) => (
								<>
									{displayTile === "list" ? (
										<Grid item key={n} sx={{ width: "100%" }}>
											<LoadingBlogTile display={displayTile} />
										</Grid>
									) : (
										<Grid item key={n}>
											<LoadingBlogTile display={displayTile} />
										</Grid>
									)}
								</>
							))}
						</>
					)}
					{!loading && posts.length === 0 && (
						<NoPosts
							onBack={() => {
								setSearchTag(null);
								setSearchTerm(null);
								fetchPosts(1, null, null);
							}}
						/>
					)}
					{!loading &&
						posts.length > 0 &&
						posts.map((post) => {
							if (displayTile === "list") {
								return (
									<Grid item key={post.id} sx={{ width: "100%" }}>
										<BlogTile postObject={post} display={displayTile} />
									</Grid>
								);
							} else {
								return (
									<Grid item key={post.id}>
										<BlogTile postObject={post} display={displayTile} />
									</Grid>
								);
							}
						})}
					{!loading && posts.length > 0 && (
						<PaginationButtons
							numberOfPages={numberOfPages}
							page={page}
							setPage={setPage}
							refetchPosts={(pageNumber) =>
								fetchPosts(pageNumber, searchTag, searchTerm)
							}
						/>
					)}
				</Grid>
				<AskAQuestion />
			</Container>
		</>
	);
};

export default Blog;
