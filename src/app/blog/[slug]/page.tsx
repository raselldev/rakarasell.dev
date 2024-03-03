"use client"

import { SingleBlogPost } from "@/lib/typeSingleBlogPost"
import { useEffect, useState } from "react"
import ReactMarkdown from 'react-markdown'

export default function Page({ params }: { params: { slug: string } }) {
    const [post, setPost] = useState<SingleBlogPost>()

    useEffect(() => {
        fetch("https://dev.to/api/articles/" + params.slug)
            .then((res) => res.json())
            .then((data: any) => {
                setPost(data)
            })
            .catch((err) => console.error(err))
    }, [])

    return (
        <section className="container py-24 sm:py-32">
            <div className="md:w-3/4 mx-auto mt-4 mb-8">
                <h2 className="text-3xl md:text-4xl font-bold">{post?.title}</h2>
            </div>
            <ReactMarkdown className="md:w-3/4 mx-auto mt-4 mb-8 text-xl text-muted-foreground">
                {post?.body_markdown}
            </ReactMarkdown>
        </section>
    )
}