import React, { useContext, useEffect, useRef, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { COLOR } from "../../util/color";
import { StatContext } from "../../store/stat-context";
import { LogContext } from "../../store/log-context";

const LogInfo = () => {
  const statCtx = useContext(StatContext);
  const logCtx = useContext(LogContext);
  const scrollViewRef = useRef(null);
  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [logCtx.log]);
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.logContainer}>
          {logCtx.log.map((log,index)=>(
            <Text style= {styles.logText} key={index}>
              {log.action} {log.consequence} {log.object}
            </Text>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = {
  container: {
    height: "50%",
    marginHorizontal: 20,
    borderRadius: 5,
    backgroundColor: COLOR.white,
  },
  logContainer:{
    marginVertical:10,
    marginHorizontal:20,
    // borderWidth:2,
    borderColor:COLOR.black,
    borderRadius:3        
},
  logText:{
    padding:2,
    fontSize:15,
  }
};

export default LogInfo;