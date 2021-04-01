// prettier-ignore
import React, { FC, useState } from 'react';
import { Text } from "react-native";
import { Button, StyleProp, TextStyle, View } from "react-native";
import "react-native-gesture-handler";
import {
  SafeAreaProvider,
  SafeAreaView
} from "react-native-safe-area-context";
import {
  optimizedMemo,
  optimizedMemoWithStyleProp
} from "ui/components/templates/optimized_memo/optimized_memo";
import { AppLog } from "utils/Util";

type Props = {};

type LabelProps = {
  text: string;
  style?: StyleProp<TextStyle>;
  keyTag: string;
  shouldNotOptimize?: boolean;
};

const MyLabel = optimizedMemo<LabelProps>((props) => {
  AppLog.log(`Rendering ${props.keyTag}...`);
  return (
    <Text style={[props.style, { textAlign: "center" }]}>
      {props.text}
    </Text>
  );
});

type LabelWithCustomStyleProps = {
  text: string;
  keyTag: string;
  textStyle?: StyleProp<TextStyle>;
  shouldNotOptimize?: boolean;
};

const MyLabelWithCustomStyle = optimizedMemoWithStyleProp<LabelWithCustomStyleProps>(
  (props) => {
    AppLog.log(`Rendering ${props.keyTag}...`);
    return (
      <Text style={[props.textStyle, { textAlign: "center" }]}>
        {props.text}
      </Text>
    );
  }
)(["textStyle"]);

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
            keyTag="optimizedMemo"
            text={`Counter (optimizedMemo): ${counter}`}
            style={[{ backgroundColor: labelColor }]}
          />
          <MyLabelWithCustomStyle
            keyTag="optimizedMemoWithStyleProp"
            text={`Counter (optimizedMemoWithStyleProp): ${counter}`}
            textStyle={[{ backgroundColor: labelColor, marginTop: 5 }]}
          />
          <MyLabel
            keyTag="non-optimized"
            text={`Counter (non-optimized): ${counter}`}
            shouldNotOptimize={true}
            style={[{ backgroundColor: labelColor, marginTop: 5 }]}
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
