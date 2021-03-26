// prettier-ignore
import "react-native-gesture-handler";
import React, { FC, useState } from "react";
import { Button, StyleProp, Text, TextStyle, View } from "react-native";
import {
  SafeAreaProvider,
  SafeAreaView
} from "react-native-safe-area-context";
import { optimizedMemo } from "ui/components/templates/optimized_memo/optimized_memo";
import { AppLog } from "utils/Util";

type Props = {};

type LabelProps = {
  text: string;
  style?: StyleProp<TextStyle>;
};

const MyLabel = optimizedMemo<LabelProps>((props) => {
  AppLog.log("Rendering MyLabel...");
  return <Text style={props.style}>{props.text}</Text>;
});

type ButtonProps = {
  text: string;
  onPress: () => void;
};
const MyButton: FC<ButtonProps> = React.memo((props) => {
  AppLog.log("Rendering MyButton...");
  return <Button title={props.text} onPress={props.onPress} />;
});

function getRandomColor() {
  let letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

const OptimizedMemoDemo: React.FC<Props> = () => {
  AppLog.log("Rendering App...");
  const [counter, setCounter] = useState(0);
  const [labelColor, setLabelColor] = useState(getRandomColor());
  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={[
          {
            flex: 1,
            width: "100%",
            alignItems: "center"
          }
        ]}>
        <View>
          <MyLabel
            text={`Counter: ${counter}`}
            style={[{ backgroundColor: labelColor, textAlign: "center" }]}
          />
          <MyButton
            text="Change Style"
            onPress={() => {
              setLabelColor(getRandomColor());
            }}
          />
          <MyButton
            text="Change Text"
            onPress={() => {
              setCounter(counter + 1);
            }}
          />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};
export default OptimizedMemoDemo;
