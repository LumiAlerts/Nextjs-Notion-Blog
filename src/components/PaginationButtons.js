import { useState } from "react";

const { ChevronLeft, ChevronRight } = require("@mui/icons-material");
const { IconButton } = require("@mui/material");

const PaginationButtons = ({ page, setPage, refetchPosts, numberOfPages }) => {
	const scrollToTop = () => {
		window.scrollTo({
			top: 500,
			behavior: "smooth",
		});
	};

	const handleButtonClick = (direction) => {
		let newPage = page;
		if (direction === "next") {
			newPage = page + 1;
			if (newPage > numberOfPages) return;
			setPage(newPage);
		} else {
			newPage = page - 1;
			if (newPage < 1) return;
			setPage(newPage);
		}
		refetchPosts(newPage);
		scrollToTop();
	};

	const handleNumberClick = (pageNumber) => {
		if (pageNumber > numberOfPages || pageNumber < 1) return;
		if (pageNumber === page) {
			scrollToTop();
			return;
		}
		setPage(pageNumber);
		refetchPosts(pageNumber);
		scrollToTop();
	};

	const pageNumbers = Array.from(Array(numberOfPages).keys()).map((i) => i + 1);

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "row",
				gap: 8,
				justifyContent: "center",
				alignItems: "center",
				marginTop: 50,
			}}
		>
			<IconButton
				onClick={() => handleButtonClick("previous")}
				disabled={page - 1 < 1}
			>
				<ChevronLeft />
			</IconButton>
			{pageNumbers.map((pageNumber, index) => (
				<>
					<IconButton
						key={index}
						onClick={() => handleNumberClick(pageNumber)}
						sx={{
							height: 15,
							width: 15,
							fontSize: 15,
							padding: 2,
							borderRadius: 1,
							fontWeight: pageNumber === page ? 600 : 200,
							backgroundColor:
								pageNumber === page ? "lightgray" : "transparent",
						}}
					>
						{pageNumber}
					</IconButton>
				</>
			))}
			<IconButton
				onClick={() => handleButtonClick("next")}
				disabled={numberOfPages === page}
			>
				<ChevronRight />
			</IconButton>
		</div>
	);
};

export default PaginationButtons;
