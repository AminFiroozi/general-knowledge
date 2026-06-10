"use client";

import { motion } from "framer-motion";
import { Home } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
	return (
		<div className="min-h-screen bg-background flex items-center justify-center">
			<div className="text-center">
				<motion.div
					initial={{ opacity: 0, scale: 0.6 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ type: "spring", stiffness: 200, damping: 20 }}
				>
					<div className="text-[10rem] font-black leading-none text-foreground/10">
						404
					</div>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, y: 24 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.3, duration: 0.5 }}
					className="mb-8"
				>
					<h1 className="text-3xl font-bold mb-2">Page not found</h1>
					<p className="text-muted-foreground">
						This page doesn&apos;t exist or has been moved.
					</p>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.5 }}
				>
					<Link
						href="/"
						className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
					>
						<Home className="w-4 h-4" />
						Go home
					</Link>
				</motion.div>
			</div>
		</div>
	);
}
