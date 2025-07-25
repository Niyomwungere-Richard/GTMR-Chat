import { type SVGProps } from "react";

export function ConnectSphereLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
      <path d="M12 2c-3.33 0-6.25 2-7.5 4.5" />
      <path d="M19.5 19.5c-1.25-2.5-4.17-4.5-7.5-4.5" />
      <path d="M12 15c3.33 0 6.25-2 7.5-4.5" />
      <path d="M4.5 4.5c1.25 2.5 4.17 4.5 7.5 4.5" />
    </svg>
  );
}
