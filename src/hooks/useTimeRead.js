import { useEffect, useState } from "react";

const WPM = 238;

const useTimeRead = (trigger) => {
	const [timeFormatted, setTimeFormatted] = useState("0 Minute Rad");

	const countWords = (str) => {
		return str.trim().split(/\s+/).length;
	};

	useEffect(() => {
		if (typeof window !== "undefined") {
			const words = document?.body?.textContent;
			const minutes = Math.ceil(countWords(words) / WPM);

			if (minutes > 60) {
				const hours = Math.floor(minutes / 60);
				const minutesLeft = minutes % 60;
				setTimeFormatted(`${hours}:${minutesLeft} Read`);
			} else {
				setTimeFormatted(`${minutes} Minute${minutes > 1 ? "s" : ""} Read`);
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [trigger]);

	return { timeFormatted };
};

export default useTimeRead;
