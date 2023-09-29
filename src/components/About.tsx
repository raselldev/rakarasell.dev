import Image from "next/image";
import Profile from "../../public/og.jpeg";

export default function About() {
  return (
    <div className="container px-5 py-24 mx-auto flex flex-col bg-primary">
      <div className="lg:w-4/6 mx-auto">
        {/* <div className="rounded-lg h-64 overflow-hidden">
          <Image
            alt="content"
            className="object-cover object-center h-full w-full"
            src="https://dummyimage.com/900x500"
            fill
          />
        </div> */}
        <div className="flex flex-col sm:flex-row mt-10">
          <div className="sm:w-1/3 text-center sm:pr-8 sm:py-8">
            <div className="w-20 h-20 rounded-full inline-flex items-center justify-center bg-gray-200 text-gray-400">
              <Image
                alt="profile"
                src={Profile}
                width={200}
                className="rounded-full"
              />
            </div>
            <div className="flex flex-col items-center text-center justify-center">
              <h2 className="font-medium title-font mt-4 text-white text-lg">
                Raka Rasell
              </h2>
              <div className="w-12 h-1 bg-accent rounded mt-2 mb-4"></div>
              <p className="text-base">
                &quot;Good software, like good wine, takes time.&quot; - Joel
                Spolsky
              </p>
            </div>
          </div>
          <div className="sm:w-2/3 sm:pl-8 sm:py-8 sm:border-l border-gray-200 sm:border-t-0 border-t mt-4 pt-4 sm:mt-0 text-center sm:text-left">
            <p className="leading-relaxed text-lg mb-4">
              Hi, I&apos;m Raka Rasell, a Software Engineer with expertise in
              web and mobile application development. Currently, I work as a
              Back-end Developer at Honda Indonesia. I am a creative problem
              solver with a passion for building intuitive, user-friendly
              products that enhance the user experience.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
