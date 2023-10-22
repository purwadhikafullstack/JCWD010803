import LogoImage from "../assets/images/3.png";
import {
  FaGlobe,
  FaTwitter,
  FaFacebook,
  FaInstagram,
  FaArrowUp,
} from "react-icons/fa";

const Footer = () => {
  return (
    // <div className="flex items-end w-full min-h-screen bg-white">
    <div className="flex items-end w-full mt-10 bg-white">
      <footer className="w-full text-gray-700 bg-teal-50 body-font">
        <div className="container flex flex-col flex-wrap px-5 py-24 mx-auto md:items-center lg:items-start md:flex-row md:flex-no-wrap">
          <div className="flex flex-wrap flex-grow mt-10 -mb-10 text-center md:pl-20 md:mt-0 md:text-left">
            <div className="w-full px-4 lg:w-1/4 md:w-1/2">
              <h2 className="mb-3 text-sm font-medium tracking-widest text-gray-900 uppercase title-font">
                ComfyCribz
              </h2>
              <nav className="mb-10 list-none">
                <li className="mt-3">
                  <a
                    href="/"
                    className="text-gray-500 cursor-pointer hover:text-gray-900"
                  >
                    Newsroom
                  </a>
                </li>
                <li className="mt-3">
                  <a
                    href="/"
                    className="text-gray-500 cursor-pointer hover:text-gray-900"
                  >
                    Careers
                  </a>
                </li>
                <li className="mt-3">
                  <a
                    href="/"
                    className="text-gray-500 cursor-pointer hover:text-gray-900"
                  >
                    Investors
                  </a>
                </li>
                <li className="mt-3">
                  <a
                    href="/"
                    className="text-gray-500 cursor-pointer hover:text-gray-900"
                  >
                    ComfyCribs.org emergency stays
                  </a>
                </li>
              </nav>
            </div>
            <div className="w-full px-4 lg:w-1/4 md:w-1/2">
              <h2 className="mb-3 text-sm font-medium tracking-widest text-gray-900 uppercase title-font">
                Support
              </h2>
              <nav className="mb-10 list-none">
                <li className="mt-3">
                  <a
                    href="/"
                    className="text-gray-500 cursor-pointer hover:text-gray-900"
                  >
                    Help Center
                  </a>
                </li>
                <li className="mt-3">
                  <a
                    href="/"
                    className="text-gray-500 cursor-pointer hover:text-gray-900"
                  >
                    Anti-discrimination
                  </a>
                </li>
                <li className="mt-3">
                  <a
                    href="/"
                    className="text-gray-500 cursor-pointer hover:text-gray-900"
                  >
                    Cancellation options
                  </a>
                </li>
                <li className="mt-3">
                  <a
                    href="/"
                    className="text-gray-500 cursor-pointer hover:text-gray-900"
                  >
                    Report neighborhood concern
                  </a>
                </li>
              </nav>
            </div>
            <div className="w-full px-4 lg:w-1/4 md:w-1/2">
              <h2 className="mb-3 text-sm font-medium tracking-widest text-gray-900 uppercase title-font">
                Tenant
              </h2>
              <nav className="mb-10 list-none">
                <li className="mt-3">
                  <a
                    href="/"
                    className="text-gray-500 cursor-pointer hover:text-gray-900"
                  >
                    ComfyCribs your home
                  </a>
                </li>
                <li className="mt-3">
                  <a
                    href="/"
                    className="text-gray-500 cursor-pointer hover:text-gray-900"
                  >
                    ComfyCover for Tenants
                  </a>
                </li>
                <li className="mt-3">
                  <a
                    href="/"
                    className="text-gray-500 cursor-pointer hover:text-gray-900"
                  >
                    Tenants responsibly
                  </a>
                </li>
                <li className="mt-3">
                  <a
                    href="/"
                    className="text-gray-500 cursor-pointer hover:text-gray-900"
                  >
                    Community forum
                  </a>
                </li>
              </nav>
            </div>
            <div className="w-full px-4 lg:w-1/4 md:w-1/2">
              <h2 className="mb-3 text-sm font-medium tracking-widest text-gray-900 uppercase title-font">
                Tenants Listings
              </h2>
              <nav className="mb-10 list-none">
                <li className="mt-3">
                  <a
                    href="/"
                    className="text-gray-500 cursor-pointer hover:text-gray-900"
                  >
                    How it Works
                  </a>
                </li>
              </nav>
            </div>
          </div>
        </div>
        <div className="bg-white">
          <div className="container px-5 py-4 mx-auto flex flex-wrap justify-between items-center">
            <p className="text-sm text-gray-700 capitalize xl:text-center">
              © 2023, Comfy Cribs. All rights reserved ·{" "}
              <a
                href="/"
                className="text-gray-500 cursor-pointer hover:text-gray-900 hover:underline"
              >
                Terms and Conditions
              </a>{" "}
              ·{" "}
              <a
                href="/"
                className="text-gray-500 cursor-pointer hover:text-gray-900 hover:underline"
              >
                Sitemap
              </a>{" "}
              ·{" "}
              <a
                href="/"
                className="text-gray-500 cursor-pointer hover:text-gray-900 hover:underline"
              >
                Privacy
              </a>{" "}
              ·{" "}
              <a
                href="/"
                className="text-gray-500 cursor-pointer hover:text-gray-900 hover:underline"
              >
                Your Privacy Choices
              </a>
            </p>
            <div className="flex space-x-6">
              <div className="flex items-center space-x-2">
                <FaGlobe size={15} />
                <div className="font-semibold cursor-pointer">English (US)</div>
              </div>
              <div className="font-semibold cursor-pointer">Rp IDR</div>
              <div className="items-center flex space-x-3 cursor-pointer">
                <div className="font-semibold">Support & Resources</div>
                <FaArrowUp size={15} />
              </div>
              <div className="flex items-center space-x-2">
                <a
                  href="#"
                  className="text-gray-500 cursor-pointer hover:text-gray-900 hover:underline"
                >
                  <FaTwitter size={20} />
                </a>
                <a
                  href="#"
                  className="text-gray-500 cursor-pointer hover:text-gray-900 hover:underline"
                >
                  <FaFacebook size={20} />
                </a>
                <a
                  href="#"
                  className="text-gray-500 cursor-pointer hover:text-gray-900 hover:underline"
                >
                  <FaInstagram size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
