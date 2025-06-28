"use client";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { ArrowRight, Palette, Users, Zap, Shield, Sparkles, Github, Twitter } from "lucide-react";
import { useState, useEffect } from "react";
import type { FC } from "react";

const AnimatedBackground: FC = () => {
    return (
        <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-cyan-400 to-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse" style={{ animationDelay: '2s' }}></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: '4s' }}></div>
            {Array.from({ length: 20 }).map((_, i) => (
                <div
                    key={i}
                    className="absolute w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-40 animate-pulse"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 2}s`
                    }}
                />
            ))}
        </div>
    );
};

type FeatureCardProps = {
    icon: FC<{ className?: string }>;
    title: string;
    description: string;
    gradient: string;
};

const FeatureCard: FC<FeatureCardProps> = ({ icon: Icon, title, description, gradient }) => (
    <Card className="group relative overflow-hidden border-0 bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 hover:scale-105">
        <CardContent className="p-6">
            <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <Icon className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
            <p className="text-gray-600 leading-relaxed">{description}</p>
        </CardContent>
    </Card>
);

type TechBadgeProps = {
    children: React.ReactNode;
    color: string;
};

const TechBadge: FC<TechBadgeProps> = ({ children, color }) => (
    <Badge variant="secondary" className={`${color} text-white border-0 px-4 py-2 text-sm font-medium`}>
        {children}
    </Badge>
);

export default function Index() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 relative overflow-hidden">
            <style jsx>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-20px) rotate(180deg); }
                }
            `}</style>

            <AnimatedBackground />

            <nav className="relative z-20 flex items-center justify-between p-6 max-w-7xl mx-auto">
                <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                        <Palette className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Pixelate</span>
                </div>
                <div className="flex items-center space-x-4">
                    <Link href="/features">
                        <Button variant="ghost" className="text-gray-600 hover:text-gray-900">Features</Button>
                    </Link>
                    <Link href="/about">
                        <Button variant="ghost" className="text-gray-600 hover:text-gray-900">About</Button>
                    </Link>
                    <Link href="/signin">
                        <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">Get Started</Button>
                    </Link>
                </div>
            </nav>

            <section className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-32 text-center">
                <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full px-4 py-2 mb-8">
                    <Sparkles className="w-4 h-4 text-purple-600" />
                    <span className="text-sm font-medium text-purple-700">New: Real-time collaboration features</span>
                </div>
                <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                    <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent">Create Together,</span>
                    <br />
                    <span className="text-gray-900">Design Forever</span>
                </h1>
                <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-10 leading-relaxed">
                    A collaborative canvas tool built for creators, developers, and teams. Think Figma, but <span className="font-semibold text-purple-600">yours</span>.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                    <Link href="/signup">
                        <Button size="lg" className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300 px-8 py-4 text-lg">
                            Start Creating Free
                            <ArrowRight className="w-5 h-5 ml-2" />
                        </Button>
                    </Link>
                    <Button size="lg" variant="outline" className="border-2 border-gray-300 hover:border-purple-500 hover:text-purple-600 px-8 py-4 text-lg">
                        Watch Demo
                    </Button>
                </div>
            </section>

            <section className="relative z-10 max-w-7xl mx-auto px-6 py-20">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Why Choose <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Pixelate?</span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Powerful features designed to unleash your creativity and boost team productivity
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <FeatureCard icon={Users} title="Real-time Collaboration" description="Work together seamlessly with live cursors, comments, and instant updates powered by Liveblocks." gradient="from-blue-500 to-cyan-500" />
                    <FeatureCard icon={Zap} title="Lightning Fast" description="Infinite canvas with smooth drawing tools that respond instantly to your creative flow." gradient="from-yellow-500 to-orange-500" />
                    <FeatureCard icon={Shield} title="Secure & Private" description="Advanced user permissions, secure session saving, and private multi-user rooms." gradient="from-green-500 to-emerald-500" />
                    <FeatureCard icon={Palette} title="Creative Freedom" description="Unlimited creative possibilities with professional-grade tools and intuitive interface." gradient="from-purple-500 to-pink-500" />
                </div>
            </section>

            <section className="relative z-10 max-w-7xl mx-auto px-6 py-20">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Built with Modern Technology</h2>
                    <p className="text-lg text-gray-600 mb-8">Powered by the latest and greatest in web development</p>
                    <div className="flex flex-wrap justify-center gap-3">
                        <TechBadge color="bg-gradient-to-r from-blue-500 to-blue-600">Next.js</TechBadge>
                        <TechBadge color="bg-gradient-to-r from-purple-500 to-purple-600">Prisma</TechBadge>
                        <TechBadge color="bg-gradient-to-r from-cyan-500 to-cyan-600">Tailwind CSS</TechBadge>
                        <TechBadge color="bg-gradient-to-r from-orange-500 to-orange-600">Liveblocks</TechBadge>
                        <TechBadge color="bg-gradient-to-r from-green-500 to-green-600">TypeScript</TechBadge>
                    </div>
                </div>
            </section>

            <section className="relative z-10 max-w-7xl mx-auto px-6 py-20">
                <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-0 overflow-hidden">
                    <CardContent className="p-12 text-center">
                        <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
                            <span className="text-2xl font-bold text-white">ST</span>
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet the Creator</h2>
                        <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-6 leading-relaxed">
                            Built by Shantanu Tiwari as a Figma-inspired collaborative tool. Combining real-time technology
                            with modern design systems, Pixelate is both a technical experiment and a creative workspace
                            designed to empower teams and individuals alike.
                        </p>
                        <div className="flex justify-center space-x-4">
                            <a href="https://github.com/Shantanu-Tiwari" target="_blank" rel="noopener noreferrer">
                                <Button variant="outline" size="sm" className="border-purple-200 hover:border-purple-500 hover:text-purple-600">
                                    <Github className="w-4 h-4 mr-2" /> GitHub
                                </Button>
                            </a>
                            <a href="https://x.com/ShantanuTi43203" target="_blank" rel="noopener noreferrer">
                                <Button variant="outline" size="sm" className="border-purple-200 hover:border-purple-500 hover:text-purple-600">
                                    <Twitter className="w-4 h-4 mr-2" /> Twitter
                                </Button>
                            </a>
                            <a href="https://www.linkedin.com/in/shantanutiwari24/" target="_blank" rel="noopener noreferrer">
                                <Button variant="outline" size="sm" className="border-purple-200 hover:border-purple-500 hover:text-purple-600">
                                    LinkedIn
                                </Button>
                            </a>
                        </div>
                    </CardContent>
                </Card>
            </section>

            <section className="relative z-10 max-w-7xl mx-auto px-6 py-20">
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-12 text-center text-white overflow-hidden relative">
                    <div className="absolute inset-0 bg-black/10"></div>
                    <div className="relative z-10">
                        <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Start Creating?</h2>
                        <p className="text-xl mb-8 opacity-90">Join thousands of creators who are already building amazing things with Pixelate.</p>
                        <Link href="/signup">
                            <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 shadow-xl hover:shadow-2xl transition-all duration-300 px-8 py-4 text-lg font-semibold">
                                Get Started Today
                                <ArrowRight className="w-5 h-5 ml-2" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            <footer className="relative z-10 border-t border-gray-200 bg-white/50 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto px-6 py-12">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="flex items-center space-x-3 mb-4 md:mb-0">
                            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                                <Palette className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Pixelate</span>
                        </div>
                        <p className="text-gray-600">&copy; 2025 Pixelate. All rights reserved. Built with ❤️ by Shantanu Tiwari.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
