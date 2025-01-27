"use client";

import Image from "next/image";
import Profile from "../../public/profile.png";
import { Code, Database, Users } from "lucide-react";

export default function About() {
  return (
    <section className="container py-24">
      <div className="bg-neutral border border-neutral rounded-lg py-12">
        <div className="px-6 flex flex-col-reverse md:flex-row gap-8 md:gap-12">
          <Image
            src={Profile}
            alt=""
            className="w-[300px] object-contain rounded-lg hidden sm:block md:block xs:block"
          />
          <div className="bg-green-0 flex flex-col justify-between">
            <div className="pb-6">
              <h2 className="text-3xl md:text-4xl font-bold">
                <span className="text-primary">About </span>
                Me
              </h2>
              <p className="text-xl text-muted-foreground mt-4">
                Hi, I&apos;m Raka Rasell, a passionate Software Engineer
                specializing in web and mobile application development.
                Currently, I serve as a Back-end Developer at Honda Indonesia,
                where I leverage my skills to create robust and scalable
                solutions. With a strong foundation in C#, .NET, MS SQL,
                TypeScript, and Node.js, I have successfully led multiple
                projects that enhance operational efficiency and drive business
                growth. My experience includes:
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* API Development */}
              <div className="card card-compact bg-base-200 shadow-lg">
                <figure className="flex justify-center pt-4">
                  <Code size={48} className="text-primary" />
                </figure>
                <div className="card-body">
                  <h2 className="card-title text-center text-xl font-semibold">
                    API Development
                  </h2>
                  <p className="text-sm text-gray-200">
                    Proficient in designing and implementing robust APIs that
                    facilitate seamless communication between front-end and
                    back-end systems. Focused on delivering efficient data
                    exchange, scalability, and enhanced application performance
                    to meet complex business requirements.
                  </p>
                </div>
              </div>

              {/* Database Management */}
              <div className="card card-compact bg-base-200 shadow-lg">
                <figure className="flex justify-center pt-4">
                  <Database size={48} className="text-primary" />
                </figure>
                <div className="card-body">
                  <h2 className="card-title text-center text-xl font-semibold">
                    Database Management
                  </h2>
                  <p className="text-sm text-gray-200">
                    Expertise in optimizing database performance with advanced
                    indexing, query optimization, and data modeling techniques.
                    Skilled in designing scalable, secure, and reliable
                    databases that drive seamless data-driven applications and
                    improve user experience.
                  </p>
                </div>
              </div>

              {/* Software Development Collaboration */}
              <div className="card card-compact bg-base-200 shadow-lg">
                <figure className="flex justify-center pt-4">
                  <Users size={48} className="text-primary" />
                </figure>
                <div className="card-body">
                  <h2 className="card-title text-center text-xl font-semibold">
                    Software Development Collaboration
                  </h2>
                  <p className="text-sm text-gray-200">
                    Experienced in collaborating with cross-functional
                    teams—including product managers, designers, and QA
                    engineers—to deliver high-quality, user-focused software
                    solutions. Adept at identifying client needs and driving
                    innovation to create scalable and maintainable applications.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
