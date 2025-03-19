import { configureStore } from "@reduxjs/toolkit";
import loginSlicer from "./slicer/loginSlicer"

const store = configureStore({
    reducer:{
        "loginSlicer" : loginSlicer
    }
})

export default store;