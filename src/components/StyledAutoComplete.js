import { Autocomplete, TextField } from "@mui/material";
import cx from "classnames";

const StyledAutoComplete = ({ options, className, label, onChange, value }) => {
	return (
		<Autocomplete
			disablePortal
			options={options}
			className={cx(className, "autocomplete")}
			renderInput={(params) => <TextField {...params} label={label} />}
			onChange={(e, value) => {
				onChange(value);
			}}
			value={value}
		/>
	);
};

export default StyledAutoComplete;
