import { createBrowserRouter } from "react-router-dom";
import Step1 from "./pages/step1";
import Step2 from "./pages/step2";
import App from "./App";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "step1",
        element: <Step1 />,
      },
      {
        path: "step2",
        element: <Step2 />,
      },
    ],
  },
]);

export default router;
