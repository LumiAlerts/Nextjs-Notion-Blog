import { Container, Typography } from "@mui/material";
import styles from "./styles/FollowHero.module.scss";
import { ChevronRight } from "@mui/icons-material";
import { useState } from "react";
import SearchBar from "./SearchBar";
import axios from "axios";
import { toast } from "react-toastify";

const AskAQuestion = ({
	margin = 100,
	subtitle = "Don't see an answer to your question? Ask us and we'll get back to you as soon as possible.",
	title = "Ask us a question",
}) => {
	const [question, setQuestion] = useState("");
	const [loading, setLoading] = useState(false);

	const handleSubmit = () => {
		// validate question before submission
		if (!question) {
			toast.error("Please enter a question");
			return;
		}

		setLoading(true);
		axios
			.post("/api/question", { question })
			.then((res) => {
				console.log(res);
				toast.success("Question submitted successfully");
				setQuestion("");
			})
			.catch(() => {
				toast.error("Something went wrong, please try again later");
			})
			.finally(() => {
				setLoading(false);
			});
	};

	return (
		<div style={{ position: "relative", marginTop: margin }}>
			<Container
				maxWidth="md"
				className={styles.followContainer}
				sx={{ display: "flex" }}
			>
				<Typography variant="h3" className={styles.header}>
					{title}
				</Typography>
				<Typography
					variant="body1"
					sx={{
						marginBottom: 2,
						textAlign: "center",
						fontWeight: 100,
					}}
				>
					{subtitle}
				</Typography>
				<div className={styles.inputContainer}>
					<SearchBar
						icon={<ChevronRight />}
						placeholder="How do I check my credit?"
						onSearch={() => handleSubmit()}
						controlled={true}
						onChange={(e) => setQuestion(e)}
						value={question}
						disabled={loading}
						loading={loading}
					/>
				</div>
			</Container>
		</div>
	);
};
export default AskAQuestion;
