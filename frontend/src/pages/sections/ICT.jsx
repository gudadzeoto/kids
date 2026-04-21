import React from "react";
import slideImg from "../../assets/images/slide-7.png";

const ICT = ({ language }) => {
  return (
    <div className="w-full max-w-screen-2xl mx-auto px-4 py-10">
      <div style={{ position: "relative", width: "100%" }}>
        <img
          src={slideImg}
          alt={language === "EN" ? "ICT" : "საინფ. და საკომ. ტექნოლოგიები"}
          style={{ width: "100%", height: "auto", display: "block" }}
        />
        <button
          className="flex items-center overflow-hidden rounded-full cursor-pointer"
          style={{ position: "absolute", bottom: "20px", left: "20px", border: "1px solid #0066e0", background: "transparent" }}
          onClick={() =>
            window.open(
              `/coverpdf/${language === "EN" ? "eng" : "geo"}/7.pdf`,
              "_blank",
            )
          }
        >
          <span
            className="px-5 py-1.5 font-medium"
            style={{ color: "#0066e0", fontSize: "16px", fontWeight: "bold", fontFamily: "FiraGO" }}
          >
            {language === "EN" ? "See more" : "ნახვა"}
          </span>
          <span
            className="text-white flex items-center justify-center"
            style={{ background: "#0066e0", fontSize: "20px", fontWeight: "bold", width: "42px", height: "42px" }}
          >
            ›
          </span>
        </button>
      </div>

      <h2
        className="font-bold mt-8 mb-4"
        style={{
          fontSize: "30px",
          color: "#37496d",
          textAlign: "center",
          fontFeatureSettings: '"case" on',
          fontFamily: "FiraGO",
        }}
      >
        {language === "EN" ? "ICT" : "საინფ. და საკომ. ტექნოლოგიები"}
      </h2>

      <div className="flex justify-center">
        <svg width="70" height="1" viewBox="0 0 70 1" fill="none" xmlns="http://www.w3.org/2000/svg">
          <line y1="0.5" x2="70" y2="0.5" stroke="black" />
        </svg>
      </div>
    </div>
  );
};

export default ICT;
