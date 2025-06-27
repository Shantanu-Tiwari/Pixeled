"use client";

import { Button } from "~/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";

const AnimatedCursor = () => {
    const colors = ["#FF6B6B", "#6BCB77", "#4D96FF", "#FFD93D"];
    return (
        <div className="absolute inset-0 -z-10 overflow-hidden">
            {Array.from({ length: 30 }).map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute h-2 w-2 rounded-full"
                    style={{ backgroundColor: colors[i % colors.length] }}
                    initial={{ x: Math.random() * 1600, y: Math.random() * 900, opacity: 0 }}
                    animate={{
                        x: [null, Math.random() * 1600],
                        y: [null, Math.random() * 900],
                        opacity: [0, 0.3, 0],
                    }}
                    transition={{ duration: 8, repeat: Infinity, delay: i * 0.3 }}
                />
            ))}
        </div>
    );
};

export default function LandingPage() {
    return (
        <main className="relative flex min-h-screen flex-col items-center justify-center bg-white px-6 text-gray-900">
            <AnimatedCursor />

            <section className="z-10 flex flex-col items-center text-center py-24">
                <img src="/img.png" alt="Pixelate Logo" className="mb-6 h-16 w-16" />
                <h1 className="text-4xl font-extrabold md:text-6xl">Welcome to Pixelate</h1>
                <p className="mt-4 max-w-xl text-lg md:text-xl text-gray-700">
                    A collaborative canvas tool built for creators, developers, and teams. Think Figma, but yours.
                </p>
                <Link href="/signup">
                    <Button className="mt-6 bg-black text-white hover:bg-gray-800">Get Started</Button>
                </Link>
            </section>

            <section className="z-10 w-full max-w-5xl py-20">
                <h2 className="text-2xl font-bold text-center mb-10">Why Pixelate?</h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-10 text-lg text-gray-700">
                    <li>
                        • Realtime collaboration powered by Liveblocks
                    </li>
                    <li>
                        • Infinite canvas and smooth drawing tools
                    </li>
                    <li>
                        • User permissions, session saving and multi-user rooms
                    </li>
                    <li>
                        • Built with Next.js, Prisma, and Tailwind CSS
                    </li>
                </ul>
            </section>

            <section className="z-10 w-full max-w-4xl py-20">
                <h2 className="text-2xl font-bold text-center mb-6">About the Developer</h2>
                <p className="text-center text-gray-700">
                    Built by Shantanu Tiwari as a Figma-inspired collaborative tool. Combining real-time tech with modern design systems,
                    Pixelate is both a technical experiment and a creative workspace.
                </p>
            </section>

            <footer className="z-10 py-6 text-sm text-gray-500">&copy; 2025 Pixelate. All rights reserved.</footer>
        </main>
    );
}
