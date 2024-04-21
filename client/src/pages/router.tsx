import { createBrowserRouter } from "react-router-dom";
import App from "./Home";
import { ReactBeautifulDndSample } from "./ReactBeautifulDndSample";
import { ReactOnDragSample } from "./ReactOnDragSample";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/samples/react-beautiful-dnd",
    element: <ReactBeautifulDndSample />
  },
  {
    path: "/samples/react-on-drag",
    element: <ReactOnDragSample />
  }
])
