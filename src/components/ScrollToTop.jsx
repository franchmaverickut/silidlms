import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Resets scroll to the top of the page whenever the route path changes.
// Without this, SPA navigations from the public gallery land the new page
// at the gallery's previous scroll offset (mid-page).
export default function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}