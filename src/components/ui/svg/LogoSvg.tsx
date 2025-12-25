import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

const SvgComponent = (props: SvgProps) => (
  <Svg
    width={40}
    height={40}
    viewBox="0 0 24 24" 
    fill="none"
    {...props}
  >
    <Path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M12 22.92c5.523 0 10-4.477 10-10s-4.477-10-10-10-10 4.477-10 10 4.477 10 10 10Z"
    />
    <Path
      fill="#fff"
      d="M12.7 17.11v1.1a.67.67 0 1 1-1.34 0v-1.13a3.39 3.39 0 0 1-2.22-1.39.7.7 0 0 1-.15-.42.641.641 0 0 1 .67-.64.58.58 0 0 1 .45.21c.32.418.754.734 1.25.91v-2.54c-1.33-.52-2-1.3-2-2.31a2.27 2.27 0 0 1 2-2.17v-1.1a.67.67 0 0 1 1.34 0v1.09a2.8 2.8 0 0 1 1.86 1.16.68.68 0 0 1 .16.4.64.64 0 0 1-.64.66.619.619 0 0 1-.47-.22 2.12 2.12 0 0 0-.91-.66v2.25l.25.1c1.27.5 2.06 1.22 2.06 2.36a2.4 2.4 0 0 1-2.31 2.34Zm-1.34-5.38V10.1a.82.82 0 0 0-.54.79.91.91 0 0 0 .54.84Zm2.19 3.07c0-.48-.33-.77-.85-1v2a1 1 0 0 0 .85-1Z"
    />
  </Svg>
);

export default SvgComponent;
