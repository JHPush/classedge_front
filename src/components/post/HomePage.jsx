import { useNavigate } from "react-router-dom";
import BasicLayout from "../common/BasicLayout";
import { useEffect, useState } from "react";
import { getCookie } from "../../utils/cookieUtils";
import { useSelector } from "react-redux";
import HomePageComponent from "./HomePageComponent";

const HomePage = () => {


  return (
    <BasicLayout>

      <div className=" text-3xl">🏠 홈페이지</div>
    <HomePageComponent/>
    </BasicLayout>
  );
}

export default HomePage;
