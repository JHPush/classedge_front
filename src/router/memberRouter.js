import { Suspense, lazy } from "react";
import { Navigate } from "react-router-dom";

const Loading = <div>Loading....</div>
const SignUp = lazy(() => import("../components/member/SignupPage"))

const memberRouter = () => {

    return [
        {
            // path: "signup",
            // element: <Suspense fallback={Loading}><SignUp /></Suspense>
        }
    ]

}

export default memberRouter;
