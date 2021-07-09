import { useApi } from "repo/Client";
import { CreateConversationRequestModel } from "models/api_requests/CreateConversationRequestModel";
import { CreateConversationResponseModel } from "models/api_responses/CreateConversationResponseModel";
import ChatApis from "repo/chat/ChatApis";
import _ from "lodash";
import { Conversation } from "models/api_responses/ChatsResponseModel";
import SimpleToast from "react-native-simple-toast";
import { Dispatch, SetStateAction } from "react";

export const useCreateConversation = () => {
  const createConversationAPi = useApi<
    CreateConversationRequestModel,
    CreateConversationResponseModel
  >(ChatApis.createConversations);

  return async (
    userId: number[],
    setActiveConversations:
      | Dispatch<SetStateAction<Conversation[] | undefined>>
      | undefined,
    setInActiveConversations:
      | Dispatch<SetStateAction<Conversation[] | undefined>>
      | undefined
  ): Promise<Conversation> => {
    return new Promise((resolve, reject) => {
      createConversationAPi
        .request([{ userIds: userId }])
        .then(({ hasError, dataBody }) => {
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
            resolve(dataBody!.data);
          } else {
            SimpleToast.show("Something went wrong!");

            reject();
          }
        })
        .catch(() => reject());
    });
  };
};
