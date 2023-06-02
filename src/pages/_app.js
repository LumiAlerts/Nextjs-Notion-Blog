import Footer from "@/components/Footer";
import "@/styles/globals.scss";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "../assets/prism.css";
import "react-toastify/dist/ReactToastify.css";

import { Analytics } from "@vercel/analytics/react";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { ToastContainer, toast } from "react-toastify";

export default function App({ Component, pageProps }) {
	const firebaseConfig = {
		apiKey: "AIzaSyAtrdbq_dRJ3HGvPAnFzoPbiBfWfU5LxDU",
		authDomain: "no-bs-advice-prod.firebaseapp.com",
		projectId: "no-bs-advice-prod",
		storageBucket: "no-bs-advice-prod.appspot.com",
		messagingSenderId: "556746337059",
		appId: "1:556746337059:web:7cd4a181f78b478f21fa96",
		measurementId: "G-D4TCKPTHDP",
	};

	const app = initializeApp(firebaseConfig);
	const analytics = isSupported().then((yes) =>
		yes ? getAnalytics(app) : null
	);

	return (
		<>
			<Analytics />
			<ToastContainer
				position="top-center"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss={false}
				draggable
				pauseOnHover
				theme="colored"
			/>
			<Component {...pageProps} />;
			<Footer />
		</>
	);
}
