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
      className={comanda.delivered ? "order done" : "order"}
      data-testid="item"
      data-id={comanda.id}
    >
      <label className="comanda-main">
        <input
          type="checkbox"
          checked={comanda.delivered}
          onChange={() => onToggle(comanda.id)}
          data-testid="item-toggle"
        />
        <span className="name" data-testid="item-title">
          {comanda.name}
        </span>
      </label>
      <span className="tag">
        {comanda.delivered ? "Livrată" : "În livrare"}
      </span>
      <span className="restaurant">{comanda.restaurant}</span>
      <span className="tag">{comanda.payment_method}</span>
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
