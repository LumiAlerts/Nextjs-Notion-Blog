import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import styles from "./styles/searchbar.module.scss";
import cx from "classnames";
import { ChevronLeft, Height } from "@mui/icons-material";
import { CircularProgress, Tooltip } from "@mui/material";

const SearchBar = ({
	onSearch = () => {},
	icon = <SearchIcon />,
	placeholder = "Search Posts",
	className,
	onBack,
	showBack = false,
	disableBack = false,
	controlled = false,
	value = null,
	onChange,
	disabled = false,
	loading = false,
	validateLength = 3,
}) => {
	const handleSubmit = (e) => {
		e.preventDefault();
		if (validateLength) {
			if (e.target.search.value.length >= validateLength) {
				onSearch(e.target.search.value);
				return;
			}
			return;
		} else {
			onSearch(e.target.search.value);
		}
	};

	return (
		<Paper
			component="form"
			onSubmit={handleSubmit}
			sx={{
				p: "2px 4px",
				display: "flex",
				alignItems: "center",
				width: "100%",
			}}
			className={cx(styles.paper, className)}
		>
			{showBack && (
				<Tooltip title="Back" placement="left">
					<IconButton
						sx={{ p: "10px" }}
						aria-label="back"
						onClick={() => onBack()}
						disabled={disableBack}
					>
						<ChevronLeft />
					</IconButton>
				</Tooltip>
			)}
			{controlled ? (
				<InputBase
					sx={{ ml: 1, flex: 1 }}
					placeholder={placeholder}
					inputProps={{ "aria-label": placeholder }}
					name="search"
					onChange={(e) => onChange(e.target.value)}
					value={value}
					disabled={disabled}
					required
				/>
			) : (
				<InputBase
					sx={{ ml: 1, flex: 1 }}
					placeholder={placeholder}
					inputProps={{ "aria-label": placeholder }}
					name="search"
					required
				/>
			)}

			{loading ? (
				<div style={{ padding: 7 }}>
					<CircularProgress sx={{ color: "lightgray" }} size={25} />
				</div>
			) : (
				<IconButton
					disabled={disabled}
					type="submit"
					sx={{ p: "10px" }}
					aria-label="search"
				>
					{icon}
				</IconButton>
			)}
		</Paper>
	);
};

export default SearchBar;
