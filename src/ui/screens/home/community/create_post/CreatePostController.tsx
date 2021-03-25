import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import Close from "assets/images/ic_cross.svg";
import Check from "assets/images/check_circle.svg";
import { SPACE } from "config";
import { usePreferredTheme, usePreventDoubleTap } from "hooks";
import { CreatePostApiRequestModel } from "models/api_requests/CreatePostApiRequestModel";
import { CreatePostApiResponseModel } from "models/api_responses/CreatePostApiResponseModel";
import React, { FC, useRef } from "react";
import { Alert, Pressable, View } from "react-native";
import { useApi } from "repo/Client";
import CommunityAnnouncementApis from "repo/home/CommunityAnnouncementApis";
import { CommunityStackParamList } from "routes/CommunityStack";
import { AppLabel } from "ui/components/atoms/app_label/AppLabel";
import { CreatePostView } from "ui/screens/home/community/create_post/CreatePostView";
import { AppLog } from "utils/Util";

type CommunityNavigationProp = StackNavigationProp<
  CommunityStackParamList,
  "CreatePost"
>;

type Props = {};

const CreatePostController: FC<Props> = () => {
  const requestModel = useRef<CreatePostApiRequestModel>();
  const navigation = useNavigation<CommunityNavigationProp>();
  const theme = usePreferredTheme();
  const createPostApi = useApi<
    CreatePostApiRequestModel,
    CreatePostApiResponseModel
  >(CommunityAnnouncementApis.createPost);

  navigation.setOptions({
    headerRight: () => (
      <Pressable
        onPress={() => {
          navigation.navigate("CreatePost");
        }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <AppLabel
            text="Post"
            style={{
              color: theme.themedColors.primary,
              fontSize: SPACE.md
            }}
            weight="semi-bold"
          />
          <Check
            width={20}
            height={20}
            fill={theme.themedColors.primary}
          />
        </View>
      </Pressable>
    ),
    headerRightContainerStyle: {
      padding: SPACE.md
    },
    headerLeft: () => (
      <Pressable
        onPress={() => {
          navigation.pop();
        }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Close
            width={20}
            height={20}
            fill={theme.themedColors.interface["700"]}
          />
          <AppLabel
            text="Close"
            style={{
              color: theme.themedColors.interface["700"],
              fontSize: SPACE.md
            }}
          />
        </View>
      </Pressable>
    ),
    headerLeftContainerStyle: {
      padding: SPACE.md
    },
    headerTitleAlign: "center",
    headerTitle: "Create Post"
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleCreatePost = usePreventDoubleTap(async () => {
    if (requestModel.current === undefined) {
      return;
    }
    AppLog.log("handleSignIn: ");
    const { hasError, errorBody, dataBody } = await createPostApi.request([
      requestModel.current
    ]);
    if (hasError || dataBody === undefined) {
      Alert.alert("Unable to Sign In", errorBody);
      return;
    } else {
    }
  });
  return <CreatePostView />;
};

export default CreatePostController;
