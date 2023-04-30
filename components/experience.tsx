import { ExperienceList } from "@/lib/experience";
import Image from "next/image";

export default function Experience() {
  return (
    <section className="py-20">
      <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-primary md:text-5xl lg:text-6xl">
        Experience
      </h1>
      <div className="grid lg:grid-cols-4 gap-x-6">
        {ExperienceList.map((list) => (
          <div
            className="mb-12 lg:mb-0 text-primary rounded-xl border border-accent p-4 m-4"
            key={list.id}
          >
            <div className="shadow-lg rounded-lg relative overflow-hidden bg-no-repeat bg-cover mb-6">
              <a href="#!">
                <div className="mask absolute top-0 right-0 bottom-0 left-0 w-full h-full overflow-hidden bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100"></div>
              </a>
            </div>
            <h5 className="text-lg font-bold mb-3">{list.title}</h5>
            <div className="text-accent mb-3 font-medium text-sm flex items-center justify-center lg:justify-start">
              {list.year}
            </div>
            <p className="text-primary">{list.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
