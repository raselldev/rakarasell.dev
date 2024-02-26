export default function Footer() {
  return (
    <footer aria-label="Site Footer" className="bg-primary">
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex justify-center text-white text-center">
          © Copyright 2021 - {new Date().getFullYear()} Raka Rasell
        </div>

        <p className="mx-auto mt-6 max-w-md text-center leading-relaxed text-white">
          &quot;Just like how the colors of the sunset change, our code needs to
          be flexible and adaptable to change.&quot;
        </p>
      </div>
    </footer>
  );
}
