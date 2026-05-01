import { Mail, MapPin, Phone } from "lucide-react";
import React from "react";
import { Link } from "react-router";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <div className="bg-gray-900">
      <div className="container">
        <div className="py-15">
          <div className="grid grid-cols-12 gap-2">
            <div className="col-span-3">
              <Link to="/">
                <div className="w-35 mb-3">
                  <img
                    src="/images/logo-white.png"
                    className="w-full"
                    alt="smart-deals"
                  />
                </div>
              </Link>
              <p className="text-secondary leading-7">
                Your trusted marketplace for authentic local products. Discover
                the best deals from across Bangladesh.
              </p>
            </div>

            <div className="col-span-2">
              <h3 className="text-white font-medium text-2xl">Quick Links</h3>
              <div className="flex flex-col gap-3 mt-5 text-secondary">
                <Link className="hover:text-white">All Products</Link>
                <Link className="hover:text-white">Dashboard</Link>
                <Link className="hover:text-white">Login</Link>
                <Link className="hover:text-white">Register</Link>
              </div>
            </div>
            <div className="col-span-2">
              <h3 className="text-white font-medium text-2xl">Categories</h3>
              <div className="flex flex-col gap-3 mt-5 text-secondary">
                <Link className="hover:text-white">Electronics</Link>
                <Link className="hover:text-white">Fashion</Link>
                <Link className="hover:text-white">Home & Living</Link>
                <Link className="hover:text-white">Groceries</Link>
              </div>
            </div>
            <div className="col-span-3">
              <h3 className="text-white font-medium text-2xl">
                Contact & Support
              </h3>
              <div className="flex flex-col gap-3 mt-5 text-secondary">
                <a
                  href="mailto:mdfaisalafrid@gmail.com"
                  className="hover:text-white flex gap-2 items-center"
                >
                  <Mail className="w-4.5 shrink-0" />{" "}
                  <p>mdfaisalafrid@gmail.com</p>
                </a>
                <a
                  href="tel:+8801345802911"
                  className="hover:text-white flex gap-2 items-center"
                >
                  <Phone className="w-4.5 shrink-0" /> <p>+8801345802911</p>
                </a>
                <a
                  href="https://maps.app.goo.gl/8EM3mZm7Gvgp22PTA"
                  target="_blank"
                  className="hover:text-white flex gap-2 items-start"
                >
                  <MapPin className="w-4.5 shrink-0" />{" "}
                  <p>
                    H-C/4, Rafique Haji Bari, Anandanagar, Merul Badda, Dhaka.
                  </p>
                </a>
              </div>
            </div>
            <div className="col-span-2">
              <h3 className="text-white font-medium text-2xl">Find us on</h3>
              <div className="flex flex-col gap-3 mt-5 text-secondary">
                <a
                  href="https://www.facebook.com/faisalafrid"
                  target="_blank"
                  className="hover:text-white flex gap-2 items-center"
                >
                  <img
                    src="/images/facebook.png"
                    alt="facebook"
                    className="w-5 shrink-0"
                  />
                  <p>Facebook</p>
                </a>
                <a
                  href="https://www.linkedin.com/in/md-faisal-yousuf-afrid/"
                  target="_blank"
                  className="hover:text-white flex gap-2 items-center"
                >
                  <img
                    src="/images/linkedin.png"
                    alt="linkedin"
                    className="w-5 shrink-0"
                  />
                  <p>Linkedin</p>
                </a>
                <a
                  href="https://www.youtube.com/@faisalyousufafrid"
                  target="_blank"
                  className="hover:text-white flex gap-2 items-center"
                >
                  <img
                    src="/images/youtube.png"
                    alt="youtube"
                    className="w-5 shrink-0"
                  />
                  <p>YouTube</p>
                </a>
                <a
                  href="https://github.com/Afrid2004"
                  target="_blank"
                  className="hover:text-white flex gap-2 items-center"
                >
                  <img
                    src="/images/github.png"
                    alt="github"
                    className="w-5 shrink-0"
                  />
                  <p>Github</p>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="py-5 border-t border-gray-700 text-secondary flex items-center justify-between">
          <p>Copyright &copy; {year} | Smart Deals All Rights Reserved</p>
          <span>
            Design & Developed by{" "}
            <a
              className="text-white/70 hover:text-white hover:underline"
              href="https://faisalafrid.vercel.app"
              target="_blank"
            >
              MD Faisal Yousuf Afrid
            </a>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
