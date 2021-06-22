import {
  RouteProp,
  useNavigation,
  useRoute
} from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useAuth } from "hooks";
import { FetchMyProfileResponseModel } from "models/api_responses/FetchMyProfileResponseModel";
import EScreen from "models/enums/EScreen";
import RelationFilterType from "models/enums/RelationFilterType";
import RelationModel from "models/RelationModel";
import React, {
  FC,
  useCallback,
  useContext,
  useLayoutEffect
} from "react";
import AuthApis from "repo/auth/AuthApis";
import { useApi } from "repo/Client";
import { FriendsRootStackParamList } from "routes/FriendsRootStack";
import { AppDataContext } from "../AppDataProvider";
import { ConnectRequestType } from "../connect_requests/ConnectRequestsController";
import useFetchRelations from "../useFetchRelations";
import MyRoommatesView from "./MyRoommatesView";
import { STRINGS } from "config";
import { useCreateConversation } from "hooks/useCreateConversation";
import HeaderLeftTextWithIcon from "ui/components/molecules/header_left_text_with_icon/HeaderLeftTextWithIcon";
import { HeaderTitle } from "ui/components/molecules/header_title/HeaderTitle";
import { NotificationParamList } from "routes/NotificationParams";

type Props = {};

type FriendsNavigationProp = StackNavigationProp<
  FriendsRootStackParamList,
  "ConnectRequests"
>;

type NotificationRouteProp = RouteProp<
  NotificationParamList,
  "MyRoommates"
>;

const MyRoommatesController: FC<Props> = () => {
  const navigation = useNavigation<FriendsNavigationProp>();
  const route = useRoute<NotificationRouteProp>();
  const createConversation = useCreateConversation();

  const {
    myRoommates,
    setMyRoommates,
    setActiveConversations,
    inActiveConversations
  } = useContext(AppDataContext);

  const {
    relationsCount: roommatesCount,
    pendingRelationsCount: pendingRoommatesCount,
    isLoading,
    canLoadMore,
    onEndReached,
    errorMessage,
    onPullToRefresh
  } = useFetchRelations(
    RelationFilterType.ROOMMATE,
    myRoommates,
    setMyRoommates
  );

  const onPressReceivedRoommateRequests = () => {
    navigation.navigate("ConnectRequests", {
      title: "Roommate Requests",
      type: ConnectRequestType.ROOMMATE_REQUESTS
    });
  };

  const moveToProfileScreen = useCallback(
    (_: RelationModel) => {
      navigation.navigate("Profile", {
        isFrom: EScreen.MY_FRIENDS,
        updateProfile: false,
        userId: _.userId
      });
    },
    [navigation]
  );

  const { user, saveProfile } = useAuth();

  const fetchProfileApi = useApi<string, FetchMyProfileResponseModel>(
    AuthApis.fetchMyProfile
  );

  const fetchUserApi = useCallback(async () => {
    const {
      hasError: hasErrorProfile,
      dataBody
    } = await fetchProfileApi.request([]);

    if (!hasErrorProfile) {
      await saveProfile(dataBody?.data!, user!);
    }
  }, [fetchProfileApi, saveProfile, user]);

  const moveToChatScreen = async (profileMatch: RelationModel) => {
    const createConversationResult = await createConversation(
      [user?.profile?.id!!, profileMatch.userId!],
      setActiveConversations,
      inActiveConversations
    );

    if (createConversationResult !== undefined) {
      navigation.navigate("Chat", {
        title: [
          profileMatch.user?.getFullName() ?? STRINGS.common.not_found
        ],
        conversation: createConversationResult
      });
    }
  };

  useLayoutEffect(() => {
    if (route.params.isFrom === EScreen.NOTIFICATION) {
      navigation.setOptions({
        headerLeft: () => (
          <HeaderLeftTextWithIcon
            onPress={() => {
              navigation.goBack();
            }}
          />
        ),
        headerTitleAlign: "center",
        headerTitle: () => <HeaderTitle text={"My Roommates"} />
      });
    }
  }, [navigation, route.params.isFrom]);

  return (
    <MyRoommatesView
      roomatesCount={roommatesCount}
      pendingRoommatesCount={pendingRoommatesCount}
      data={myRoommates}
      isLoading={isLoading}
      canLoadMore={canLoadMore}
      error={errorMessage}
      onEndReached={onEndReached}
      onPullToRefresh={(onComplete?: () => void) => {
        onPullToRefresh((data) => {
          if (!user?.profile?.agreementId && data?.length !== 0) {
            fetchUserApi().then().catch();
          }
          onComplete?.();
        });
      }}
      onPressChat={moveToChatScreen}
      onPressProfile={moveToProfileScreen}
      onPressReceivedRoommateRequests={onPressReceivedRoommateRequests}
    />
  );
};

export default MyRoommatesController;
