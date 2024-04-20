import { createBrowserRouter } from "react-router-dom";
import { Canvas } from "./Canvas";
import App from "./Home";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/canvas",
    element: <Canvas />
  }
])
