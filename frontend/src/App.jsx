import OrderList from "./components/OrderList.tsx";
import { useEffect, useState } from "react";
import OrderForm from "./components/OrderForm.tsx";
import {
  fetchComenzi,
  createComanda,
  updateComanda,
  deleteComanda,
} from "./api.js";

export default function App() {
  const [comenzi, setComenzi] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionError, setActionError] = useState(null);
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

  async function handleToggle(id) {
    const comanda = comenzi.find((t) => t.id === id);
    if (!comanda) return;

    try {
      const actualizat = await updateComanda(id, {
        delivered: !comanda.delivered,
      });
      setComenzi((prev) => prev.map((t) => (t.id === id ? actualizat : t)));
      setActionError(null);
    } catch (err) {
      setActionError(`Nu am putut actualiza comanda: ${err.message}`);
    }
  }

  async function handleDelete(id) {
    try {
      await deleteComanda(id);
      setComenzi((prev) => prev.filter((t) => t.id !== id));
      setActionError(null);
    } catch (err) {
      setActionError(`Nu am putut șterge comanda: ${err.message}`);
    }
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

  async function handleAdd(comanda) {
    const creat = await createComanda(comanda);
    setComenzi((prev) => [...prev, creat]);
    setActionError(null);
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
      </header>
      <main className="container">
        <section className="panel">
          <h2>Adaugă comanda</h2>
          <OrderForm onAdd={handleAdd} />
        </section>
        <section className="panel">
          <div className="list-header">
            <h2>Comenzile mele</h2>
            <p className="summary">
              {comenzi.length} comenzi, dintre care {active} nelivrate
            </p>
          </div>
          {actionError && (
            <p className="error" data-testid="action-error">
              {actionError}
            </p>
          )}
          {loading && (
            <p className="info" data-testid="loading">
              Se încarcă...
            </p>
          )}
          {error && (
            <p className="error" data-testid="error">
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
