
import { useEffect, useRef } from "react";
import { useLocation } from "react-router";

export default function RouteFocusManager() {
  const location = useLocation();
  const previousPath = useRef(location.pathname);

  useEffect(() => {
    if (previousPath.current !== location.pathname) {
      previousPath.current = location.pathname;

      document.getElementById("main-content")?.focus();
    }
  }, [location.pathname]);

  return null;
}
