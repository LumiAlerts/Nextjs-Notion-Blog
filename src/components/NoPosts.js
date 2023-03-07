import Image from "next/image";
import AskAQuestion from "./AskAQuestion";

const NoPosts = () => {
	return (
		<div
			style={{
				width: "100%",
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
				marginTop: 50,
			}}
		>
			<Image
				src="https://images.unsplash.com/photo-1487260211189-670c54da558d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
				height={300}
				width={300}
				alt="No Posts"
				style={{
					objectFit: "cover",
					borderRadius: "50%",
					opacity: 0.8,
				}}
			/>
			<AskAQuestion margin={20} title="No Posts Found" />
		</div>
	);
};

export default NoPosts;
