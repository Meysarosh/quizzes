import router from "./router/AppRouter.jsx";
import { RouterProvider } from "react-router-dom";

export default function App() {
  return <RouterProvider router={router}></RouterProvider>;
}
