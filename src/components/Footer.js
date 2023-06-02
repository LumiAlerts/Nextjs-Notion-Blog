import { Button, Container, Typography } from "@mui/material";
import styles from "./styles/footer.module.scss";
import cx from "classnames";
import { useRouter } from "next/router";

const Footer = () => {
	const router = useRouter();
	return (
		<footer className={styles.footerElement}>
			<Container
				maxWidth="lg"
				className={styles.footerContainer}
				sx={{ display: "flex" }}
			>
				<div>
					<Typography variant="h3" sx={{ fontWeight: 200 }}>
						{process.env.NEXT_PUBLIC_SITE_NAME}
					</Typography>
					<Typography variant="h6" sx={{ fontWeight: 200 }}>
						{process.env.NEXT_PUBLIC_SITE_MOTTO_FOOTER}
					</Typography>
				</div>
				<div className={styles.buttonContainer}>
					<Button
						variant="contained"
						className={cx(styles.containedButton, styles.customButton)}
						onClick={() => router.push("/blog")}
					>
						<Typography variant="body1">Blog</Typography>
					</Button>
					<Button
						variant="link"
						className={styles.customButton}
						onClick={() => router.push("/about")}
					>
						<Typography variant="body1">About</Typography>
					</Button>
				</div>
			</Container>
		</footer>
	);
};

export default Footer;
