import { createBrowserRouter } from "react-router-dom";
import App from "./Home";
import { ReactBeautifulDndSample } from "./ReactBeautifulDndSample";
import { ReactOnDragSample } from "./ReactOnDragSample";
import { ZodSample } from "./ZodSample";

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
  },
  {
    path: "/samples/zod",
    element: <ZodSample />
  }
])
