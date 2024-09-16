import { useEffect } from "react";

export default function useReferrer() {
  useEffect(() => {
    if (typeof window === "undefined" || !document.referrer) return;

    const url = new URL(document.referrer);
    const domain = url.hostname;

    // Check if the domain ends with runpod.io or its subdomains
    const isRunpodDomain = /(\.|^)runpod\.io$/.test(domain);

    if (isRunpodDomain) {
      window.localStorage.setItem("internal_referrer_link", document.referrer);
    } else {
      window.localStorage.setItem("referrer_link", document.referrer);
    }
  }, [document.referrer]);

  return;
}
