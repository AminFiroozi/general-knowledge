import type { Config } from "tailwindcss";

const config = {
	darkMode: ["class"],
	content: ["./src/components/**/*.{ts,tsx}", "./src/app/**/*.{ts,tsx}"],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: "2rem",
			screens: {
				"2xl": "1400px",
			},
		},
		extend: {
			fontFamily: {
				sans: ["var(--font-sans)", "sans-serif"],
			},
			colors: {
				border: "hsl(var(--border))",
				input: "hsl(var(--input))",
				ring: "hsl(var(--ring))",
				background: "hsl(var(--background))",
				foreground: "hsl(var(--foreground))",
				primary: {
					DEFAULT: "hsl(var(--primary))",
					foreground: "hsl(var(--primary-foreground))",
				},
				secondary: {
					DEFAULT: "hsl(var(--secondary))",
					foreground: "hsl(var(--secondary-foreground))",
				},
				accent: {
					DEFAULT: "hsl(var(--accent))",
					foreground: "hsl(var(--accent-foreground))",
				},
				destructive: {
					DEFAULT: "hsl(var(--destructive))",
					foreground: "hsl(var(--destructive-foreground))",
				},
				muted: {
					DEFAULT: "hsl(var(--muted))",
					foreground: "hsl(var(--muted-foreground))",
				},
				popover: {
					DEFAULT: "hsl(var(--popover))",
					foreground: "hsl(var(--popover-foreground))",
				},
				card: {
					DEFAULT: "hsl(var(--card))",
					foreground: "hsl(var(--card-foreground))",
				},
				// Add brand colors here:
				// brand: {
				//   primary: "#...",
				//   secondary: "#...",
				// },
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
			},
			keyframes: {
				"accordion-down": {
					from: { height: "0" },
					to: { height: "var(--radix-accordion-content-height)" },
				},
				"accordion-up": {
					from: { height: "var(--radix-accordion-content-height)" },
					to: { height: "0" },
				},
				float: {
					"0%, 100%": { transform: "translateY(0px)" },
					"50%": { transform: "translateY(-10px)" },
				},
				shimmer: {
					"0%": { backgroundPosition: "-200% center" },
					"100%": { backgroundPosition: "200% center" },
				},
				"pulse-glow": {
					"0%, 100%": { opacity: "1" },
					"50%": { opacity: "0.6" },
				},
				fadeInUp: {
					from: { opacity: "0", transform: "translateY(30px)" },
					to: { opacity: "1", transform: "translateY(0)" },
				},
				fadeInScale: {
					from: { opacity: "0", transform: "scale(0.8)" },
					to: { opacity: "1", transform: "scale(1)" },
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
				float: "float 3s ease-in-out infinite",
				shimmer: "shimmer 3s linear infinite",
				"pulse-glow": "pulse-glow 2s ease-in-out infinite",
				"fade-in-up": "fadeInUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards",
				"fade-in-scale": "fadeInScale 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards",
			},
		},
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
