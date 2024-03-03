import About from "@/components/About";
import BlogPost from "@/components/BlogPost";
import Footer from "@/components/Footer";
import GithubRepo from "@/components/GithubRepo";
import Hero from "@/components/Hero";
import Image from "next/image";

export default function Home() {
    return (
        <main className="flex min-h-screen w-full flex-col justify-between">
            <BlogPost />
        </main>
    );
}
