import React from "react";

const CreditCard = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 40 24" fill="none" {...props}>
    <path
      d="M0 2C0 0.89543 0.895431 0 2 0H38C39.1046 0 40 0.895431 40 2V22C40 23.1046 39.1046 24 38 24H2C0.895431 24 0 23.1046 0 22V2Z"
      fill="#F0F2F5"
    />
    <rect x="4" y="6" width="9" height="6" rx="1" fill="white" />
    <rect x="4" y="16" width="6" height="3" rx="1" fill="#C9D3DC" />
    <rect x="12" y="16" width="6" height="3" rx="1" fill="#C9D3DC" />
    <rect x="20" y="16" width="6" height="3" rx="1" fill="#C9D3DC" />
    <rect x="28" y="16" width="6" height="3" rx="1" fill="#C9D3DC" />
  </svg>
);

export default CreditCard;
