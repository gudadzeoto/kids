import React, { useState, useRef, useEffect } from "react";
import sakstatLogoGe from "../assets/images/sakstat-logo.svg";
import sakstatLogoEn from "../assets/images/sakstat-logo-en.png";
import headerLogo1 from "../assets/images/header-logo-1.png";
import headerGif from "../assets/images/header.gif";
import headerGifEn from "../assets/images/header-en.gif";
import georgianFlag from "../assets/images/georgian-flag.svg";
import britishFlag from "../assets/images/british-flag.png";
import facebookIcon from "../assets/images/facebook.svg";
import twitterIcon from "../assets/images/twitter.svg";
import linkedinIcon from "../assets/images/linkedin.svg";
import headerBg from "../assets/images/header-bg.jpg";
import processIcon from "../assets/images/process.png";
import compliantIcon from "../assets/images/compliant.png";
import constructionIcon from "../assets/images/construction.png";

const Header = ({ language = "GE", setLanguage = () => {} }) => {

  const [langOpen, setLangOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const langRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (langRef.current && !langRef.current.contains(e.target)) {
        setLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const languages = [
    { code: "GE", label: "ქარ", flag: georgianFlag },
    { code: "EN", label: "ENG",  flag: britishFlag  },
  ];

  const current = languages.find((l) => l.code === language);

  const t = {
    GE: {
      portalLine1: "ბავშვების და მოზარდების",
      portalLine2: "სტატისტიკის პორტალი",
      nav: [
        "სტატისტიკური ინფორმაცია",
        "პუბლიკაციები",
        "კანონმდებლობა",
        "ბმულები",
        "გლოსარიუმი",
        "ინფოგრაფიკა",
      ],
    },
    EN: {
      portalLine1: "STATISTICAL PORTAL",
      portalLine2: "ON CHILDREN AND YOUTH",
      nav: [
        "MAIN STATISTICS",
        "PUBLICATIONS",
        "LEGISLATION",
        "LINKS",
        "GLOSSARY",
        "INFOGRAPHIC",
      ],
    },
  };

  const txt = t[language] ?? t.GE;

  return (
    <header className="w-full font-firago" style={{ fontFeatureSettings: '"case" on' }}>
      {/* TOP BAR */}
      <div className="flex items-center justify-between px-4 md:px-10 py-3 bg-gray-100">

        {/* LEFT */}
        <div className="flex items-center gap-4">
          <a href="" className="cursor-pointer">
            <img
              src={language === "GE" ? sakstatLogoGe : sakstatLogoEn}
              alt="Sakstat Logo"
              className="h-[45px] w-auto object-contain"
            />
          </a>

          <a href="" className="leading-tight cursor-pointer hidden sm:block" style={{ textDecoration: "none", color: "#3d3d3e", fontFeatureSettings: '"cpsp" on, "case" on', fontSize: "14px", fontWeight: "bold" }}>
            <p>{txt.portalLine1}</p>
            <p>{txt.portalLine2}</p>
          </a>

          <img
            src={headerLogo1}
            alt="Header Logo"
            className="h-[80%] w-auto object-contain"
          />
        </div>

        {/* RIGHT — desktop */}
        <div className="hidden md:flex flex-col items-end gap-2">
          <div className="flex items-center gap-4">
            {/* Junior Portal GIF */}
            <a href="https://juniors.geostat.ge" target="_blank" rel="noreferrer">
              <img src={language === "GE" ? headerGif : headerGifEn} alt="Juniors" className="h-[140px] w-auto object-contain" />
            </a>

            {/* Language Dropdown */}
            <div className="relative" ref={langRef}>
              <button
                onClick={() => setLangOpen((prev) => !prev)}
                className="flex items-center gap-2 border border-gray-300 rounded-full px-3 py-1 text-sm bg-white hover:bg-gray-50 cursor-pointer"
              >
                <img src={current.flag} alt={current.code} className="w-5 h-4 object-cover rounded-sm" />
                <span>{current.label}</span>
                <svg className={`w-3 h-3 transition-transform ${langOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {langOpen && (
                <div className="absolute right-0 mt-1 w-36 bg-white border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => { setLanguage(lang.code); setLangOpen(false); }}
                      className={`flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer ${
                        language === lang.code ? "bg-blue-50 font-semibold text-blue-700" : ""
                      }`}
                    >
                      <img src={lang.flag} alt={lang.code} className="w-5 h-4 object-cover rounded-sm" />
                      <span>{lang.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Socials */}
            <div className="flex items-center gap-3">
              <a href="https://www.facebook.com/geostat.ge/" target="_blank" rel="noreferrer" aria-label="Facebook">
                <img src={facebookIcon} alt="Facebook" className="w-4 h-4 object-contain" />
              </a>
              <a href="https://twitter.com/Geostat100" target="_blank" rel="noreferrer" aria-label="Twitter">
                <img src={twitterIcon} alt="Twitter" className="w-4 h-4 object-contain" />
              </a>
              <a href="https://www.linkedin.com/company/national-statistics-office-of-georgia/mycompany/" target="_blank" rel="noreferrer" aria-label="LinkedIn">
                <img src={linkedinIcon} alt="LinkedIn" className="w-4 h-4 object-contain" />
              </a>
            </div>
          </div>
        </div>

        {/* HAMBURGER — mobile */}
        <button
          className="md:hidden flex flex-col justify-center items-center gap-[5px] p-2 cursor-pointer"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="მენიუ"
        >
          <span className={`block w-6 h-[2px] bg-gray-700 transition-transform duration-300 ${menuOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
          <span className={`block w-6 h-[2px] bg-gray-700 transition-opacity duration-300 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-[2px] bg-gray-700 transition-transform duration-300 ${menuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
        </button>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="md:hidden bg-gray-100 px-6 pb-4 flex flex-col gap-3">
          {/* GIF — mobile */}
          <a href="https://juniors.geostat.ge" target="_blank" rel="noreferrer" className="pt-3">
            <img src={language === "GE" ? headerGif : headerGifEn} alt="Juniors" className="h-[100px] w-auto object-contain" />
          </a>
          {/* Language */}
          <div className="flex items-center gap-3 pt-3">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => { setLanguage(lang.code); setMenuOpen(false); }}
                className={`flex items-center gap-2 px-3 py-1 rounded-full border text-sm cursor-pointer ${
                  language === lang.code ? "bg-blue-600 text-white border-blue-600" : "bg-white border-gray-300"
                }`}
              >
                <img src={lang.flag} alt={lang.code} className="w-5 h-4 object-cover rounded-sm" />
                <span>{lang.label}</span>
              </button>
            ))}
          </div>
          {/* Nav links */}
          {txt.nav.map((item) => (
            <a
              key={item}
              href="#"
              onClick={() => setMenuOpen(false)}
              className="text-[15px] text-gray-800 py-2 border-b border-gray-200 hover:text-blue-700"
            >
              {item}
            </a>
          ))}
          {/* Socials */}
          <div className="flex items-center gap-4 pt-2">
            <a href="https://www.facebook.com/geostat.ge/" target="_blank" rel="noreferrer">
              <img src={facebookIcon} alt="Facebook" className="w-5 h-5 object-contain" />
            </a>
            <a href="https://twitter.com/Geostat100" target="_blank" rel="noreferrer">
              <img src={twitterIcon} alt="Twitter" className="w-5 h-5 object-contain" />
            </a>
            <a href="https://www.linkedin.com/company/national-statistics-office-of-georgia/mycompany/" target="_blank" rel="noreferrer">
              <img src={linkedinIcon} alt="LinkedIn" className="w-5 h-5 object-contain" />
            </a>
          </div>
        </div>
      )}

      {/* NAVBAR — desktop only */}
      <nav className="hidden md:block text-white" style={{ background: "#0066e0" }}>
        <div className="flex justify-center items-stretch gap-10 text-[16px]">
          {txt.nav.map((item) => (
            <a key={item} href="#" className="flex items-center px-3 py-[20px] transition-colors duration-200 hover:bg-white hover:text-gray-900">
              {item}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
};

export default Header;
