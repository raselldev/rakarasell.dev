export default function Hero() {
  return (
    <section className="bg-gradien-to-r from-secondary to-accent items-center h-screen content-center">
      <div className="mx-auto max-w-screen-xl px-4 py-32 items-center text-center">
        <a
          href=""
          className="inline-flex justify-between items-center py-1 px-1 pr-4 mb-7 text-sm rounded-full  bg-primary hover:bg-accent"
          role="alert"
        >
          <span className="text-xs bg-accent rounded-full text-secondary px-4 py-1.5 mr-3">
            New
          </span>{" "}
          <span className="text-sm font-medium text-secondary">
            Announcement
          </span>
          <svg
            className="ml-2 w-5 h-5 text-secondary"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </a>
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-primary md:text-5xl lg:text-6xl">
          Hi👋 My name is Raka Rasell
        </h1>
        <p className="mb-8 text-md font-normal text-accent">
          A young man who decided to choose a career as a software developer.
          Previously social media content, digital marketing, video editor, and
          product owner.
        </p>
        <div className="flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
          <a
            href="mailto:rakarasell@outlook.com.com"
            className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center rounded-lg border text-primary border-primary hover:bg-accent hover:text-secondary hover:border-accent"
          >
            Contact
          </a>
        </div>
      </div>
    </section>
  );
}
