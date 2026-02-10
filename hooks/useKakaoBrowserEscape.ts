import { useEffect } from "react";

export const useKakaoBrowserEscape = () => {
  useEffect(() => {
    // Only run on client
    if (typeof window === "undefined") return;

    const userAgent = navigator.userAgent.toLowerCase();

    // Check if it's KakaoTalk in-app browser
    if (userAgent.includes("kakaotalk")) {
      // Force open in external browser
      // This is the standard scheme for KakaoTalk to open URLs externally
      location.href =
        "kakaotalk://web/openExternal?url=" + encodeURIComponent(location.href);
    }
  }, []);
};
