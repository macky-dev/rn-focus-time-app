import React, { useState } from "react";
import { StyleSheet, Text, View, Vibration, Platform } from "react-native";
import { ProgressBar } from "react-native-paper";
import { useKeepAwake } from "expo-keep-awake";

import { CountDown } from "../../components/CountDown";
import { RoundedButton } from "../../components/RoundedButton";
import { Timing } from "./Timing";

import { colors } from "../../utils/colors";
import { spacing } from "../../utils/sizes";

const DEFAULT_MIN = 1;

export const Timer = ({ task, onTimerEnd, onCancel }) => {
  useKeepAwake();
  const [minutes, setMinutes] = useState(DEFAULT_MIN);
  const [isStarted, setIsStarted] = useState(false);
  const [progress, setProgress] = useState(1);

  const vibrate = () => {
    if (Platform.OS === "ios") {
      const interval = setInterval(() => Vibration.vibrate(), 1000);
      setTimeout(() => clearInterval(interval), 10000);
    } else {
      Vibration.vibrate(10000);
    }
  };

  const onProgress = (progress) => setProgress(progress);

  const onEnd = () => {
    vibrate();
    setMinutes(DEFAULT_MIN);
    setProgress(1);
    setIsStarted(false);
    onTimerEnd();
  };

  const changeTime = (min) => {
    setMinutes(min);
    setProgress(1);
    setIsStarted(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.countDown}>
        <CountDown
          minutes={minutes}
          isPaused={!isStarted}
          onProgress={onProgress}
          onEnd={onEnd}
        />
      </View>
      <View style={styles.textWrapper}>
        <Text style={styles.text}>Focusing on:</Text>
        <Text style={styles.task}>{task}</Text>
      </View>
      <View style={styles.progressWrapper}>
        <ProgressBar
          progress={progress}
          color="#5E84E2"
          style={{ height: 10 }}
        />
      </View>
      <View style={styles.buttonWrapper}>
        <Timing onChangeTime={changeTime} />
      </View>
      <View style={styles.buttonWrapper}>
        {isStarted ? (
          <RoundedButton title="pause" onPress={() => setIsStarted(false)} />
        ) : (
          <RoundedButton title="start" onPress={() => setIsStarted(true)} />
        )}
      </View>
      <View style={styles.cancelButton}>
        <RoundedButton size={50} title="-" onPress={onCancel} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  countDown: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: spacing.lg
  },
  text: {
    color: colors.white,
    textAlign: "center"
  },
  task: {
    color: colors.white,
    fontWeight: "bold",
    textAlign: "center"
  },
  progressWrapper: {
    paddingTop: spacing.md
  },
  buttonWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: spacing.lg
  },
  cancelButton: {
    padding: spacing.lg
  }
});
