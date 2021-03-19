import { ImageStyle, TextProps, TextStyle, ViewStyle } from "react-native";

declare module "react-native" {
  namespace StyleSheet {
    type CustomNamedStyles<T> = {
      [P in keyof T]:
        | ViewStyle
        | TextStyle
        | ImageStyle
        | ((
            ...args: any[]
          ) => ViewStyle | TextStyle | ImageStyle | TextProps);
    };
    export function create<
      T extends CustomNamedStyles<T> | CustomNamedStyles<any>
    >(styles: T | CustomNamedStyles<T>): T;
  }
}
