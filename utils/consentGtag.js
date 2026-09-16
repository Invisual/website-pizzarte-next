export function ConsentGtag() {
  if (typeof window !== "undefined" && typeof window.gtag !== "undefined") {
    window.gtag("consent", "update", { analytics_storage: "granted" });
    window.gtag("consent", "update", { ad_storage: "granted" });
  }
}
