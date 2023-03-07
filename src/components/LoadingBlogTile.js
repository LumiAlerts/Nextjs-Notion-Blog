import { Skeleton, Typography } from "@mui/material";

import styles from "./styles/index.module.scss";

const LoadingBlogTile = ({ display = "tile" }) => {
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
			<Skeleton
				variant="rectangular"
				width={320}
				height={320}
				className={styles.image}
				sx={{ borderRadius: 1 }}
			/>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					width: isList ? "50%" : "100%",
				}}
			>
				<Typography variant="h5" sx={{ marginTop: 2 }}>
					<Skeleton variant="text" className={styles.loadingCaption} />
				</Typography>
				<Typography variant="body2" className={styles.date}>
					<Skeleton variant="text" width={100} />
				</Typography>
				<Typography variant="body2" className={styles.date}>
					<Skeleton variant="text" width={100} />
				</Typography>
				<Typography
					variant="body2"
					sx={{ marginTop: 2 }}
					className={styles.loadingMemo}
				>
					<Skeleton variant="text" width={300} />
					<Skeleton variant="text" width={200} sx={{ marginTop: 0.5 }} />
				</Typography>

				<div className={styles.tagContainer}>
					{[1, 2].map((n, index) => {
						return (
							<Typography
								variant="caption"
								key={index}
								className={styles.loadingTag}
							>
								<Skeleton
									variant="rectangular"
									width={50}
									sx={{ borderRadius: 1 }}
								/>
							</Typography>
						);
					})}
				</div>
				<Typography
					variant="body2"
					sx={{ marginTop: 2 }}
					className={styles.readMoreType}
				>
					<Skeleton
						variant="rectangular"
						height={30}
						width={100}
						sx={{ borderRadius: 1 }}
					/>
				</Typography>
			</div>
		</div>
	);
};

export default LoadingBlogTile;
