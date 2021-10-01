import React, { useState, useEffect } from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Focus } from "./src/features/focus/Focus";
import { FocusHistory } from "./src/features/focus/FocusHistory";
import { Timer } from "./src/features/timer/Timer";
import { colors } from "./src/utils/colors";

const STATUSES = {
  COMPLETED: 1,
  CANCELLED: 2
};
export default function App() {
  const [focusSubject, setFocusSubject] = useState(null);
  const [focusHistory, setFocusHistory] = useState([]);

  const saveFocusHistory = async () => {
    try {
      await AsyncStorage.setItem("focusHistory", JSON.stringify(focusHistory));
    } catch (error) {
      console.log(error);
    }
  };

  const loadFocusHistory = async () => {
    try {
      const history = await AsyncStorage.getItem("focusHistory");
      if (history && JSON.parse(history).length) {
        setFocusHistory(JSON.parse(history));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadFocusHistory();
  }, []);

  useEffect(() => {
    saveFocusHistory();
  }, [focusHistory]);

  const addFocusHistoryWithStatus = (subject, status) => {
    setFocusHistory([
      ...focusHistory,
      { key: String(focusHistory.length + 1), subject, status }
    ]);
  };

  const onTimerEnd = () => {
    addFocusHistoryWithStatus(focusSubject, STATUSES.COMPLETED);
    setFocusSubject(null);
  };

  const onCancel = () => {
    addFocusHistoryWithStatus(focusSubject, STATUSES.CANCELLED);
    setFocusSubject(null);
  };

  const onClear = () => {
    setFocusHistory([]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      {focusSubject ? (
        <Timer
          task={focusSubject}
          onTimerEnd={onTimerEnd}
          onCancel={onCancel}
        />
      ) : (
        <>
          <Focus addSubject={setFocusSubject} />
          <FocusHistory focusHistory={focusHistory} onClear={onClear} />
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.darkBlue
  }
});
