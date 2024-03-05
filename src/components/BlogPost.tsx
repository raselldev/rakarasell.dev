"use client"
import Image from 'next/image'
import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Badge } from './ui/badge'
import { ConvertDatetime } from '@/lib/convert'
import { Clock } from 'lucide-react'
import Link from 'next/link'



export default function BlogPost() {
    //
    const [post, setPost] = useState<BlogPost[]>([])

    useEffect(() => {
        fetch("https://dev.to/api/articles?username=raselldev")
            .then((res) => res.json())
            .then((data: any) => {
                if (Array.isArray(data)) setPost(data)
            })
            .catch((err) => console.error(err))
    }, [])
    return (
        <section className="container text-center py-24 sm:py-32">
            <h2 className="text-3xl md:text-4xl font-bold">
                Blog {" "}
                <span className="bg-gradient-to-r from-primary to-[#D247BF] text-transparent bg-clip-text">
                    Post{" "}
                </span>
            </h2>
            <p className="md:w-3/4 mx-auto mt-4 mb-8 text-xl text-muted-foreground">
                Check out our newest stuff on GitHub! It&apos;s full of cool projects and useful code. Dive in and join the coding fun!
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {post.map(
                    (post, index) =>
                        index < 8 && (
                            <Link href={"blog/" + post.id} key={post.id}>
                                <Card
                                    key={post.id}
                                    className="bg-muted/50"
                                >
                                    <Image src={post.cover_image} width={1000} height={420} alt={post.title} />
                                    <CardHeader>
                                        <CardTitle className="grid gap-4 place-items-center">
                                            {post.title}
                                        </CardTitle>
                                        <CardDescription>{ConvertDatetime(post.published_at.toString())}</CardDescription>
                                    </CardHeader>
                                    <CardDescription className='p-2'>{post.description}</CardDescription>
                                    <CardFooter>
                                        {post.tag_list.map((x) => (<Badge className='m-1' key={x}>
                                            {x.toString()}
                                        </Badge>))}
                                    </CardFooter>


                                </Card>
                            </Link>
                        )
                )}
            </div>
        </section>
    )
}