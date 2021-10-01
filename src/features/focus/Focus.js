import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-paper";
import { spacing, fontSizes } from "../../utils/sizes";
import { colors } from "../../utils/colors";
import { RoundedButton } from "../../components/RoundedButton";

export const Focus = ({ addSubject }) => {
  const [subject, setSubject] = useState(null);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>What would you like to focus on?</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onSubmitEditing={({ nativeEvent: { text } }) => setSubject(text)}
        />
        <RoundedButton
          title="+"
          size={50}
          onPress={() => addSubject(subject)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
    paddingTop: spacing.xxxl,
    paddingHorizontal: spacing.lg
  },
  title: {
    color: colors.white,
    fontSize: fontSizes.xxl
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: spacing.md
  },
  input: {
    flex: 1,
    marginRight: spacing.md
  }
});
