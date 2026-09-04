import React from "react";
import styles from "../../styles/styles";

const brandLogos = [
  "https://upload.wikimedia.org/wikipedia/commons/c/ca/Sony_logo.svg",
  "https://www.logo.wine/a/logo/Dell/Dell-Logo.wine.svg",
  "https://www.logo.wine/a/logo/Adidas/Adidas-Logo.wine.svg",
  "https://www.logo.wine/a/logo/Mulberry_(company)/Mulberry_(company)-Logo.wine.svg",
  "https://www.logo.wine/a/logo/HP_Inc./HP_Inc.-Logo.wine.svg",
  "https://www.logo.wine/a/logo/Christian_Dior_(fashion_house)/Christian_Dior_(fashion_house)-Logo.wine.svg",
  "https://www.logo.wine/a/logo/Puma_(brand)/Puma_(brand)-Logo.wine.svg",
];

// Duplicate the list so the marquee loop is seamless
const loopLogos = [...brandLogos, ...brandLogos];

const Sponsored = () => {
  return (
    <div
      className={`${styles.section} hidden sm:block bg-white py-8 px-5 mb-10 rounded-2xl overflow-hidden`}
    >
      <div className="flex overflow-hidden mask-[linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="flex items-center gap-16 animate-marquee shrink-0">
          {loopLogos.map((logo, index) => (
            <img
              key={index}
              src={logo}
              alt=""
              className="h-20 w-32 object-contain  opacity-60 hover:opacity-100 hover:grayscale-0 transition-all duration-300 cursor-pointer shrink-0"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sponsored;
