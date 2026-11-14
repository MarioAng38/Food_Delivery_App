import { useState, type FormEvent } from "react";
import type { Order } from "./OrderCard.tsx";

const PAYMENT_METHODS = [
  { value: "CARD_ONLINE", label: "Card Online" },
  { value: "CASH_ON_DELIVERY", label: "Cash on Delivery" },
  { value: "APPLE_PAY", label: "Apple Pay" },
];

const QUANTITY_MIN = 1;

type OrderFormProps = {
  onAdd: (comanda: Omit<Order, "id">) => Promise<void>;
};

export default function OrderForm({ onAdd }: OrderFormProps) {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(QUANTITY_MIN);
  const [delivered, setDelivered] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(PAYMENT_METHODS[0].value);
  const [restaurant, setRestaurant] = useState("");
  const [error, setError] = useState("");
  const [trimit, seTrimite] = useState(false);

  function valideazaFormular() {
    const numeTrimmed = name.trim();
    const restaurantTrimmed = restaurant.trim();
    if (numeTrimmed === "") {
      return "Numele comenzii nu poate fi gol.";
    }
    if (numeTrimmed.length > 100) {
      return "Numele comenzii nu poate depăși 100 de caractere.";
    }
    if (restaurantTrimmed === "") {
      return "Numele restaurantului nu poate fi gol.";
    }
    if (!Number.isInteger(quantity) || quantity < QUANTITY_MIN) {
      return `Cantitatea trebuie să fie un număr întreg de cel puțin ${QUANTITY_MIN}.`;
    }
    return null;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const mesaj = valideazaFormular();
    if (mesaj) {
      setError(mesaj);
      return;
    }
    setError("");
    seTrimite(true);

    try {
      await onAdd({
        name: name.trim(),
        quantity: quantity,
        delivered: delivered,
        payment_method: paymentMethod,
        restaurant: restaurant.trim(),
      });
      setName("");
      setQuantity(QUANTITY_MIN);
      setDelivered(false);
      setPaymentMethod(PAYMENT_METHODS[0].value);
      setRestaurant("");
      setError("");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Eroare necunoscută.";
      setError(`A apărut o eroare la adăugarea comenzii: ${message}`);
    } finally {
      seTrimite(false);
    }
  }

  return (
    <form
      className="order-form"
      onSubmit={handleSubmit}
      noValidate
      data-testid="form"
    >
      <label>
        Nume:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          minLength={1}
          maxLength={100}
          aria-invalid={Boolean(error)}
          data-testid="form-title"
        />
      </label>
      <label>
        Cantitate:
        <input
          type="number"
          value={quantity}
          onChange={(e) =>
            setQuantity(parseInt(e.target.value) || QUANTITY_MIN)
          }
          min={QUANTITY_MIN}
          aria-invalid={Boolean(error)}
          data-testid="form-quantity"
        />
      </label>
      <label>
        Livrat:
        <input
          type="checkbox"
          checked={delivered}
          onChange={(e) => setDelivered(e.target.checked)}
          data-testid="form-delivered"
        />
      </label>
      <label>
        Metoda de Plată:
        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          data-testid="form-payment_method"
        >
          {PAYMENT_METHODS.map((method) => (
            <option key={method.value} value={method.value}>
              {method.label}
            </option>
          ))}
        </select>
      </label>
      <label>
        Restaurant:
        <input
          type="text"
          value={restaurant}
          onChange={(e) => setRestaurant(e.target.value)}
          data-testid="form-restaurant"
        />
      </label>
      {error && (
        <p className="error" data-testid="form-error">
          {error}
        </p>
      )}
      <button type="submit" disabled={trimit} data-testid="form-submit">
        {trimit ? "Se trimite..." : "Adaugă Comandă"}
      </button>
    </form>
  );
}
