import React, { useState, useEffect, useRef } from "react";
import slide1 from "../assets/images/slide-1.jpg";
import slide2 from "../assets/images/slide-2.jpg";
import slide3 from "../assets/images/slide-3.png";
import slide4 from "../assets/images/slide-4.jpg";
import slide5 from "../assets/images/slide-5.png";
import slide6 from "../assets/images/slide-6.jpg";
import slide7 from "../assets/images/slide-7.png";
import slide8 from "../assets/images/slide-8.jpg";
import slide9 from "../assets/images/slide-9.png";
import slide10 from "../assets/images/slide-10.jpg";
import marriageImg from "../assets/images/marriage.png";
import lifeCalcImg from "../assets/images/lifecalculator.png";

const slides = [
  { src: slide1, titleGE: "მოსახლეობა", titleEN: "Population" },
  { src: slide2, titleGE: "ჯამრთელობის\nდაცვა", titleEN: "Health Care" },
  { src: slide3, titleGE: "განათლება", titleEN: "Education" },
  {
    src: slide4,
    titleGE: "სოციალური \nუზრუნველყოფა",
    titleEN: "Social\nSecurity",
  },
  { src: slide5, titleGE: "ცხოვრების\nდონე", titleEN: "Living\nConditions" },
  {
    src: slide6,
    titleGE: "დასაქმება და\nუმუშევრობა",
    titleEN: "Employment and\nUnemployment",
  },
  {
    src: slide7,
    titleGE: "საინფორმაციო და\nსაკომუნიკაციო ტექნოლოგიები",
    titleEN: "ICT",
  },
  { src: slide8, titleGE: "ტურიზმი", titleEN: "Tourism" },
  { src: slide9, titleGE: "სამართალდარღვევები", titleEN: "Crime" },
  {
    src: slide10,
    titleGE: "ეროვნული\nანგარიშები",
    titleEN: "GDP and national Accounts",
  },
];

const t = {
  GE: {
    sections: [
      "სტატისტიკური ინფორმაცია",
      "პუბლიკაციები",
      "მდგრადი განვითარების მიზნები",
      "კანონმდებლობა",
      "ბმულები",
    ],
  },
  EN: {
    sections: [
      "MAIN STATISTICS",
      "PUBLICATIONS",
      "SUSTAINABLE DEVELOPMENT GOALS",
      "LEGISLATION",
      "LINKS",
    ],
  },
};

const SectionTitle = ({ title }) => (
  <div className="w-full flex flex-col items-center py-6">
    <h2
      className="font-firago font-semibold"
      style={{
        fontSize: "18px",
        color: "#1a1a1a",
        fontFeatureSettings: '"case" on',
      }}
    >
      {title}
    </h2>
    <div
      style={{
        width: "60px",
        height: "2px",
        background: "#0066e0",
        marginTop: "8px",
      }}
    />
  </div>
);

const Hero = ({ currentSlide, prev, next, goTo, current, language }) => {
  return (
    <section className="w-full rounded-[30px] p-10 flex gap-8 items-center justify-between">
      {/* CENTER IMAGE + OVERLAY TEXT */}
      <div className="relative w-[65%] h-[500px] flex-shrink-0">
        <div
          className="w-full h-full rounded-[40px]"
          style={{
            backgroundImage: `url(${slides[currentSlide].src})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            transition: "background-image 0.7s ease",
          }}
        />

        {/* dark gradient for text readability */}
        <div className="absolute inset-0 rounded-[40px] bg-gradient-to-b from-black/10 via-transparent to-black/50 pointer-events-none"></div>

        {/* LEFT TEXT overlaid on image */}
        <div className="absolute bottom-12 left-6 right-6 z-10">
          <p
            className="text-white/70 mb-2 flex items-center gap-2"
            style={{ fontSize: "16px", fontWeight: "bold" }}
          >
            📊 {language === "EN" ? "INFOGRAPHICS" : "ინფოგრაფიკა"}
          </p>
          <h1
            className="text-[36px] leading-[1.1] font-bold mb-4 drop-shadow uppercase"
            style={{ color: "#0066e0" }}
          >
            {(language === "EN"
              ? slides[currentSlide].titleEN
              : slides[currentSlide].titleGE
            )
              .split("\n")
              .map((line, i) => (
                <span key={i}>
                  {line}
                  {i === 0 && <br />}
                </span>
              ))}
          </h1>
          <button
            className="flex items-center overflow-hidden rounded-full cursor-pointer"
            style={{ border: "1px solid #0066e0", background: "transparent" }}
            onClick={() =>
              window.open(
                `/coverpdf/${language === "EN" ? "eng" : "geo"}/${currentSlide + 1}.pdf`,
                "_blank",
              )
            }
          >
            <span
              className="px-5 py-1.5 font-medium"
              style={{ color: "#0066e0", fontSize: "16px", fontWeight: "bold" }}
            >
              {language === "EN" ? "See more" : "ნახვა"}
            </span>
            <span
              className="text-white flex items-center justify-center"
              style={{
                background: "#0066e0",
                fontSize: "20px",
                fontWeight: "bold",
                width: "42px",
                height: "42px",
              }}
            >
              ›
            </span>
          </button>
        </div>

        {/* Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className="w-3 h-3 rounded-full cursor-pointer transition-all"
              style={{
                background: i === current ? "#fff" : "rgba(255,255,255,0.4)",
              }}
              aria-label={`სლაიდი ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* RIGHT CARDS */}
      <div className="flex flex-col gap-6 h-[500px] w-[30%]">
        {/* CARD 1 */}
        <a
          href="https://pyramid.geostat.ge/ka/marriages"
          className="flex-1 rounded-[25px] overflow-hidden relative block"
        >
          <img
            src={marriageImg}
            alt="ქორწინების კალკულატორი"
            className="w-full h-full object-cover"
          />
          <div
            className="absolute bottom-0 w-full text-white text-sm text-center"
            style={{ background: "rgba(54, 55, 149, 0.8)", padding: "15px" }}
          >
            {language === "EN"
              ? "MARRIAGE CALCULATOR"
              : "ქორწინების კალკულატორი"}
          </div>
        </a>

        {/* CARD 2 */}
        <a
          href="/life-calculator"
          className="flex-1 rounded-[25px] overflow-hidden relative block"
        >
          <img
            src={lifeCalcImg}
            alt="სოციალური მონაცემების კალკულატორი"
            className="w-full h-full object-cover"
          />
          <div
            className="absolute bottom-0 w-full text-white text-sm text-center"
            style={{ background: "rgba(54, 55, 149, 0.8)", padding: "15px" }}
          >
            {language === "EN"
              ? "LIFE EXPECTANCY CALCULATOR"
              : "სიცოცხლის მოსალოდნელი ხანგრძლივობის კალკულატორი"}
          </div>
        </a>
      </div>
    </section>
  );
};

const Main = ({ language = "GE" }) => {
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef(null);
  const txt = t[language] ?? t.GE;

  const startAutoPlay = () => {
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 8000);
  };

  useEffect(() => {
    startAutoPlay();
    return () => clearInterval(intervalRef.current);
  }, []);

  const goTo = (index) => {
    setCurrent(index);
    clearInterval(intervalRef.current);
    startAutoPlay();
  };

  const prev = () => goTo((current - 1 + slides.length) % slides.length);
  const next = () => goTo((current + 1) % slides.length);

  return (
    <main
      className="w-full font-firago"
      style={{ fontFeatureSettings: '"case" on' }}
    >
      {/* ── HERO ── */}
      <div className="px-6 md:px-16 py-10">
        <Hero
          currentSlide={current}
          prev={prev}
          next={next}
          goTo={goTo}
          current={current}
          language={language}
        />
      </div>

      {/* ── SECTIONS ── */}
      {txt.sections.map((title, idx) => (
        <section
          key={idx}
          className="w-full py-10 px-6 md:px-16"
          style={{ borderBottom: "1px solid #e5e7eb" }}
        >
          <SectionTitle title={title} />
          <div className="mt-4 text-gray-400 text-sm italic text-center">
            {language === "GE"
              ? "კონტენტი მალე დაემატება..."
              : "Content coming soon..."}
          </div>
        </section>
      ))}
    </main>
  );
};

export default Main;
