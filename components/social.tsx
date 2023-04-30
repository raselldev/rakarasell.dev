import Link from "next/link";

export default function Social() {
  return (
    <section className="mb-32 text-gray-800 text-center">
      <div>
        <h1 className="mb-4 text-2xl font-extrabold tracking-tight leading-none text-primary md:text-5xl lg:text-6xl">
          Let&apos;s stay in touch <br />
          <span className="text-accent">Join our social media</span>
        </h1>
        <div className="flex flex-wrap justify-center md:space-x-2">
          <Link
            href="https://www.linkedin.com/in/rakarasell/"
            rel="noopener noreferrer"
            target="_blank"
            className="p-1"
          >
            <button
              type="button"
              className="inline-flex py-2.5 px-6 mb-2 text-secondary font-medium text-xs leading-tight rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out items-center bg-accent"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                className="w-4 h-4 mr-2"
              >
                <path
                  fill="currentColor"
                  d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"
                />
              </svg>
              Linkedin
            </button>
          </Link>
          <Link
            href="https://github.com/raselldev"
            rel="noopener noreferrer"
            target="_blank"
            className="p-1"
          >
            <button
              type="button"
              className="inline-flex py-2.5 px-6 mb-2 text-secondary font-medium text-xs leading-tight rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out items-center bg-accent"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                className="bi bi-github w-4 h-4 mr-2"
              >
                <path
                  fill="currentColor"
                  d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"
                />
              </svg>
              GitHub
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
