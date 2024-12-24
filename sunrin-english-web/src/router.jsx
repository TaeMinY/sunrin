import { createBrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import SignIn from "./pages/SignIn.jsx";
import SignUp from "./pages/SIgnUp.jsx";
import TodayWord from "./pages/TodayWord.jsx";
import Voca from "./pages/Voca.jsx";
import More from "./pages/More.jsx";
import MenuLayout from "./layouts/MenuLayout.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      // 라우터 연결
      {
        path: "signin",
        element: <SignIn></SignIn>,
      },
      {
        path: "signup",
        element: <SignUp></SignUp>,
      },
      {
        path: "",
        element: <MenuLayout></MenuLayout>,
        children: [
          {
            path: "",
            element: <TodayWord></TodayWord>,
          },
          {
            path: "voca",
            element: <Voca></Voca>,
          },
          {
            path: "more",
            element: <More></More>,
          },
        ],
      },
    ],
  },
]);

export default router;
