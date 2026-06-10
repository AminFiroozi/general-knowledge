"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { RefreshCw, Home } from "lucide-react";
import Link from "next/link";

export default function GlobalError({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	useEffect(() => {
		console.error(error);
	}, [error]);

	return (
		<div className="min-h-screen bg-background flex items-center justify-center">
			<div className="text-center max-w-md mx-auto px-4">
				<motion.div
					initial={{ opacity: 0, scale: 0.8 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ type: "spring", stiffness: 200, damping: 20 }}
					className="mb-6"
				>
					<h1 className="text-2xl font-bold mb-2">Something went wrong</h1>
					<p className="text-muted-foreground">An unexpected error occurred.</p>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, y: 16 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.3 }}
					className="flex gap-3 justify-center"
				>
					<button
						onClick={reset}
						className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
					>
						<RefreshCw className="w-4 h-4" />
						Try again
					</button>
					<Link
						href="/"
						className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border font-medium hover:bg-muted transition-colors"
					>
						<Home className="w-4 h-4" />
						Go home
					</Link>
				</motion.div>
			</div>
		</div>
	);
}
