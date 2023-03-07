import { Container, Typography } from "@mui/material";
import styles from "./styles/FollowHero.module.scss";
import { ChevronRight } from "@mui/icons-material";
import { useState } from "react";
import SearchBar from "./SearchBar";
import axios from "axios";
import { toast } from "react-toastify";

const FollowHero = () => {
	const [email, setEmail] = useState("");
	const [loading, setLoading] = useState(false);

	const handleSubmit = () => {
		// validate email before submission
		if (!email) {
			toast.error("Please enter an email");
			return;
		}
		if (!email.includes("@")) {
			toast.error("Please enter a valid email");
			return;
		}
		const emailRegex = new RegExp(
			"^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$"
		);
		if (!emailRegex.test(email)) {
			toast.error("Please enter a valid email");
			return;
		}

		setLoading(true);
		axios
			.post("/api/follow", { email })
			.then((res) => {
				toast.success("Email submitted successfully");
				setEmail("");
			})
			.catch(() => {
				toast.error("Something went wrong, please try again later");
			})
			.finally(() => {
				setLoading(false);
			});
	};

	return (
		<div style={{ position: "relative" }}>
			<Container
				maxWidth="md"
				className={styles.followContainer}
				sx={{ display: "flex" }}
			>
				<Typography variant="h3" className={styles.header}>
					Follow Our Newsletter
				</Typography>
				<Typography
					variant="body1"
					sx={{
						marginBottom: 2,
						textAlign: "center",
						fontWeight: 100,
					}}
				>
					Become more informed and get the latest updates on our blog
				</Typography>
				<div className={styles.inputContainer}>
					<SearchBar
						icon={<ChevronRight />}
						placeholder="ReadyToLearn@email.com"
						disabled={loading}
						loading={loading}
						controlled={true}
						onChange={(e) => setEmail(e)}
						value={email}
						onSearch={handleSubmit}
						validateLength={false}
					/>
				</div>
				<Typography variant="body2" sx={{ color: "gray", fontWeight: 12 }}>
					By subscribing to our newsletter you accept to receive recurring
					emails
				</Typography>
			</Container>
		</div>
	);
};
export default FollowHero;
