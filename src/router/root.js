import { Suspense, lazy } from "react";
import todoRouter from "./todoRouter";

const { createBrowserRouter } = require("react-router-dom");

const Loading = <div>Loading....</div>
const Main = lazy(() => import("../pages/MainPage"))

const About = lazy(() => import("../pages/AboutPage"))

const TodoIndex = lazy(() => import("../pages/todo/IndexPage"))

const TodoList = lazy(() => import("../pages/todo/ListPage"))

const Login = lazy(() => import("../pages/todo/LoginPage"))

const root = createBrowserRouter([

  {
    path: "",
    element: <Suspense fallback={Loading}><Main /></Suspense>
  },
  {
    path: "login",
    element: <Suspense fallback={Loading}><Login /></Suspense>
  },
  {
    path: "about",
    element: <Suspense fallback={Loading}><About /></Suspense>
  },
  {
    path: "todo",
    element: <Suspense fallback={Loading}><TodoIndex /></Suspense>,
    children: todoRouter()
  }


])

export default root;
