import { Metadata } from "next";
import BlogCard from "@/components/blog";

export const metadata: Metadata = {
  title: "Blog",
};

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between px-12">
      <div className="relative overflow-hidden">
        <BlogCard />
      </div>
    </main>
  );
}
