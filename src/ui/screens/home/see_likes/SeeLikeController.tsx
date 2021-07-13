import {
  RouteProp,
  useNavigation,
  useRoute
} from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { FC, useLayoutEffect, useRef, useState } from "react";
import HeaderLeftTextWithIcon from "ui/components/molecules/header_left_text_with_icon/HeaderLeftTextWithIcon";
import { HeaderTitle } from "ui/components/molecules/header_title/HeaderTitle";
import { AppLog } from "utils/Util";
import { SeeLikesView } from "./SeeLikesView";
import { useCallback, useContext } from "react";
import CommunityAnnouncementApis from "repo/home/CommunityAnnouncementApis";
import ChatRequestModel from "models/api_requests/chatRequestModel";
import SimpleToast from "react-native-simple-toast";
import { useApi } from "repo/Client";
import Strings from "config/Strings";
import { useEffect } from "react";
import { FetchLikesResponseModel } from "models/FetchLikesResponsemodel";
import { HomeStackParamList } from "routes/HomeStack";
import { User } from "models/User";
import EScreen from "models/enums/EScreen";
import { AppDataContext } from "../friends/AppDataProvider";
import useCreateConversation from "hooks/useCreateConversation";

type FetchLikesRouteProp = RouteProp<HomeStackParamList, "SeeLikes">;

type Props = {};

type SeelikesNavigationProp = StackNavigationProp<
  HomeStackParamList,
  "SeeLikes"
>;

const SeeLikesController: FC<Props> = () => {
  const navigation = useNavigation<SeelikesNavigationProp>();
  const route = useRoute<FetchLikesRouteProp>();
  const { postId } = route.params;

  const [isAllDataLoaded, setIsAllDataLoaded] = useState<boolean>(true);
  const [likedby, setLikedby] = useState<User[] | undefined>(undefined);

  const { createConversationAndNavigate } = useCreateConversation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <HeaderLeftTextWithIcon onPress={() => navigation.pop()} />
      ),
      headerTitle: () => <HeaderTitle text="Likes" />
    });
  }, [navigation]);

  const requestModel = useRef<ChatRequestModel>({
    paginate: true,
    page: 1,
    limit: 10,
    id: postId
  });

  const fetchLikesByApi = useApi<
    ChatRequestModel,
    FetchLikesResponseModel
  >(CommunityAnnouncementApis.fetchLikes);

  const handleFetchLikes = useCallback(async () => {
    const {
      hasError,
      errorBody,
      dataBody
    } = await fetchLikesByApi.request([requestModel.current]);

    if (hasError || dataBody === undefined) {
      SimpleToast.show(errorBody ?? Strings.something_went_wrong);
      return;
    } else {
      setLikedby((prevState) => {
        return [
          ...(prevState === undefined || requestModel.current.page === 1
            ? []
            : prevState),
          ...dataBody.data!!
        ];
      });

      setIsAllDataLoaded(
        dataBody.data!!.length < requestModel.current.limit
      );

      requestModel.current.page = (requestModel?.current?.page ?? 0) + 1;
    }
  }, [fetchLikesByApi]);

  useEffect(() => {
    handleFetchLikes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const refreshCallback = useCallback(
    async (onComplete?: () => void) => {
      requestModel.current.page = 1;
      handleFetchLikes()
        .then(() => {
          onComplete?.();
        })
        .catch(() => {
          onComplete?.();
        });
    },
    [handleFetchLikes]
  );

  const { setActiveConversations, setInActiveConversations } = useContext(
    AppDataContext
  );

  const onEndReached = useCallback(async () => {
    await handleFetchLikes();
  }, [handleFetchLikes]);

  const moveToChatScreen = async (user: User) => {
    createConversationAndNavigate(
      user,
      setActiveConversations,
      setInActiveConversations
    );
  };

  const moveToProfileScreen = (user: User) => {
    AppLog.log(
      () => "moveToProfileScreen(), profile: " + JSON.stringify(user)
    );
    navigation.navigate("ViewProfile", {
      isFrom: EScreen.MATCH_INFO,
      userId: user!.id!,
      userName: user.firstName + " " + user.lastName
    });
  };

  return (
    <SeeLikesView
      shouldShowProgressBar={fetchLikesByApi.loading}
      error={fetchLikesByApi.error}
      isAllDataLoaded={isAllDataLoaded}
      data={likedby}
      pullToRefreshCallback={refreshCallback}
      onEndReached={onEndReached}
      onchatButtonClicked={moveToChatScreen}
      moveToProfileScreen={moveToProfileScreen}
    />
  );
};

export default SeeLikesController;
