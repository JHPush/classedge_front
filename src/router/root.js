import { Suspense, lazy } from "react";
import todoRouter from "./todoRouter";
import ViewPage from "../components/post/ViewPage";
import WritePage from "../components/post/WritePage"
import ModifyPage from "../components/post/ModifyPage";

const { createBrowserRouter } = require("react-router-dom");

const Loading = <div>Loading....</div>
const Home = lazy(() => import("../components/post/HomePage"))

const Login = lazy(() => import("../components/member/LoginPage"))

const Task = lazy(()=>import("../components/post/TaskPage"))


const root = createBrowserRouter([

  {
    path: "",
    element: <Suspense fallback={Loading}><Home /></Suspense>
  },
  {
    path: "task",
    element: <Suspense fallback={Loading}><Task /></Suspense>
  },
  {
    path: "login",
    element: <Suspense fallback={Loading}><Login /></Suspense>
  },
  {
    path: "view/:id",
    element: <Suspense fallback={Loading}><ViewPage /></Suspense>
  },
  {
    path: "write",
    element: <Suspense fallback={Loading}><WritePage /></Suspense>
  },
  {
    path: "modify/:id",
    element: <Suspense fallback={Loading}><ModifyPage /></Suspense>
  },




])

export default root;
