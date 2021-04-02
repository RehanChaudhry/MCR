/* eslint-disable no-undef */

// AsyncStorage
import mockAsyncStorage from "@react-native-async-storage/async-storage/jest/async-storage-mock";
jest.mock(
  "@react-native-async-storage/async-storage",
  () => mockAsyncStorage
);

// Switch
jest.mock("react-native/Libraries/Components/Switch/Switch", () => {
  const mockComponent = require("react-native/jest/mockComponent");
  return mockComponent("react-native/Libraries/Components/Switch/Switch");
});

// React Navigation
jest.mock("@react-navigation/native", () => {
  return {
    createNavigatorFactory: jest.fn(),
    useNavigation: jest.fn()
  };
});
jest.mock("@react-navigation/stack", () => ({
  createStackNavigator: jest.fn()
}));
jest.mock("@react-native-community/masked-view", () => ({}));
jest.mock("react-native/Libraries/Animated/src/NativeAnimatedHelper");

// Toggle Switch
jest.mock("toggle-switch-react-native", () => "");

// Multi Slider
jest.mock("@ptomasroos/react-native-multi-slider", () => "");

//for simple toast
jest.mock("react-native-simple-toast", () => ({
  SHORT: jest.fn()
}));
