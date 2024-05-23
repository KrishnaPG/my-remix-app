import { Link, useLocation } from '@remix-run/react'

const FooterBlock = () => {
  return (
    <footer className="text-gray-400 bg-gray-900 body-font w-full ">
      <div className="container px-5 py-24 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
        <div className="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left">
          <a className="flex title-font font-medium items-center md:justify-start justify-center text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full"
              viewBox="0 0 24 24"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg>
            <span className="ml-3 text-xl">Latize</span>
          </a>
          <p className="mt-2 text-sm text-gray-500">Air plant banjo lyft occupy retro adaptogen indego</p>
        </div>
        <div className="flex-grow flex flex-wrap md:pl-20 -mb-10 md:mt-0 mt-10 md:text-left text-center">
          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2 className="title-font font-medium text-white tracking-widest text-sm mb-3">PRODUCT</h2>
            <nav className="list-none mb-10">
              <li>
                <a className="text-gray-400 hover:text-white">First Link</a>
              </li>
              <li>
                <a className="text-gray-400 hover:text-white">Second Link</a>
              </li>
              <li>
                <a className="text-gray-400 hover:text-white">Third Link</a>
              </li>
              <li>
                <a className="text-gray-400 hover:text-white">Fourth Link</a>
              </li>
            </nav>
          </div>
          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2 className="title-font font-medium text-white tracking-widest text-sm mb-3">SERVICES</h2>
            <nav className="list-none mb-10">
              <li>
                <a className="text-gray-400 hover:text-white">First Link</a>
              </li>
              <li>
                <a className="text-gray-400 hover:text-white">Second Link</a>
              </li>
              <li>
                <a className="text-gray-400 hover:text-white">Third Link</a>
              </li>
              <li>
                <a className="text-gray-400 hover:text-white">Fourth Link</a>
              </li>
            </nav>
          </div>
          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2 className="title-font font-medium text-white tracking-widest text-sm mb-3">PRICE</h2>
            <nav className="list-none mb-10">
              <li>
                <a className="text-gray-400 hover:text-white">First Link</a>
              </li>
              <li>
                <a className="text-gray-400 hover:text-white">Second Link</a>
              </li>
              <li>
                <a className="text-gray-400 hover:text-white">Third Link</a>
              </li>
              <li>
                <a className="text-gray-400 hover:text-white">Fourth Link</a>
              </li>
            </nav>
          </div>
          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2 className="title-font font-medium text-white tracking-widest text-sm mb-3">ABOUT US</h2>
            <nav className="list-none mb-10">
              <li>
                <a className="text-gray-400 hover:text-white">Team</a>
              </li>
              <li>
                <a className="text-gray-400 hover:text-white">Company</a>
              </li>
              <li>
                <a className="text-gray-400 hover:text-white">Blog</a>
              </li>
              <li>
                <a className="text-gray-400 hover:text-white">News</a>
              </li>
            </nav>
          </div>
        </div>
      </div>
      <div className="bg-gray-800 bg-opacity-75">
        <div className="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
          <p className="text-gray-400 text-sm text-center sm:text-left">
            © 2023 Latize —
            <a
              href="https://twitter.com/knyttneve"
              rel="noopener noreferrer"
              className="text-gray-500 ml-1"
              target="_blank"
            >
              @knyttneve
            </a>
          </p>
          <span className="inline-flex sm:ml-auto sm:mt-0 mt-2 justify-center sm:justify-start">
            <a className="text-gray-400">
              <svg
                fill="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                className="w-5 h-5"
                viewBox="0 0 24 24"
              >
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
              </svg>
            </a>
            <a className="ml-3 text-gray-400">
              <svg
                fill="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                className="w-5 h-5"
                viewBox="0 0 24 24"
              >
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
              </svg>
            </a>
            <a className="ml-3 text-gray-400">
              <svg
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                className="w-5 h-5"
                viewBox="0 0 24 24"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
              </svg>
            </a>
            <a className="ml-3 text-gray-400">
              <svg
                fill="currentColor"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="0"
                className="w-5 h-5"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="none"
                  d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"
                ></path>
                <circle cx="4" cy="4" r="2" stroke="none"></circle>
              </svg>
            </a>
          </span>
        </div>
      </div>
    </footer>
  );

}

export function Footer() {
  const location = useLocation()

  return location.pathname !== '/support' ? (<FooterBlock/>
    // <footer
    //   className="z-10 m-auto my-0 flex max-h-[64px] min-h-[64px] 
    //   w-full flex-row items-center justify-center">
    //   <p className="flex flex-row items-center text-sm font-semibold text-gray-400">
    //     &copy; Copyright
    //     <a
    //       href="https://latize.com/"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //       className="ml-2 flex flex-row items-center text-gray-100 decoration-gray-500 transition
    //       hover:scale-105 hover:text-violet-200 hover:decoration-violet-200 hover:brightness-125 active:opacity-80">
    //       Latize Pte Ltd
    //     </a>. All Rights Reserved.
    //   </p>
    // </footer>
  ) : (
    <footer className="z-10 m-auto my-0 flex max-h-[64px] min-h-[64px] w-full flex-row items-center justify-center">
      <p className="flex flex-row items-center text-sm font-semibold text-gray-400 hover:text-gray-200">
        <svg
          className="h-5 w-5 fill-green-400"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24">
          <path d="M12 4.595a5.904 5.904 0 0 0-3.996-1.558 5.942 5.942 0 0 0-4.213 1.758c-2.353 2.363-2.352 6.059.002 8.412l7.332 7.332c.17.299.498.492.875.492a.99.99 0 0 0 .792-.409l7.415-7.415c2.354-2.354 2.354-6.049-.002-8.416a5.938 5.938 0 0 0-4.209-1.754A5.906 5.906 0 0 0 12 4.595zm6.791 1.61c1.563 1.571 1.564 4.025.002 5.588L12 18.586l-6.793-6.793c-1.562-1.563-1.561-4.017-.002-5.584.76-.756 1.754-1.172 2.799-1.172s2.035.416 2.789 1.17l.5.5a.999.999 0 0 0 1.414 0l.5-.5c1.512-1.509 4.074-1.505 5.584-.002z" />
        </svg>
        <div className="mx-1" />
        Thank you!
      </p>
    </footer>
  )
}
