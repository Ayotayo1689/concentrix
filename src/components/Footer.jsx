import React from "react";
import "./styles.css"
import "./main.css"
const Footer = () => {
  return (
    <footer id="footer" className="">
      <div className="container">
        <div className="logo">
          <img
            src="data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%200%200'%3E%3C/svg%3E"
            alt="Global"
            data-lazy-src="https://jobs.concentrix.com/wp-content/themes/jobswh/img/logo-concentrix-white.svg"
          />
          <noscript>
            <img
              src="https://jobs.concentrix.com/wp-content/themes/jobswh/img/logo-concentrix-white.svg"
              alt="Global"
            />
          </noscript>
        </div>

        <div className="nav-wrapper">
          <div className="jobs-nav">
            <div className="title">
              <span data-title="Find jobs by">Find jobs by s </span>
            </div>

            <div className="jobs-navs">
              <ul className="parent">
                <li>
                  <a href="#/jobs-by-category/">Category </a>
                </li>

                <li>
                  <a href="#/jobs-by-location/">Location </a>
                </li>

                <li>
                  <a href="#/jobs-abroad/">Jobs Abroad </a>
                </li>

                <li>
                  <a href="#/jobs-by-language/">Language </a>
                </li>
              </ul>

              <a href="#/job-search/" className="btn btn-white btn-md all-jobs">
                See all jobs{" "}
              </a>
            </div>
          </div>

          <div className="menu-wrapper">
            <ul id="menu-footer-1" className="menu">
              <li className="menu-item menu-item-type-post_type menu-item-object-page current-menu-item page_item page-item-217113 current_page_item menu-item-217567">
                <a href="#" aria-current="page">
                  About Us
                </a>
              </li>
              <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-217565">
                <a href="#our-culture/">Our Culture</a>
              </li>
              <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-217566">
                <a href="#/benefits/">Benefits</a>
              </li>
              <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-217564">
                <a href="#/faqs/">FAQs</a>
              </li>
              <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-217563">
                <a href="#/contact-us/">Contact Us</a>
              </li>
              <li className="menu-item menu-item-type-custom menu-item-object-custom menu-item-221366">
                <a
                  target="_blank"
                  rel="noopener"
                  href="https://www.concentrix.com/"
                >
                  For Business
                </a>
              </li>
            </ul>
            <div className="all-jobs-wrapper-mobile">
              <a
                href="#/job-search/"
                className="btn btn-white btn-md all-jobs-mobile"
              >
                See all jobs{" "}
              </a>
            </div>
          </div>
        </div>

        <div className="socket">
          <div className="copyright">
            Copyright © 2024 Concentrix Corporation. All rights reserved.{" "}
          </div>
          
        </div>
      </div>
    </footer>
  );
};

export default Footer;
