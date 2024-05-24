import type { MetaFunction } from '@remix-run/node'
import { Link } from '@remix-run/react'

export const meta: MetaFunction = () => [
  { title: 'ATRIM' },
  {
    description: `TBML SaaS platform powered by Knowledge Graph based Semantic Blockchain Networks`,
  },
  {
    keywords:
      'TBML, AI, ML, AML, Semantic Graph, Knowledge Engine, Blockchain',
  },
  { 'og:title': 'Atrim - Ulysses 3.0' },
  { 'og:type': 'website' },
  { 'og:url': 'https://stripe-stack.fly.dev' },
  {
    'og:image':
      'http://ulysses2.ddns.net/images/logo.svg',
  },
  { 'og:card': 'summary_large_image' },
  { 'og:creator': '@Ulysses' },
  { 'og:site': 'https://stripe-stack.fly.dev' },
  {
    'og:description': `TBML SaaS platform powered by Knowledge Graph based Semantic Blockchain Networks`,
  },
  {
    'twitter:image':
      'http://ulysses2.ddns.net/images/logo.svg',
  },
  { 'twitter:card': 'summary_large_image' },
  { 'twitter:creator': '@Ulysses' },
  { 'twitter:title': 'Atrim - Ulysses 3.0' },
  {
    'twitter:description': `TBML SaaS platform powered by Knowledge Graph based Semantic Blockchain Networks`,
  },
]

export default function Index() {
  return (
    <>
      <main className="flex h-full flex-col items-center justify-center" style={{ minHeight: "calc(100vh - 80px)" }}>
        <div className="relative flex flex-col items-center z-20">
          <img
            src="http://ulysses2.ddns.net:33090/public/img/grafana_icon.svg"
            alt="Ulysses 3.0"
            className="pulse h-24 w-24 cursor-pointer select-none hue-rotate-15 transition hover:brightness-125"
          />

          <div className="my-4" />

          <div className="flex flex-col items-center">
            <h1 className="text-3xl font-light text-gray-100">
              <span className="font-bold text-gray-100">Ulysses</span> 3.0
            </h1>
            <p className="cursor-default text-lg font-semibold text-gray-400 transition hover:brightness-125">
              TBML AI/ML Platform
            </p>
          </div>
          <div className="my-3" />

          <div className="flex cursor-default flex-col items-center">
            <h1 className="text-center text-8xl font-bold text-gray-200">
              <span
                className="bg-gradient-to-b from-violet-200 to-violet-500 
							bg-clip-text text-transparent transition hover:brightness-125"
              >
                Financial
              </span>{" "}
              Foren$ics
            </h1>
            <h1
              className="bg-gradient-to-b from-gray-200 to-gray-400 bg-clip-text text-8xl 
						font-bold text-transparent transition hover:brightness-125"
            >
              made easy
            </h1>
          </div>
          <div className="my-4" />

          <p className="max-w-lg text-center text-base font-semibold text-gray-400 sm:text-xl">
            Advanced TBML{" "}
            <span
              className="bg-gradient-to-b from-green-200 to-green-500 
							bg-clip-text text-transparent transition hover:brightness-125"
            >
              SaaS
            </span>{" "}
            offering for Enterprises powered by Knowledge Graph Semantic Blockchain Networks
          </p>
          <div className="my-3" />

          <div className="flex flex-row items-center">
            <Link
              to="/plans"
              prefetch="viewport"
              rel="noopener noreferrer"
              className="hidden h-12 flex-row items-center border border-gray-600 px-6 font-bold 
						text-gray-200 transition hover:scale-105 hover:border-gray-200 hover:text-gray-100 active:opacity-80 sm:flex"
              data-augmented-ui="tl-clip br-clip inlay"
            >
              Explore Plans
            </Link>
            <div className="mx-2" />

            <Link
              to="/login"
              prefetch="viewport"
              rel="noopener noreferrer"
              className="hidden h-12 flex-row items-center border border-gray-600 px-6 font-bold
						text-gray-200 transition hover:scale-105 hover:border-gray-200 hover:text-gray-100 active:opacity-80 sm:flex"
              data-augmented-ui="tl-clip br-clip inlay"
            >
              Try for Free
            </Link>
          </div>
        </div>
      </main>

      <section className="w-full text-gray-400 body-font bg-gray-900">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-20">
            <h2 className="text-xs text-indigo-400 tracking-widest font-medium title-font mb-1">ROOF PARTY POLAROID</h2>
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-white">
              Master Cleanse Reliac Heirloom
            </h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
              Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical gentrify, subway tile poke farm-to-table.
              Franzen you probably haven't heard of them man bun deep jianbing selfies heirloom prism food truck ugh
              squid celiac humblebrag.
            </p>
          </div>
          <div className="flex flex-wrap">
            <div className="xl:w-1/4 lg:w-1/2 md:w-full px-8 py-6 border-l-2 border-gray-800">
              <h2 className="text-lg sm:text-xl text-white font-medium title-font mb-2">Shooting Stars</h2>
              <p className="leading-relaxed text-base mb-4">
                Fingerstache flexitarian street art 8-bit waistcoat. Distillery hexagon disrupt edison bulbche.
              </p>
              <a className="text-indigo-400 inline-flex items-center">
                Learn More
                <svg
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  className="w-4 h-4 ml-2"
                  viewBox="0 0 24 24"
                >
                  <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
              </a>
            </div>
            <div className="xl:w-1/4 lg:w-1/2 md:w-full px-8 py-6 border-l-2 border-gray-800">
              <h2 className="text-lg sm:text-xl text-white font-medium title-font mb-2">The Catalyzer</h2>
              <p className="leading-relaxed text-base mb-4">
                Fingerstache flexitarian street art 8-bit waistcoat. Distillery hexagon disrupt edison bulbche.
              </p>
              <a className="text-indigo-400 inline-flex items-center">
                Learn More
                <svg
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  className="w-4 h-4 ml-2"
                  viewBox="0 0 24 24"
                >
                  <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
              </a>
            </div>
            <div className="xl:w-1/4 lg:w-1/2 md:w-full px-8 py-6 border-l-2 border-gray-800">
              <h2 className="text-lg sm:text-xl text-white font-medium title-font mb-2">Neptune</h2>
              <p className="leading-relaxed text-base mb-4">
                Fingerstache flexitarian street art 8-bit waistcoat. Distillery hexagon disrupt edison bulbche.
              </p>
              <a className="text-indigo-400 inline-flex items-center">
                Learn More
                <svg
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  className="w-4 h-4 ml-2"
                  viewBox="0 0 24 24"
                >
                  <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
              </a>
            </div>
            <div className="xl:w-1/4 lg:w-1/2 md:w-full px-8 py-6 border-l-2 border-gray-800">
              <h2 className="text-lg sm:text-xl text-white font-medium title-font mb-2">Melanchole</h2>
              <p className="leading-relaxed text-base mb-4">
                Fingerstache flexitarian street art 8-bit waistcoat. Distillery hexagon disrupt edison bulbche.
              </p>
              <a className="text-indigo-400 inline-flex items-center">
                Learn More
                <svg
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  class="w-4 h-4 ml-2"
                  viewBox="0 0 24 24"
                >
                  <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
              </a>
            </div>
          </div>
          <button className="flex mx-auto mt-16 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
            Explore Plans
          </button>
        </div>
      </section>

      <section className="text-gray-400 body-font relative">
        <div className="px-5 py-24 mx-auto flex sm:flex-nowrap flex-wrap">
          <div className="lg:w-2/3 md:w-1/2 bg-gray-900 rounded-lg overflow-hidden sm:mr-10 p-10 flex items-end justify-start relative">
            <iframe
              width="100%"
              height="100%"
              title="map"
              className="absolute inset-0"
              frameborder="0"
              marginheight="0"
              marginwidth="0"
              scrolling="no"
              src="https://maps.google.com/maps?width=100%&amp;height=600&amp;hl=en&amp;q=%C4%B0zmir+(My%20Business%20Name)&amp;ie=UTF8&amp;t=&amp;z=14&amp;iwloc=B&amp;output=embed"
              style={{ filter: "grayscale(1) contrast(1.2) opacity(0.16)" }}
            ></iframe>
            <div className="bg-gray-900 relative flex flex-wrap py-6 rounded shadow-md">
              <div className="lg:w-1/2 px-6">
                <h2 className="title-font font-semibold text-white tracking-widest text-xs">ADDRESS</h2>
                <p className="mt-1">Photo booth tattooed prism, portland taiyaki hoodie neutra typewriter</p>
              </div>
              <div className="lg:w-1/2 px-6 mt-4 lg:mt-0">
                <h2 className="title-font font-semibold text-white tracking-widest text-xs">EMAIL</h2>
                <a className="text-indigo-400 leading-relaxed" href="#">
                  example@email.com
                </a>
                <h2 className="title-font font-semibold text-white tracking-widest text-xs mt-4">PHONE</h2>
                <p className="leading-relaxed">123-456-7890</p>
              </div>
            </div>
          </div>
          <div className="lg:w-1/3 md:w-1/2 flex flex-col md:ml-auto w-full md:py-8 mt-8 md:mt-0">
            <h2 className="text-white text-lg mb-1 font-medium title-font">Contact</h2>
            <p className="leading-relaxed mb-5">Leave a message and we will get back to you.</p>
            <div className="relative mb-4">
              <label htmlFor="name" className="leading-7 text-sm text-gray-400">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div className="relative mb-4">
              <label htmlFor="email" className="leading-7 text-sm text-gray-400">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div className="relative mb-4">
              <label htmlFor="message" className="leading-7 text-sm text-gray-400">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                className="w-full bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 h-32 text-base outline-none text-gray-100 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
              ></textarea>
            </div>
            <button className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">
              Send
            </button>
            <p className="text-xs text-gray-400 text-opacity-90 mt-3">
              Chicharrones blog helvetica normcore iceland tousled brook viral artisan.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export const links = () => {
  return [
    { rel: 'stylesheet', href: "https://unpkg.com/augmented-ui@2/augmented-ui.min.css" },
  ]
}