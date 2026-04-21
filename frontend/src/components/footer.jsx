import React from "react";
import facebookIcon from "../assets/images/facebook.svg";
import twitterIcon from "../assets/images/twitter.svg";
import linkedinIcon from "../assets/images/linkedin.svg";

const Footer = ({ language = "GE" }) => {
  const year = new Date().getFullYear();
  const isEN = language === "EN";
  return (
    <footer
      className="bg-[#005c97] text-white font-firago"
      style={{ fontFeatureSettings: '"case" on' }}
    >
      {/* TOP SECTION */}
      <div className="py-12 px-6 flex flex-col md:flex-row md:justify-around gap-10 md:gap-0">
        {/* LEFT */}
        <div>
          <h3 className="font-semibold text-lg mb-4">
            {isEN ? "CONTACT INFORMATION" : "საკონტაქტო ინფორმაცია"}
          </h3>

          <p style={{ fontSize: "12px", fontWeight: 400, lineHeight: "30px" }}>
            {isEN
              ? "National Statistics Office of Georgia"
              : "საქართველოს სტატისტიკის ეროვნული სამსახური"}
          </p>
          <p style={{ fontSize: "12px", fontWeight: 400, lineHeight: "30px" }}>
            <a style={{ color: "white" }} href="tel:+995322367210">
              (+995 32) 236 72 10, (+995 32) 260 11 60
            </a>
          </p>
          <p style={{ fontSize: "12px", fontWeight: 400, lineHeight: "30px" }}>
            <a
              style={{ color: "white" }}
              href="mailto:info@geostat.ge"
              tabIndex={92}
            >
              info@geostat.ge
            </a>
          </p>
          <p
            style={{ fontSize: "12px", fontWeight: 400, lineHeight: "30px" }}
            className="mb-6"
          >
            {isEN
              ? "30, Tsotne Dadiani Str., 0180, Tbilisi, Georgia"
              : "ცოტნე დადიანის ქ. 30, თბილისი, 0180"}
          </p>

          <h4 className="font-semibold mb-3">
            {isEN ? "Social Networks" : "სოციალური ქსელები"}
          </h4>
          <div className="flex gap-4 items-center">
            <a
              href="https://www.facebook.com/geostat.ge/"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
            >
              <img
                src={facebookIcon}
                alt="Facebook"
                className="w-5 h-5 object-contain brightness-0 invert"
              />
            </a>
            <a
              href="https://twitter.com/Geostat100"
              target="_blank"
              rel="noreferrer"
              aria-label="Twitter"
            >
              <img
                src={twitterIcon}
                alt="Twitter"
                className="w-5 h-5 object-contain brightness-0 invert"
              />
            </a>
            <a
              href="https://www.linkedin.com/company/national-statistics-office-of-georgia/mycompany/"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
            >
              <img
                src={linkedinIcon}
                alt="LinkedIn"
                className="w-5 h-5 object-contain brightness-0 invert"
              />
            </a>
          </div>
        </div>

        {/* CENTER */}
        <div>
          <h6 className="font-semibold text-lg mb-4">
            {isEN ? "MENU" : "მენიუ"}
          </h6>

          <ul className="space-y-0">
            <li
              className="hover:underline cursor-pointer"
              style={{ fontSize: "12px", fontWeight: 400, lineHeight: "30px" }}
            >
              {isEN ? "MAIN STATISTICS" : "სტატისტიკური ინფორმაცია"}
            </li>
            <li
              className="hover:underline cursor-pointer"
              style={{ fontSize: "12px", fontWeight: 400, lineHeight: "30px" }}
            >
              {isEN ? "PUBLICATIONS" : "პუბლიკაციები"}
            </li>
            <li
              className="hover:underline cursor-pointer"
              style={{ fontSize: "12px", fontWeight: 400, lineHeight: "30px" }}
            >
              {isEN ? "LEGISLATION" : "კანონმდებლობა"}
            </li>
            <li
              className="hover:underline cursor-pointer"
              style={{ fontSize: "12px", fontWeight: 400, lineHeight: "30px" }}
            >
              {isEN ? "LINKS" : "ბმულები"}
            </li>
            <li
              className="hover:underline cursor-pointer"
              style={{ fontSize: "12px", fontWeight: 400, lineHeight: "30px" }}
            >
              {isEN ? "GLOSSARY" : "გლოსარიუმი"}
            </li>
            <li
              className="hover:underline cursor-pointer"
              style={{ fontSize: "12px", fontWeight: 400, lineHeight: "30px" }}
            >
              {isEN ? "INFOGRAPHIC" : "ინფოგრაფიკა"}
            </li>
          </ul>
        </div>

        <div className="text-center md:text-left">
          <h3 className="font-semibold text-lg mb-4">
            {isEN ? "Terms of Use" : "მონაცემთა გამოყენების პირობები"}
          </h3>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-white/20 text-center text-sm py-4 relative">
        <p
          style={{
            textAlign: "center",
            fontSize: "0.7rem",
            fontWeight: "normal",
          }}
        >
          {isEN
            ? `All rights reserved © Geostat ${year}`
            : `ყველა უფლება დაცულია © საქსტატი ${year}`}
        </p>
        <p
          style={{
            textAlign: "center",
            fontSize: "0.7rem",
            fontWeight: "normal",
          }}
        >
          {isEN
            ? "The portal was developed with the financial and technical support of the United Nations Childrens Fund (UNICEF)"
            : "პორტალი შეიქმნა გაეროს ბავშვთა ფონდის (UNICEF) ტექნიკური და ფინანსური მხარდაჭერით."}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
