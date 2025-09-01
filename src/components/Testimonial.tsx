import { TestimonialList } from "@/lib/testimonial";
import SectionHeader from "./shared/SectionHeader";

export default function Testimonial() {
  return (
    <section className="max-w-5xl mx-auto text-center px-6 py-12">
      <SectionHeader title="What People Say" align="center" />
      <div className="grid md:grid-cols-3 gap-6">
        {TestimonialList.map((item, index) => (
          <blockquote
            key={index}
            className="p-6 rounded-2xl border shadow-sm bg-card text-muted-foreground italic"
          >
            “{item.quote}”
            <footer className="mt-4 font-semibold not-italic">
              — {item.name}, <span className="text-gray-500">{item.role}</span>
            </footer>
          </blockquote>
        ))}
      </div>
    </section>
  );
}