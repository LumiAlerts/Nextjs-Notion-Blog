import Head from "next/head";
import { useRouter } from "next/router";

const SEO = ({
	title = "No BS Advice",
	description = "Blog for unbias no BS advice",
	type = "blog",
	timeStamp,
	image,
	numberOfWords,
}) => {
	const router = useRouter();
	const url = `https://www.nobsadvice.com${router.asPath}`;
	return (
		<>
			<Head>
				<title>{title}</title>
				<meta name="description" content={description} key="desc" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta name="robots" content="index, follow" />
				<meta name="googlebot" content="index, follow" />
				<meta name="google" content="nositelinkssearchbox" />
				{/* Open Graph */}
				<meta property="og:url" content={url} />
				<meta charSet="utf-8" />
				<link rel="shortcut icon" href="/favicon.png" />
				<link rel="icon" href="/favicon.ico" />
				<meta name="ir-site-verification-token" value="-605374875" />
				<meta property="og:title" content={title} />
				<meta property="og:description" content={description} />
				<meta property="og:type" content={type} />
				<meta property="og:site_name" content="No BS Advice" />
				<meta name="theme-color" content="#ffffff" />
				<meta name="twitter:site" content="summary_large_image" />
				<meta name="twitter:card" content="summary" />
				<meta name="twitter:title" content={title} />
				<meta name="twitter:description" content={description} />

				{timeStamp && (
					<meta property="article:published_time" content={timeStamp} />
				)}

				{/* Image */}
				{image && (
					<>
						<meta property="og:image" content={image} />
						<meta name="twitter:image" content={image} />
					</>
				)}

				{/* Number of words */}
				{numberOfWords && (
					<>
						<meta name="twitter:label1" value="Words" />
						<meta name="twitter:data1" value={numberOfWords} />
					</>
				)}
			</Head>
		</>
	);
};

export default SEO;
