import { ConsentGtag } from "./consentGtag";

export const HandlePhone = (phoneNumber) => {
  ConsentGtag();

  if (typeof window === "undefined") return;

  let tipoChamada = "desconhecido";
  const cleanPhoneNumber = phoneNumber.replace(/^tel:/, "");

  if (cleanPhoneNumber.startsWith("+3512")) {
    tipoChamada = "fixo";
  } else if (cleanPhoneNumber.startsWith("+3519")) {
    tipoChamada = "móvel";
  }

  if (typeof window.gtag !== "undefined") {
    window.gtag("event", "chamadas", { tipo_chamada: tipoChamada });
  }

  window.open(phoneNumber, "_self", "noreferrer");
};
