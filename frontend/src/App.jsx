import { fetchComenzi } from "./api.js";
import OrderList from "./components/OrderList.tsx";
import { useEffect, useState } from "react";

export default function App() {
  const [comenzi, setComenzi] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tema, setTema] = useState(temaInitiala);
  const active = comenzi.filter((comanda) => !comanda.delivered).length;

  useEffect(() => {
    let ignore = false;
    async function loadComenzi() {
      try {
        const data = await fetchComenzi();
        if (!ignore) {
          setComenzi(data);
        }
      } catch (err) {
        if (!ignore) {
          setError(err.message);
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    loadComenzi();

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleSystemThemeChange = (event) => {
      if (!document.documentElement.hasAttribute("data-theme")) {
        setTema(event.matches ? "dark" : "light");
      }
    };

    mediaQuery.addEventListener("change", handleSystemThemeChange);
    return () => {
      ignore = true;
      mediaQuery.removeEventListener("change", handleSystemThemeChange);
    };
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
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
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
          {loading && <p className="info">Se încarcă...</p>}
          {error && (
            <p className="error">
              Nu am putut încărca datele: {error}. Rulează{" "}
              <code>npm run api</code>?
            </p>
          )}
          {!loading && !error && (
            <OrderList
              comenzi={comenzi}
              onToggle={handleToggle}
              onDelete={handleDelete}
            />
          )}
        </section>
      </main>
    </>
  );
}
