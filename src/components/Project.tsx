"use client"
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { ProjectList } from '@/lib/projectList'

export default function BlogPost() {
    return (
        <section className="container py-24 sm:py-32">
            <h2 className="text-3xl md:text-4xl font-bold text-center">
                Project {" "}
                <span className="bg-gradient-to-r from-primary to-[#D247BF] text-transparent bg-clip-text">
                    List{" "}
                </span>
            </h2>
            <p className="md:w-3/4 mx-auto mt-4 mb-8 text-xl text-muted-foreground">
                Explore my handpicked projects spanning various fields. Join me on a journey of innovation and creativity that inspires and empowers!
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {ProjectList.map((x) => {
                    return (
                        <a href={x.link} key={x.title}>
                            <Card
                                key={x.title}
                                className="bg-muted/50"
                            >
                                <CardHeader>
                                    <CardTitle className="grid gap-4 place-items-left">
                                        {x.title}
                                    </CardTitle>
                                </CardHeader>
                                <CardDescription className='p-6'>{x.description}</CardDescription>
                            </Card>
                        </a>
                    )
                })}

            </div>
        </section>
    )
}