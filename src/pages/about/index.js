import { Container, Typography } from "@mui/material";
import styles from "./about.module.scss";
import NavBar from "@/components/Navbar";
import FollowHero from "@/components/FollowHero";
import SEO from "@/components/SEO";

const About = () => {
	return (
		<>
			<SEO
				title={`About ${process.env.NEXT_PUBLIC_SITE_NAME} | Blog`}
				image="https://images.unsplash.com/photo-1519882519263-b417ecfdcb68?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
			/>
			<NavBar
				heroPhoto={
					"https://images.unsplash.com/photo-1519882519263-b417ecfdcb68?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
				}
			/>
			<Container maxWidth="md">
				<Typography variant="h1" sx={{ marginBottom: 3 }}>
					About
				</Typography>
			</Container>
			<Container maxWidth="md" sx={{ marginBottom: 10 }}>
				<div className={styles.paragraphContainer}>
					<Typography variant="body1">
						Welcome to <strong>{process.env.NEXT_PUBLIC_SITE_NAME}</strong>, the
						blog that&apos;s all about helping everyday people become
						financially savvy and take charge of their lives. Our aim is to
						provide practical, down-to-earth advice on personal finance, home
						repairs, and much more, without all the complicated jargon and
						technical speak.
					</Typography>
					<Typography variant="body1">
						Whether you&apos;re a Gen-Z, millennial, or Boomer looking to make
						smarter financial decisions, or just an average Joe trying to save
						up for that big purchase, we&apos;re here to help. Our founder and
						main blogger, Jason, is just like you - he&apos;s been there, done
						that, and learned a thing or two along the way.
					</Typography>
					<Typography variant="body1">
						On our blog, you&apos;ll find plenty of useful information on topics
						like budgeting, saving, investing, home repairs, car maintenance,
						and more. We&apos;re not here to teach you how to become a financial
						guru and a DIY expert - we&apos;re just here to provide practical,
						actionable advice that you can use in your everyday life.
					</Typography>
					<Typography variant="body1">
						At <strong>{process.env.NEXT_PUBLIC_SITE_NAME}</strong>, we believe
						that everyone deserves to be financially secure and have the skills
						to maintain their homes, cars, and personal finances. We&apos;re
						passionate about helping people like you achieve your goals, whether
						that&apos;s saving up for a down payment on a house, fixing that
						leaky faucet, or simply living within your means.
					</Typography>
					<Typography variant="body1">
						So, whether you&apos;re a tech-savvy millennial or an old-school
						average Joe, we&apos;ve got you covered. Our advice is always
						straightforward, easy to understand, and backed up by real-world
						experience.
					</Typography>
					<Typography variant="body1">
						Thanks for stopping by, and we hope you find the advice you need to
						take control of your finances and your life!
					</Typography>
				</div>
			</Container>
			<FollowHero />
		</>
	);
};

export default About;
