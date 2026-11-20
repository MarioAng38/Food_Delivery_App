import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchComanda } from "../api.js";
import { ETICHETE_PAYMENT_METHOD } from "../constants.js";
import styles from "./OrderDetaliuPage.module.css";

export default function OrderDetaliuPage() {
  const { id } = useParams(); // text din URL, de exemplu "3"
  const [comanda, setComanda] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // Se reîncarcă dacă se schimbă id-ul din adresă
  useEffect(() => {
    let ignore = false;
    fetchComanda(id)
      .then((data) => {
        if (!ignore) {
          setComanda(data);
          setError(null); // o eroare de la un id anterior nu mai este valabilă
        }
      })
      .catch((err) => {
        if (!ignore) setError(err.message);
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });
    return () => {
      ignore = true;
    };
  }, [id]);
  if (loading) {
    return (
      <p className="info" data-testid="loading">
        Se încarcă...
      </p>
    );
  }
  if (error) {
    return (
      <section className="panel">
        <p className="error" data-testid="error">
          Comanda nu a putut fi încărcată: {error}
        </p>
        <Link to="/">Înapoi la listă</Link>
      </section>
    );
  }
  return (
    <section className={`panel ${styles.detail}`} data-testid="detail">
      <Link to="/" className={styles.back}>
        Înapoi la listă
      </Link>
      <h2
        className={comanda.delivered ? styles.done : undefined}
        data-testid="detail-title"
      >
        {comanda.name}
      </h2>
      <dl className={styles.fields}>
        <dt>Restaurant</dt>
        <dd>{comanda.restaurant}</dd>
        <dt>Cantitate</dt>
        <dd>{comanda.quantity}</dd>
        <dt>Metodă de plată</dt>
        <dd>
          {ETICHETE_PAYMENT_METHOD[comanda.payment_method] ??
            comanda.payment_method}
        </dd>
        <dt>Status</dt>
        <dd>{comanda.delivered ? "Livrată" : "În livrare"}</dd>
        <dt>ID</dt>
        <dd>{comanda.id}</dd>
      </dl>
    </section>
  );
}
