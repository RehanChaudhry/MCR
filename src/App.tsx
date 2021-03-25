// prettier-ignore
import "react-native-gesture-handler";
import { AppColorScheme, AppThemeProvider } from "hooks/theme";
import React, { FC, useState } from "react";
import { Button, StyleProp, Text, TextStyle, View } from "react-native";
import {
  SafeAreaProvider,
  SafeAreaView
} from "react-native-safe-area-context";
import { AppLog } from "utils/Util";

type Props = {};

type LabelProps = {
  text: string;
  style?: StyleProp<TextStyle>;
};
const MyLabel = React.memo<LabelProps>(
  (props) => {
    AppLog.log("Rendering MyLabel...");
    return <Text style={props.style}>{props.text}</Text>;
  },
  (prevProps, nextProps) => {
    return true;
  }
);

type ButtonProps = {
  text: string;
  onPress: () => void;
};
const MyButton: FC<ButtonProps> = (props) => {
  AppLog.log("Rendering MyButton...");
  return <Button title={props.text} onPress={props.onPress} />;
};

const App: React.FC<Props> = () => {
  AppLog.log("Rendering App...");
  const [counter, setCounter] = useState(0);
  // const theme = usePreferredTheme();
  return (
    <AppThemeProvider colorScheme={AppColorScheme.SYSTEM}>
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
              text="My Label"
              style={[{ backgroundColor: "#FFF456" }]}
            />
            <MyButton
              text="Press Me"
              onPress={() => {
                setCounter(counter + 1);
              }}
            />
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
    </AppThemeProvider>
  );
};
export default App;

