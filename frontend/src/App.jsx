import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import OrderPage from "./pages/OrderPage.jsx";
import OrderDetaliuPage from "./pages/OrderDetaliuPage.jsx";
import DesprePage from "./pages/DesprePage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
// Harta rutelor. Layout înconjoară fiecare pagină.
export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<OrderPage />} />
        <Route path="/comenzi/:id" element={<OrderDetaliuPage />} />
        <Route path="/despre" element={<DesprePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
