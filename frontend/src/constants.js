// Valorile fixe și etichetele lor, într-un singur loc.
export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";
export const COMENZI_RESOURCE = "/comenzi";

export const PAYMENT_METHODS = [
  { value: "CARD_ONLINE", label: "Card Online" },
  { value: "CASH_ON_DELIVERY", label: "Cash on Delivery" },
  { value: "APPLE_PAY", label: "Apple Pay" },
];

export const ETICHETE_PAYMENT_METHOD = Object.fromEntries(
  PAYMENT_METHODS.map((m) => [m.value, m.label])
);

export const QUANTITY_MIN = 1;
