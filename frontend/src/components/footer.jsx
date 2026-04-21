import React from "react";

const Footer = ({ language = "GE" }) => {
  const year = new Date().getFullYear();
  return (
    <footer
      className="bg-[#005c97] text-white font-firago"
      style={{ fontFeatureSettings: '"case" on' }}
    >
      {/* TOP SECTION */}
      <div className="py-12 px-6 flex flex-col md:flex-row md:justify-around gap-10 md:gap-0">
        {/* LEFT */}
        <div>
          <h3 className="font-semibold text-lg mb-4">საკონტაქტო ინფორმაცია</h3>

          <p style={{ fontSize: "12px", fontWeight: 400, lineHeight: "30px" }}>
            საქართველოს სტატისტიკის ეროვნული სამსახური
          </p>
          <p style={{ fontSize: "12px", fontWeight: 400, lineHeight: "30px" }}>
            (+995 32) 236 72 10, (+995 32) 260 11 60
          </p>
          <p style={{ fontSize: "12px", fontWeight: 400, lineHeight: "30px" }}>
            info@geostat.ge
          </p>
          <p
            style={{ fontSize: "12px", fontWeight: 400, lineHeight: "30px" }}
            className="mb-6"
          >
            ცოტნე დადიანის ქ. 30, თბილისი, 0180
          </p>

          <h4 className="font-semibold mb-3">სოციალური ქსელები</h4>
          <div className="flex gap-4 text-lg">
            <span className="cursor-pointer">f</span>
            <span className="cursor-pointer">X</span>
            <span className="cursor-pointer">in</span>
          </div>
        </div>

        {/* CENTER */}
        <div>
          <h6 className="font-semibold text-lg mb-4">მენიუ</h6>

          <ul className="space-y-0">
            <li
              className="hover:underline cursor-pointer"
              style={{ fontSize: "12px", fontWeight: 400, lineHeight: "30px" }}
            >
              სტატისტიკური ინფორმაცია
            </li>
            <li
              className="hover:underline cursor-pointer"
              style={{ fontSize: "12px", fontWeight: 400, lineHeight: "30px" }}
            >
              პუბლიკაციები
            </li>
            <li
              className="hover:underline cursor-pointer"
              style={{ fontSize: "12px", fontWeight: 400, lineHeight: "30px" }}
            >
              კანონმდებლობა
            </li>
            <li
              className="hover:underline cursor-pointer"
              style={{ fontSize: "12px", fontWeight: 400, lineHeight: "30px" }}
            >
              ბმულები
            </li>
            <li
              className="hover:underline cursor-pointer"
              style={{ fontSize: "12px", fontWeight: 400, lineHeight: "30px" }}
            >
              გლოსარიუმი
            </li>
            <li
              className="hover:underline cursor-pointer"
              style={{ fontSize: "12px", fontWeight: 400, lineHeight: "30px" }}
            >
              ინფოგრაფიკა
            </li>
          </ul>
        </div>

        <div className="text-center md:text-left">
          <h3 className="font-semibold text-lg mb-4">
            მონაცემთა გამოყენების პირობები
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
          ყველა უფლება დაცულია © საქსტატი {year}
        </p>
        <p
          style={{
            textAlign: "center",
            fontSize: "0.7rem",
            fontWeight: "normal",
          }}
        >
          პორტალი შეიქმნა გაეროს ბავშვთა ფონდის (UNICEF) ტექნიკური და ფინანსური
          მხარდაჭერით.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
