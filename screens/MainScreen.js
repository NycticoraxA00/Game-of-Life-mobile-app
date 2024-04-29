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
import EndGame from "../components/PopupMessage/EndGame";

const MainScreen = () => {
  const statCtx = useContext(StatContext);
  const [selectCareerOverlayVisible, setSelectCareerOverlayVisible] = useState(false);
  const [endGameOverlayVisible, setEndGameOverlayVisible] = useState(false);
  
  useEffect(() => {
    if (statCtx.stage == 3) {
      setSelectCareerOverlayVisible(true);
    } else {
      setSelectCareerOverlayVisible(false);
    }
  }, [statCtx.stage]);
  
  const closeSelectCareerOverlay = () => {
    setSelectCareerOverlayVisible(false);
  };
  const endGame = ()=>{
    setEndGameOverlayVisible(true);
  }
  const closeEndGameOverlay = ()=>{
    setEndGameOverlayVisible(false);
  }

  return (
    <>
      <UserInfo />
      <LogInfo />
      <LifeProgress 
        endGame = {endGame}/>
      <EndGame
        visible={endGameOverlayVisible}
        onClose={closeEndGameOverlay}/>
      <CareerSelection 
        visible={selectCareerOverlayVisible} 
        onClose={closeSelectCareerOverlay}
        />
    </>
  );
};
const styles={
  container:{

  }
}
export default MainScreen;