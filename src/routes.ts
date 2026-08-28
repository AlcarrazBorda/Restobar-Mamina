import { createBrowserRouter } from "react-router";
import Root from "./layouts/Root";
import Inicio from "./pages/Inicio";
import Galeria from "./pages/Galeria";
import Carta from "./pages/Carta";
import Reservas from "./pages/Reservas";
import Contacto from "./pages/Contacto";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Inicio },
      { path: "galeria", Component: Galeria },
      { path: "carta", Component: Carta },
      { path: "reservas", Component: Reservas },
      { path: "contacto", Component: Contacto },
    ],
  },
]);
