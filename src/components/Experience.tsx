import { ExperienceList } from "@/lib/experience";
import SectionHeader from "./shared/SectionHeader";

export default function Experience() {
  return (
    <section className="py-12 px-4 md:px-16">
      <SectionHeader title="Experience" align="center"/>
      <div className="flex flex-col md:grid md:grid-cols-2 md:gap-8">
        {ExperienceList.map((exp, index) => (
          <div key={index} className="flex mb-6 md:mb-0 md:items-start">
            {/* Year */}
            <div className="flex-shrink-0 w-20 text-gray-500 font-medium">
              {exp.year}
            </div>

            {/* Content */}
            <div className="ml-4 md:ml-6">
              <h3 className="text-lg font-semibold">{exp.title}</h3>
              <p className="text-gray-600">{exp.Company}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
