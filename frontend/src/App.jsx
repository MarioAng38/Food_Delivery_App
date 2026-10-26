import OrderList from "./components/OrderList.tsx";
import { useEffect, useState } from "react";

const initialComenzi = [
	{ id: 1, name: "Pizza Margherita x2", delivered: false, payment_method: "CARD_ONLINE", restaurant: "Pizza Napoli" },
	{ id: 2, name: "Sushi Platter (24 pcs)", delivered: true, payment_method: "CASH_ON_DELIVERY", restaurant: "Sushi Zen" },
	{ id: 3, name: "Double Cheeseburger + Fries", delivered: false, payment_method: "APPLE_PAY", restaurant: "Burger House" },
];

export default function App() {
  const [comenzi, setComenzi] = useState(initialComenzi);
  const [tema, setTema] = useState(temaInitiala);
  const active = comenzi.filter((comanda) => !comanda.delivered).length;

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleSystemThemeChange = (event) => {
      if (!document.documentElement.hasAttribute("data-theme")) {
        setTema(event.matches ? "dark" : "light");
      }
    };

    mediaQuery.addEventListener("change", handleSystemThemeChange);
    return () => mediaQuery.removeEventListener("change", handleSystemThemeChange);
  }, []);

  function handleToggle(id) {
    setComenzi((prev) =>
      prev.map((t) => (t.id === id ? { ...t, delivered: !t.delivered } : t))
    );
  }
  function handleDelete(id) {
    setComenzi((prev) => prev.filter((t) => t.id !== id));
  }

  function temaInitiala() {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  function handleTema() {
    const noua = tema === "dark" ? "light" : "dark";
    setTema(noua);
    document.documentElement.dataset.theme = noua;
  }

  return (
    <>
      <header className="topbar app-header">
        <button
          type="button"
          className="theme-toggle"
          onClick={handleTema}
          aria-pressed={tema === "dark"}
        >
          {tema === "dark" ? "Mod luminos" : "Mod întunecat"}
        </button>
        <h1>Food Delivery App</h1>
        <p className="user">Comenzile mele</p>
      </header>
      <main className="container">
        <section className="card">
          <div className="list-header">
            <h2>Comenzi</h2>
            <p className="summary">
              {comenzi.length} comenzi, dintre care {active} nelivrate
            </p>
          </div>
          <OrderList
            comenzi={comenzi}
            onToggle={handleToggle}
            onDelete={handleDelete}
          />
        </section>
      </main>
    </>
  );
}