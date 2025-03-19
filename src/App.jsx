import { RouterProvider } from "react-router-dom";
import root from "./router/root";

function App() {
  return (
    <RouterProvider router={root} /> // RouterProvider 는 하나만 사용가능, totoRouter를 루트에 합쳐야하나?
  );
}

export default App;
