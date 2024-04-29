import React, { useContext, useEffect, useRef } from "react";
import { View, Text, ScrollView } from "react-native";
import { COLOR } from "../../util/color";
import { StatContext } from "../../store/stat-context";
import { LogContext } from "../../store/log-context";

const LogInfo = () => {
  const statCtx = useContext(StatContext);
  const logCtx = useContext(LogContext);
  const actionScrollViewRef = useRef(null);
  const statsScrollViewRef = useRef(null);

  useEffect(() => {
    if (actionScrollViewRef.current) {
      actionScrollViewRef.current.scrollToEnd({ animated: true });
    }
    if (statsScrollViewRef.current) {
      statsScrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [logCtx.statsChangeLogs, logCtx.actionLogs]);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Actions</Text>
      </View>
      <View style={styles.logContainer}>
        <ScrollView
          ref={actionScrollViewRef}
          onContentSizeChange={() => actionScrollViewRef.current.scrollToEnd({ animated: true })}
        >
          {logCtx.actionLogs.map((actionLogs, index) => (
            <Text
              style={[styles.logText, index === logCtx.actionLogs.length - 1 && styles.lastestLogText]}
              key={index}
            >
              {actionLogs.action} {actionLogs.object}
            </Text>
          ))}
        </ScrollView>
      </View>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Results</Text>
      </View>
      <View style={styles.logContainer}>
        <ScrollView
          ref={statsScrollViewRef}
          onContentSizeChange={() => statsScrollViewRef.current.scrollToEnd({ animated: true })}
        >
          {logCtx.statsChangeLogs.map((statsChangeLogs, index) => (
            <Text
              style={[styles.logText, index === logCtx.statsChangeLogs.length - 1 && styles.lastestLogText]}
              key={index}
            >
              {statsChangeLogs.change} {statsChangeLogs.object}
            </Text>
          ))}
        </ScrollView>
      </View>
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
  headerContainer: {
    borderTopWidth: 3,
    borderColor: COLOR.darkGrey,
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLOR.gold,
    textAlign: "center",
  },
  logContainer: {
    marginVertical: 10,
    marginHorizontal: 20,
    borderColor: COLOR.black,
    borderRadius: 3,
    height: '37%',
  },
  logText: {
    padding: 2,
    fontSize: 15,
  },
  lastestLogText: {
    padding: 2,
    fontSize: 15,
    color: COLOR.blue,
  },
};

export default LogInfo;