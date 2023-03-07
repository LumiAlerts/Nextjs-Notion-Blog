import { Container, Skeleton, Typography } from "@mui/material";
import Link from "next/link";
import styles from "./styles/navbar.module.scss";
import Image from "next/image";
import { useRouter } from "next/router";

const NavBar = ({ heroPhoto, loading }) => {
	const { asPath } = useRouter();

	const links = [
		{ name: "Home", path: "/" },
		{ name: "About", path: "/about" },
		{ name: "Blog", path: "/blog" },
	];
	return (
		<>
			<Container
				maxWidth="lg"
				className={styles.headerContainer}
				sx={{ display: "flex", marginBottom: 2 }}
			>
				<Typography variant="h2">
					<Link href="/">No BS Advice</Link>
				</Typography>
				<Typography variant="body2" className={styles.subtitle}>
					Honesty, transparency, and no bullshit.
				</Typography>
			</Container>
			{loading && (
				<Skeleton
					className={styles.loadingSkeleton}
					variant="rectangular"
					width={700}
					height={300}
					animation="wave"
				/>
			)}
			{!loading && heroPhoto && (
				<Image
					src={heroPhoto}
					width={700}
					height={300}
					alt="hero photo"
					className={styles.heroImage}
					priority
				/>
			)}
			<Container maxWidth="sm" className={styles.linkContainer}>
				{links.map((link, index) => (
					<Link
						href={link.path}
						key={index}
						className={"link"}
						style={{
							borderBottom: asPath === link.path ? "2px solid #000" : "none",
							paddingLeft: 8,
							paddingRight: 8,
						}}
					>
						<Typography variant={"h6"} sx={{ fontWeight: 400 }}>
							{link.name}
						</Typography>
					</Link>
				))}
			</Container>
		</>
	);
};

export default NavBar;
