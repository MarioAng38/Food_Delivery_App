import { Link } from "react-router-dom";
import { ETICHETE_PAYMENT_METHOD } from "../constants.js";
import styles from "./OrderCard.module.css";

export type Order = {
  id: number;
  name: string;
  quantity: number;
  delivered: boolean;
  payment_method: string;
  restaurant: string;
};

type OrderCardProps = {
  comanda: Order;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
};

export default function OrderCard({
  comanda,
  onToggle,
  onDelete,
}: OrderCardProps) {
  return (
    <li
      className={
        comanda.delivered ? `${styles.card} ${styles.done}` : styles.card
      }
      data-testid="item"
      data-id={comanda.id}
    >
      <div className={styles.main}>
        <input
          type="checkbox"
          checked={comanda.delivered}
          onChange={() => onToggle(comanda.id)}
          aria-label={`Marchează ${comanda.name}`}
          data-testid="item-toggle"
        />
        <div>
          <Link
            to={`/comenzi/${comanda.id}`}
            className={styles.title}
            data-testid="item-link"
          >
            {comanda.name}
          </Link>
          <span className={styles.tag}>
            {comanda.delivered ? "Livrată" : "În livrare"}
          </span>
          <span className={styles.restaurant}>{comanda.restaurant}</span>
          <span className={styles.tag}>
            {ETICHETE_PAYMENT_METHOD[comanda.payment_method] ??
              comanda.payment_method}
          </span>
        </div>
      </div>
      <button
        type="button"
        className="btn-danger"
        aria-label={`Sterge comanda ${comanda.name}`}
        onClick={() => onDelete(comanda.id)}
        data-testid="item-delete"
      >
        Șterge
      </button>
    </li>
  );
}
