import React, {
  FC,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState
} from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { NewConversationScreen } from "ui/screens/chat/new/NewConversationScreen";
import Strings from "config/Strings";
import CircularTick from "assets/images/circular_tick.svg";
import Close from "assets/images/close.svg";
import { usePreferredTheme } from "hooks";
import { HeaderTitle } from "ui/components/molecules/header_title/HeaderTitle";
import HeaderLeftTextWithIcon from "ui/components/molecules/header_left_text_with_icon/HeaderLeftTextWithIcon";
import HeaderRightTextWithIcon from "ui/components/molecules/header_right_text_with_icon/HeaderRightTextWithIcon";
import { moderateScale } from "config/Dimens";
import { ChatRootStackParamList } from "routes/ChatRootStack";
import { useApi } from "repo/Client";
import { ConversationSuggestionsResponseModel } from "models/api_responses/ConversationSuggestionsResponseModel";
import ChatApis from "repo/chat/ChatApis";
import { AppLog } from "utils/Util";
import { ConversationSuggestionsRequestModel } from "models/api_requests/ConversationSuggestionsRequestModel";
import { CreateConversationRequestModel } from "models/api_requests/CreateConversationRequestModel";
import SimpleToast from "react-native-simple-toast";
import { CreateConversationResponseModel } from "models/api_responses/CreateConversationResponseModel";
import { User } from "models/User";

type ConversationNavigationProp = StackNavigationProp<
  ChatRootStackParamList,
  "NewConversation"
>;

type Props = {};

export const NewConversationController: FC<Props> = () => {
  const navigation = useNavigation<ConversationNavigationProp>();
  const [suggestions, setSuggestions] = useState<User[] | undefined>(
    undefined
  );
  const usersIds = useRef<number[]>([]);
  const conversationType = useRef<number>(0);
  const { themedColors } = usePreferredTheme();
  const [newConversations, setNewConversation] = useState<
    User[] | undefined
  >(undefined);
  const [showProgressbar, setShowProgressbar] = useState<boolean>(false);
  const [clearInputField, setClearInputField] = useState<boolean>(false);

  const openChatThreadScreen = useCallback(
    (conversationId: number) => {
      const users: string[] = newConversations!!.reduce(
        (newArray: string[], item) => (
          newArray.push(item.firstName + " " + item.lastName), newArray
        ),
        []
      );
      navigation.goBack();
      navigation.navigate("ChatThread", {
        title: users,
        conversationId: conversationId
      });
    },
    [navigation, newConversations]
  );

  const getSuggestions = useApi<
    ConversationSuggestionsRequestModel,
    ConversationSuggestionsResponseModel
  >(ChatApis.getSuggestions);

  const handleGetSuggestionApi = async (keyword: string) => {
    AppLog.logForcefully("Handle suggestions APi.");
    setShowProgressbar(true);
    const { hasError, dataBody, errorBody } = await getSuggestions.request(
      [
        {
          keyword: keyword,
          roleTitle: conversationType.current === 0 ? "Student" : "Staff"
        }
      ]
    );
    setShowProgressbar(false);
    if (hasError || dataBody === undefined) {
      AppLog.log("Unable to find suggestions " + errorBody);
      return;
    } else {
      setSuggestions(dataBody.data);
    }
  };

  const createConversationAPi = useApi<
    CreateConversationRequestModel,
    CreateConversationResponseModel
  >(ChatApis.createConversations);

  const handleCreateConversationApi = useCallback(async () => {
    const { hasError, dataBody, errorBody } = await createConversationAPi // @ts-ignore
      .request([{ userIds: usersIds.current }]);

    return { hasError, dataBody, errorBody };
  }, [createConversationAPi]);

  const headerRightClick = useCallback(() => {
    AppLog.logForcefully("dats  : " + JSON.stringify(newConversations));
    if (newConversations !== undefined && newConversations.length > 0) {
      handleCreateConversationApi()
        .then((result) => {
          if (result.hasError && result.dataBody !== undefined) {
            SimpleToast.show(
              result.errorBody ?? Strings.somethingWentWrong
            );
          } else {
            openChatThreadScreen(result.dataBody!!.data.id);
          }
        })
        .catch((error) => {
          SimpleToast.show(error ?? Strings.somethingWentWrong);
        });
    } else {
      navigation.goBack();
    }
  }, [
    navigation,
    openChatThreadScreen,
    newConversations,
    handleCreateConversationApi
  ]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <HeaderTitle text={Strings.newConversation.title} />
      ),
      headerLeft: () => (
        <HeaderLeftTextWithIcon
          text={Strings.newConversation.titleLeft}
          onPress={() => {
            navigation.goBack();
          }}
          icon={() => (
            <Close
              testID="icon"
              width={moderateScale(15)}
              height={moderateScale(15)}
              fill={themedColors.primary}
            />
          )}
        />
      ),
      headerRight: () => (
        <HeaderRightTextWithIcon
          text={Strings.newConversation.titleRight}
          onPress={headerRightClick}
          icon={() => (
            <CircularTick
              testID="icon"
              width={moderateScale(15)}
              height={moderateScale(15)}
              fill={themedColors.primary}
            />
          )}
        />
      ),
      headerStyle: {
        elevation: 0,
        shadowOpacity: 0,
        shadowColor: "#00000000"
      }
    });
  }, [navigation, headerRightClick, themedColors.primary]);

  const removeItemFromList = (itemToDelete: User) => {
    setNewConversation(
      newConversations!!.filter((item) => item.id !== itemToDelete.id)
    );
  };

  // eslint-disable-next-line no-undef
  let timeOutId: NodeJS.Timeout;
  const typeAHead = (keyword: string = "") => {
    setClearInputField(false);
    clearTimeout(timeOutId);
    timeOutId = setTimeout(() => {
      keyword !== ""
        ? handleGetSuggestionApi(keyword)
        : setSuggestions([]);
    }, 500);
  };

  const setConversationType = (type: number) => {
    conversationType.current = type;
    setNewConversation([]);
    setClearInputField(true);
  };

  const addItem = (item: User) => {
    if (
      newConversations === undefined ||
      (newConversations!!.filter(
        (_item) => _item.id.toString() === item.id.toString()
      ).length < 1 &&
        newConversations.length < 5)
    ) {
      usersIds.current.push(item.id);
      setNewConversation((prevState) => {
        return [...(prevState === undefined ? [] : prevState), item];
      });
      setClearInputField(true);
    } else {
      SimpleToast.show("Item already added or limit reached");
    }
  };

  useEffect(() => {
    setSuggestions([]);
  }, [newConversations]);

  return (
    <NewConversationScreen
      data={newConversations}
      removeItem={removeItemFromList}
      suggestions={typeAHead}
      suggestionsList={suggestions}
      addItem={addItem}
      setConversationType={setConversationType}
      showProgressbar={showProgressbar}
      clearInputField={clearInputField}
    />
  );
};
