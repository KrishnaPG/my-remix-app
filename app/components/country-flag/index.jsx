import React, { useEffect } from "react";
import { appendCSSLink } from "../../utils/append-css.client";

const cssSrc = "https://cdn.jsdelivr.net/gh/lipis/flag-icons@7.1.0/css/flag-icons.min.css";

/**
 * Country Flag React Component. It uses CSS classes to display a country flag SVG.
  * The country codes can be searched here: https://www.iso.org/obp/ui/#search
 */
export default function CountryFlag({ className = "", code = "us", children, ...rest }) {
  useEffect(() => {
    // check if CDN link is already present
    const el = document.querySelector(`link[href="${cssSrc}"]`);
    // if not present, add one now for the CSS to work correctly.
    if (!el) appendCSSLink(cssSrc);
    // now, we can remove this appended css link while unmounting this component, but
    // this is just css, and no harm in leaving it there.
   }, []);
  return (
    <div className={`${className} fib fi-${code}`} {...rest}>
      {children}
    </div>
  );
}
