import * as React from "react";

function AboutIcon({ stroke = "#6C7281", ...rest }) {
  return (
    <svg
      width={24}
      height={24}
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <path
        d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z"
        stroke={stroke}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 8h.01M11 12h1v4h1"
        stroke={stroke}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default AboutIcon;
