import React, {
  FC,
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
import {
  ConversationSuggestionsResponseModel,
  User
} from "models/api_responses/ConversationSuggestionsResponseModel";
import ChatApis from "repo/chat/ChatApis";
import { AppLog } from "utils/Util";
import { ConversationSuggestionsRequestModel } from "models/api_requests/ConversationSuggestionsRequestModel";
import { CreateConversationRequestModel } from "models/api_requests/CreateConversationRequestModel";
import SimpleToast from "react-native-simple-toast";

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

  const goBack = () => {
    const users: string[] = newConversations!!.reduce(
      (newArray: string[], item) => (
        newArray.push(item.firstName + " " + item.lastName), newArray
      ),
      []
    );
    navigation.goBack();
    navigation.navigate("ChatThread", { title: users });
  };

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
          onPress={() => {
            if (
              newConversations !== undefined &&
              newConversations.length > 0
            ) {
              handleCreateConversationApi()
                .then((result) => {
                  AppLog.logForcefully(
                    "CreateConversationApi() => " + JSON.stringify(result)
                  );
                  if (result.hasError) {
                    SimpleToast.show(
                      result.errorBody ?? Strings.somethingWentWrong
                    );
                  } else {
                    goBack();
                  }
                })
                .catch((error) => {
                  AppLog.logForcefully(
                    "CreateConversationApi() => catch =>" +
                      JSON.stringify(error)
                  );
                });
            } else {
              navigation.goBack();
            }
          }}
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation]);

  const getSuggestions = useApi<
    ConversationSuggestionsRequestModel,
    ConversationSuggestionsResponseModel
  >(ChatApis.getSuggestions);

  const handleGetSuggestionApi = async (keyword: string) => {
    const { hasError, dataBody, errorBody } = await getSuggestions.request(
      [
        {
          keyword: keyword,
          roleTitle: conversationType.current === 0 ? "Student" : "Staff"
        }
      ]
    );

    if (hasError || dataBody === undefined) {
      AppLog.logForcefully("Unable to find suggestions " + errorBody);
      return;
    } else {
      AppLog.logForcefully("suggestions " + dataBody.data);
      setSuggestions(dataBody.data);
    }
  };

  const createConversationAPi = useApi<
    CreateConversationRequestModel,
    ConversationSuggestionsResponseModel
  >(ChatApis.createConversations);

  const handleCreateConversationApi = async () => {
    const { hasError, dataBody, errorBody } = await createConversationAPi // @ts-ignore
      .request([{ userIds: usersIds.current }]);

    return { hasError, dataBody, errorBody };
  };

  const removeItemFromList = (itemToDelete: User) => {
    setNewConversation(
      newConversations!!.filter((item) => item.id !== itemToDelete.id)
    );
  };

  const typeAHead = (keyword: string = "") => {
    keyword !== "" ? handleGetSuggestionApi(keyword) : setSuggestions([]);
  };

  const setConversationType = (type: number) => {
    conversationType.current = type;
    setNewConversation([]);
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
    />
  );
};
