import React from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { RoundedButton } from "../../components/RoundedButton";
import { colors } from "../../utils/colors";
import { fontSizes, spacing } from "../../utils/sizes";

export const FocusHistory = ({ focusHistory, onClear }) => {
  return (
    <View style={styles.container}>
      {focusHistory.length ? (
        <>
          <Text style={styles.text}>Things we've focus on</Text>
          <FlatList
            style={styles.list}
            data={focusHistory}
            keyExtractor={(item) => item.key}
            renderItem={({ item }) => (
              <Text style={styles.subject(item.status)}>{item.subject}</Text>
            )}
          />
          <RoundedButton size={75} title="Clear" onPress={onClear} />
        </>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
    alignItems: "center",
    paddingBottom: spacing.lg
  },
  text: {
    color: colors.white,
    fontSize: fontSizes.lg
  },
  list: {
    flex: 1
  },
  subject: (status) => (status === 1 ? { color: "green" } : { color: "red" })
});
