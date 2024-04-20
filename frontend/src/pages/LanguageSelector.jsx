// import { LANGUAGE_VERSIONS } from "../constants";

// const languages = Object.entries(LANGUAGE_VERSIONS);
// const ACTIVE_COLOR = "blue-400";

// const LanguageSelector = ({ language, onSelect }) => {
//   return (
//     <div className="ml-2 mb-4">
//       <div className="text-lg mb-2">Language:</div>
//       <div className="relative">
//         <button className="btn btn-primary">{language}</button>
//         <div className="absolute top-full left-0 w-full mt-1 bg-dark bg-opacity-80 border border-gray-700 rounded-md shadow-lg">
//           {languages.map(([lang, version]) => (
//             <button
//               key={lang}
//               className={`flex items-center justify-between w-full px-4 py-2 text-white ${
//                 lang === language
//                   ? `bg-gray-900 text-${ACTIVE_COLOR}`
//                   : "hover:bg-gray-900"
//               }`}
//               onClick={() => onSelect(lang)}
//             >
//               <span>{lang}</span>
//               <span className="text-sm text-gray-600">({version})</span>
//             </button>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LanguageSelector;
import { useState } from "react";
import { LANGUAGE_VERSIONS } from "../constants";

const languages = Object.entries(LANGUAGE_VERSIONS);
const ACTIVE_COLOR = "blue-400";

const LanguageSelector = ({ language, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative ml-2 mb-4">
      <div className="text-lg mb-2">Language:</div>
      <div>
        <button
          className="btn btn-primary"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen ? "true" : "false"}
        >
          {language}
        </button>
        {isOpen && (
          <div className="relative z-0 top-full left-0 mt-1 bg-dark bg-opacity-100 border border-gray-700 rounded-md shadow-lg">
            {languages.map(([lang, version]) => (
              <button
                key={lang}
                className={`flex items-center justify-between w-full px-4 py-2 text-white ${
                  lang === language
                    ? `bg-gray-900 text-${ACTIVE_COLOR}`
                    : "hover:bg-gray-900"
                }`}
                onClick={() => {
                  onSelect(lang);
                  setIsOpen(false);
                }}
              >
                <span>{lang}</span>
                <span className="text-sm text-gray-600">({version})</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LanguageSelector;
