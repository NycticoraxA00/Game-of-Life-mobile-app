import { View, Text, Image, Dimensions, TouchableWithoutFeedback, TouchableOpacity } from "react-native";
import { COLOR } from "../util/color";
import avatarImage from "../assets/IMG_20230624_235907_413.jpg";
import React from "react";
import UserInfo from "../components/MainScreen/UserInfo";
import LogInfo from "../components/MainScreen/LogInfo";
import LifeProgress from "../components/MainScreen/LifeProgress";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../store/auth-context";
import { StatContext } from "../store/stat-context";

import CareerSelection from "../components/PopupMessage/CareerSelection";

const MainScreen = () => {
  const statCtx = useContext(StatContext);
  const [overlayVisible, setOverlayVisible] = useState(false);
  
  useEffect(() => {
    if (statCtx.stage >= 3) {
      setOverlayVisible(true);
    } else {
      setOverlayVisible(false);
    }
  }, [statCtx.stage]);

  const closeOverlay = () => {
    setOverlayVisible(false);
  };

  return (
    <>
      <UserInfo />
      <LogInfo />
      <LifeProgress />
      <CareerSelection 
        visible={overlayVisible} 
        onClose={closeOverlay}
         />
    </>
  );
};
const styles={
  container:{

  }
}
export default MainScreen;