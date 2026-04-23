import React, { useMemo, useState } from "react";
import inf1 from "../../assets/images/infographics-1.jpg";
import inf2 from "../../assets/images/infographics-2.jpg";
import inf3 from "../../assets/images/infographics-3.jpg";
import inf4 from "../../assets/images/infographics-4.jpg";
import inf5 from "../../assets/images/infographics-5.jpg";
import inf6 from "../../assets/images/infographics-6.jpg";
import inf7 from "../../assets/images/infographics-7.jpg";
import inf8 from "../../assets/images/infographics-8.jpg";
import inf9 from "../../assets/images/infographics-9.jpg";
import inf10 from "../../assets/images/infographics-10.jpg";

const Infographic = ({ language }) => {
  const [hovered, setHovered] = useState(-1);

  const cards = useMemo(
    () => [
      { id: 1, ge: "მოსახლეობა", en: "Population", bg: inf1 },
      { id: 2, ge: "ჯანმრთელობის დაცვა", en: "Health Care", bg: inf2 },
      { id: 3, ge: "განათლება", en: "Education", bg: inf3 },
      { id: 4, ge: "სოციალური უზრუნველყოფა", en: "Social Protection", bg: inf4 },
      { id: 5, ge: "ცხოვრების დონე", en: "Living Standards", bg: inf5 },
      { id: 6, ge: "დასაქმება", en: "Employment", bg: inf6 },
      { id: 7, ge: "საინფორმაციო და საკომუნიკაციო ტექნოლოგიები", en: "ICT", bg: inf7 },
      { id: 8, ge: "სამართალდარღვევები", en: "Offences", bg: inf8 },
      { id: 9, ge: "ტურიზმი", en: "Tourism", bg: inf9 },
      { id: 10, ge: "ეროვნული ანგარიშები", en: "National Accounts", bg: inf10 },
    ],
    [],
  );

  return (
    <div className="w-full px-4 py-10">
      <div className="w-full max-w-[1400px] mx-auto">
        <h2
          className="font-bold mb-8 text-center"
          style={{
            fontSize: "30px",
            color: "#37496d",
            fontFeatureSettings: '"case" on',
            fontFamily: "FiraGO",
          }}
        >
          {language === "EN" ? "Infographics" : "ინფოგრაფიკა"}
        </h2>

        <div className="flex justify-center mb-10">
          <svg width="70" height="1" viewBox="0 0 70 1" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line y1="0.5" x2="70" y2="0.5" stroke="black" />
          </svg>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 justify-items-center">
          {cards.map((card, index) => (
            <div
              key={card.id}
              onMouseEnter={() => setHovered(index)}
              onMouseLeave={() => setHovered(-1)}
              style={{
                width: "100%",
                maxWidth: "411px",
                minHeight: "459px",
                borderRadius: "24px",
                backgroundImage: `url(${card.bg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                boxShadow:
                  hovered === index
                    ? "4px 4px 60px 0 rgba(61,61,62,0.1), 0 -150px 30px 3px rgba(0,0,0,0.3) inset, 0 0 10px rgba(0,0,0,0.7)"
                    : "4px 4px 60px 0 rgba(61,61,62,0.1), 0 -150px 30px 3px rgba(0,0,0,0.3) inset",
                transform: hovered === index ? "translateY(-10px)" : "translateY(0)",
                transition: "all 0.5s",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "0 20px" }}>
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    border: "2px solid #fff",
                    color: "#fff",
                    fontSize: "18px",
                    fontWeight: 700,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {card.id}
                </div>
                <h5
                  style={{
                    color: "#fff",
                    fontFeatureSettings: '"case" on',
                    fontFamily: "FiraGO",
                    fontSize: "24px",
                    fontWeight: 700,
                    lineHeight: "1.2",
                    margin: 0,
                  }}
                >
                  {language === "EN" ? card.en : card.ge}
                </h5>
              </div>

              <button
                onClick={() =>
                  window.open(
                    `/coverpdf/${language === "EN" ? "eng" : "geo"}/${card.id}.pdf`,
                    "_blank",
                  )
                }
                className="cursor-pointer"
                style={{
                  borderRadius: "18px",
                  background: "#fff",
                  color: "#37496d",
                  textAlign: "center",
                  fontFeatureSettings: '"case" on',
                  fontFamily: "FiraGO",
                  fontSize: "18px",
                  fontWeight: 700,
                  padding: "20px",
                  margin: "20px",
                  border: "none",
                }}
              >
                {language === "EN" ? "View" : "ნახვა"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Infographic;