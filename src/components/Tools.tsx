import { ToolList } from "@/lib/tool";
import SectionHeader from "./shared/SectionHeader";

export default function Tools() {
  return (
    <section className="max-w-4xl mx-auto text-center px-4 sm:px-6 md:px-6 lg:px-0">
        <SectionHeader title="Tools I Love" align="center" />
      <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
        {ToolList.map((tool) => (
          <span
            key={tool.name}
            className="w-full sm:w-auto px-3 sm:px-4 py-2 rounded-lg border shadow-sm bg-card transition-transform hover:scale-105"
          >
            <div className="font-semibold text-foreground">{tool.name}</div>
            <div className="text-xs sm:text-sm text-muted-foreground">{tool.featured}</div>
          </span>
        ))}
      </div>
    </section>
  );
}
