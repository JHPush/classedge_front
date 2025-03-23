import { Suspense, lazy } from "react";
import todoRouter from "./todoRouter";
import ViewPage from "../components/common/ViewPage";
import WritePage from "../components/common/WritePage"

const { createBrowserRouter } = require("react-router-dom");

const Loading = <div>Loading....</div>
const Main = lazy(() => import("../components/common/MainPage"))

const About = lazy(() => import("../components/common/AboutPage"))

const TodoIndex = lazy(() => import("../pages/todo/IndexPage"))

const TodoList = lazy(() => import("../pages/todo/ListPage"))

const Login = lazy(() => import("../components/member/LoginPage"))

const PostView = lazy(() => import("../components/post/PostView"))
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
    children: todoRouter(),
  },
  {
    path: "view/:id",
    element: <Suspense fallback={Loading}><ViewPage /></Suspense>
  },
  {
    path: "write",
    element: <Suspense fallback={Loading}><WritePage /></Suspense>
  },


])

export default root;
