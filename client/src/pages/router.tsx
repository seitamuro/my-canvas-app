import { createBrowserRouter } from "react-router-dom";
import { SampleCanvas } from "./DnDCanvas";
import App from "./Home";
import { MouseClickCanvasSample } from "./MouseClickCanvas";
import { ReactBeautifulDndSample } from "./ReactBeautifulDndSample";
import { ReactFlowSample } from "./ReactFlowSample";
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
  },
  {
    path: "/samples/canvas",
    element: <SampleCanvas />
  },
  {
    path: "/samples/mouse-click-canvas",
    element: <MouseClickCanvasSample />
  },
  {
    path: "/samples/react-flow",
    element: <ReactFlowSample />
  }
])
