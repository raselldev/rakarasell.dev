export default function Hero() {
  return (
    <div className="h-screen leading-normal tracking-normal text-indigo-400 lg:m-12 md:m-2 sm:m-0 bg-cover bg-fixed">
      <div className="flex flex-col w-full xl:w-2/5 justify-center lg:items-start overflow-y-hidden">
        <h1 className="my-4 text-3xl md:text-5xl text-white opacity-75 font-bold leading-tight text-center md:text-left">
          Hi!👋
          <br />
          You can call me{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-pink-500 to-purple-500">
            Rasell
          </span>
        </h1>
        <p className="leading-normal text-base md:text-2xl mb-8 text-center md:text-left text-white xs:none">
          A young man who transitioned to a career as a software developer after
          working in social media content, digital marketing, video editing, and
          as a product owner.
        </p>
      </div>
      <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 p-4">
        <a
          href="mailto:rakarasell@outlook.com"
          className="inline-flex items-center py-3 px-5 text-base font-medium rounded-lg border text-white border-white hover:bg-accent hover:text-white hover:border-accent"
        >
          <svg
            width="20"
            height="24"
            viewBox="0 0 20 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18 0H2V2H18V0ZM2 24H18V22H2V24ZM18 4H2C1.46957 4 0.960859 4.21071 0.585786 4.58579C0.210714 4.96086 0 5.46957 0 6V18C0 18.5304 0.210714 19.0391 0.585786 19.4142C0.960859 19.7893 1.46957 20 2 20H18C18.5304 20 19.0391 19.7893 19.4142 19.4142C19.7893 19.0391 20 18.5304 20 18V6C20 5.46957 19.7893 4.96086 19.4142 4.58579C19.0391 4.21071 18.5304 4 18 4V4ZM10 6.75C10.5967 6.75 11.169 6.98705 11.591 7.40901C12.0129 7.83097 12.25 8.40326 12.25 9C12.25 9.59674 12.0129 10.169 11.591 10.591C11.169 11.0129 10.5967 11.25 10 11.25C9.40326 11.25 8.83097 11.0129 8.40901 10.591C7.98705 10.169 7.75 9.59674 7.75 9C7.75 8.40326 7.98705 7.83097 8.40901 7.40901C8.83097 6.98705 9.40326 6.75 10 6.75V6.75ZM15 17H5V15.5C5 13.83 8.33 13 10 13C11.67 13 15 13.83 15 15.5V17Z"
              fill="#EEEEEE"
            />
          </svg>
          &nbsp;Contact
        </a>
        <a
          href="https://www.linkedin.com/in/rakarasell/"
          className="inline-flex items-center py-3 px-5 text-base font-medium rounded-lg border text-white border-white hover:bg-accent hover:text-white hover:border-accent"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16 0C16.5304 0 17.0391 0.210714 17.4142 0.585786C17.7893 0.960859 18 1.46957 18 2V16C18 16.5304 17.7893 17.0391 17.4142 17.4142C17.0391 17.7893 16.5304 18 16 18H2C1.46957 18 0.960859 17.7893 0.585786 17.4142C0.210714 17.0391 0 16.5304 0 16V2C0 1.46957 0.210714 0.960859 0.585786 0.585786C0.960859 0.210714 1.46957 0 2 0H16ZM15.5 15.5V10.2C15.5 9.33539 15.1565 8.5062 14.5452 7.89483C13.9338 7.28346 13.1046 6.94 12.24 6.94C11.39 6.94 10.4 7.46 9.92 8.24V7.13H7.13V15.5H9.92V10.57C9.92 9.8 10.54 9.17 11.31 9.17C11.6813 9.17 12.0374 9.3175 12.2999 9.58005C12.5625 9.8426 12.71 10.1987 12.71 10.57V15.5H15.5ZM3.88 5.56C4.32556 5.56 4.75288 5.383 5.06794 5.06794C5.383 4.75288 5.56 4.32556 5.56 3.88C5.56 2.95 4.81 2.19 3.88 2.19C3.43178 2.19 3.00193 2.36805 2.68499 2.68499C2.36805 3.00193 2.19 3.43178 2.19 3.88C2.19 4.81 2.95 5.56 3.88 5.56ZM5.27 15.5V7.13H2.5V15.5H5.27Z"
              fill="#EEEEEE"
            />
          </svg>
          &nbsp;See Resume
        </a>
      </div>
      <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4"></div>
    </div>
  );
}
