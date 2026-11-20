import OrderCard, { type Order } from "./OrderCard.tsx";
import styles from "./OrderList.module.css";

type OrderListProps = {
  comenzi: Order[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
};

export default function OrderList({
  comenzi,
  onToggle,
  onDelete,
}: OrderListProps) {
  if (comenzi.length === 0) {
    return (
      <p className="empty-state" data-testid="empty">
        Nu există nicio comandă.
      </p>
    );
  }

  return (
    <ul className={styles.list}>
      {comenzi.map((comanda) => (
        <OrderCard
          key={comanda.id}
          comanda={comanda}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}
