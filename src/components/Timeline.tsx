import { ExperienceList } from "@/lib/experience";

export default function Timeline() {
  return (
    <section className="container py-24">
      <div className="bg-neutral border border-neutral rounded-lg p-10">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          <span className="text-primary">Experience </span>
        </h2>
        <ul className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical">
          {ExperienceList.map((item, index) => (
            <li key={index}>
              {index !== 0 && <hr />}
              <div className="timeline-middle">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div
                className={`${
                  index % 2 === 0
                    ? "timeline-start md:text-end"
                    : "timeline-end"
                } mb-10`}
              >
                <time className="font-mono italic">{item.year}</time>
                <div className="text-lg font-black">{item.title}</div>
                <p>{item.description}</p>
              </div>
              {index !== ExperienceList.length - 1 && <hr />}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
