import { createBrowserRouter } from "react-router-dom";
import App from "./Home";
import { ReactBeautifulDndSample } from "./ReactBeautifulDndSample";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/samples/react-beautiful-dnd",
    element: <ReactBeautifulDndSample />
  }
])
