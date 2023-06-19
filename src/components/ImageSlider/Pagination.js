import { StyleSheet, Animated, View, Dimensions } from "react-native";
import React from "react";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import Colors from "../../utills/Colors";

const { width } = Dimensions.get("screen");

const Pagination = ({ data, scrollX, index }) => {
  return (
    <View style={styles.container}>
{        data.map((_, idx) => {
            const inputRange = [
              (idx - 1) * width,
              idx * width,
              (idx + 1) * width,
            ];

            const dotWidth = scrollX.interpolate({
              inputRange,
              outputRange: [12, 20, 12],
              extrapolate: "clamp",
            });

            const opacity = scrollX.interpolate({
              inputRange,
              outputRange: [12, 20, 12],
              extrapolate: "clamp",
            });

            const backgroundColor = scrollX.interpolate({
              inputRange,
              outputRange: ["#ccc", "#576AF4", "#ccc"],
              extrapolate: "clamp",
            });

            return (
              <Animated.View
                key={idx.toString()}
                style={[
                  styles.dot,
                  { width: dotWidth, backgroundColor },
                  // idx === index && styles.dotActive,
                ]}
              />
            );
          })}
    </View>
  );
};

export default Pagination;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: hp(-3),
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  dot: {
    width: 3,
    height: 8,
    borderRadius: 6,
    marginHorizontal: 3,
    backgroundColor: "#ccc",
  },
  dotActive: {
    backgroundColor: Colors.Appthemecolor,
  },
});
