import { createBrowserRouter } from "react-router-dom";
import App from "./Home";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  }
])
