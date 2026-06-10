import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-serif",
})

export const metadata: Metadata = {
  title: "GeneralKnowledge",
  description: "Infinite quiz — 44 categories, from algorithms to biology",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} bg-bg text-text-primary min-h-screen antialiased`}>
        {children}
      </body>
    </html>
  )
}
