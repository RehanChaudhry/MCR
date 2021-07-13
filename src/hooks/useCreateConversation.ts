import { useApi } from "repo/Client";
import { CreateConversationRequestModel } from "models/api_requests/CreateConversationRequestModel";
import { CreateConversationResponseModel } from "models/api_responses/CreateConversationResponseModel";
import ChatApis from "repo/chat/ChatApis";
import _ from "lodash";
import { Conversation } from "models/api_responses/ChatsResponseModel";
import SimpleToast from "react-native-simple-toast";
import { Dispatch, SetStateAction, useCallback, useState } from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import { HomeStackParamList } from "routes/HomeStack";
import { useNavigation } from "@react-navigation/native";
import { STRINGS } from "config";
import { User } from "models/User";
import { AppLog } from "utils/Util";

type homeNavigationProp = StackNavigationProp<HomeStackParamList>;

export default (onSuccess?: (conversation: Conversation) => void) => {
  const createConversationApi = useApi<
    CreateConversationRequestModel,
    CreateConversationResponseModel
  >(ChatApis.createConversations);

  const [shouldShowPb, setShouldShowPb] = useState(false);
  const navigation = useNavigation<homeNavigationProp>();

  const createConversationAndNavigate = useCallback(
    async (
      user: User | number[],
      setActiveConversations:
        | Dispatch<SetStateAction<Conversation[] | undefined>>
        | undefined,
      setInActiveConversations:
        | Dispatch<SetStateAction<Conversation[] | undefined>>
        | undefined
    ) => {
      AppLog.log(
        () => "inside userconversationHook" + JSON.stringify(user)
      );
      setShouldShowPb(true);
      createConversationApi
        .request([
          {
            userIds: Array.isArray(user) ? user : [user.id]
          }
        ])
        .then(({ hasError, dataBody, errorBody }) => {
          if (!hasError) {
            //set current date
            dataBody!.data.lastMessagedAt = new Date();

            //update active conversations list, only when new created chat has message
            //since, api will return previous chat if its already created
            if (dataBody?.data.currentUser[0]?.status === "active") {
              // @ts-ignore
              setActiveConversations?.((prevState) => {
                if (prevState !== undefined) {
                  return [
                    dataBody!.data,
                    ..._.without(
                      prevState as Conversation[],
                      prevState?.find(
                        (item: Conversation) =>
                          item.id === dataBody!!.data.id
                      )
                    )
                  ];
                } else {
                  return [dataBody!.data];
                }
              });
            } else if (
              dataBody?.data.currentUser[0]?.status === "archived"
            ) {
              // @ts-ignore
              setInActiveConversations?.((prevState) => {
                if (prevState !== undefined) {
                  return [
                    dataBody!.data,
                    ..._.without(
                      prevState as Conversation[],
                      prevState?.find(
                        (item: Conversation) =>
                          item.id === dataBody!!.data.id
                      )
                    )
                  ];
                } else {
                  return [dataBody!.data];
                }
              });
            }

            //onSuccess is needed when we pass array in method and
            //its only called from NewConversationController

            onSuccess
              ? onSuccess(dataBody?.data!)
              : navigation.navigate("ChatThread", {
                  title: [
                    dataBody?.data.conversationUsers[0].firstName +
                      " " +
                      dataBody?.data.conversationUsers[0].lastName ??
                      STRINGS.common.not_found
                  ],
                  conversation: dataBody?.data!
                });
          } else {
            SimpleToast.show(errorBody ?? "Something went wrong!");
          }

          setShouldShowPb(false);
        })
        .catch(() => {
          setShouldShowPb(true);
          SimpleToast.show("Something went wrong!");
        });
    },
    [createConversationApi, navigation, onSuccess]
  );

  return { createConversationAndNavigate, shouldShowPb };
};
