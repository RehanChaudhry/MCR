import Message from "models/Message";
import _ from "lodash";
import { Conversation } from "models/api_responses/ChatsResponseModel";
import { Dispatch, SetStateAction } from "react";

export const ChatHelper = {
  manipulateChatLists: (
    setActiveConversations:
      | Dispatch<SetStateAction<Conversation[] | undefined>>
      | undefined,
    inActiveConversations: Conversation[] | undefined,
    setInActiveConversations:
      | Dispatch<SetStateAction<Conversation[] | undefined>>
      | undefined,
    activeConversations: Conversation[] | undefined,
    isArchived: boolean,
    conversationId: number,
    message?: Message
  ) => {
    /*chat is move in archive*/
    if (isArchived) {
      //add chat in inactive list
      setInActiveConversations?.((prevState) => {
        let findItem = activeConversations?.find(
          (item) => item.id === conversationId
        );

        if (findItem !== undefined) {
          //   setIsAllDataLoaded([findItem, ...(prevState || [])].length < 10);

          // @ts-ignore
          return [findItem, ...(prevState || [])];
        }

        return prevState;
      });

      //remove chat in active list
      setActiveConversations?.((prevState) => {
        let findItem = prevState?.find(
          (item) => item.id === conversationId
        );

        if (findItem !== undefined) {
          /*  setIsAllDataLoaded(
                        _.without(prevState as Conversation[], findItem).length < 10
                    );*/

          return [..._.without(prevState as Conversation[], findItem)];
        } else {
          return prevState;
        }
      });
    } else {
      /*chat is move in archive*/

      /*
       * this code runs many time because if user goes to chat thread
       * from archive list, after every time user sent message this callback will be called
       * just to remove item from inactive list
       * */

      setActiveConversations?.((prevState) => {
        //update chat in active chat list
        if (
          prevState?.findIndex((item) => item.id === conversationId) !== -1
        ) {
          let chatsCopy = _.cloneDeep(prevState);

          let item = prevState?.find(
            (listItem) => listItem.id === conversationId
          );

          item!!.message = [message!!];
          chatsCopy?.splice(
            // eslint-disable-next-line @typescript-eslint/no-shadow
            prevState?.findIndex((item) => item.id === conversationId)!!,
            1,
            item!!
          );

          //    setIsAllDataLoaded((chatsCopy?.length ?? 0) < 10);

          return chatsCopy;
        } else {
          let findItem = inActiveConversations?.find(
            (item) => item.id === conversationId
          );

          //add item in active chat list
          if (findItem !== undefined) {
            findItem.message = [message!!]; //replace conversation from new object

            //   setIsAllDataLoaded([findItem, ...prevState].length < 10);

            return [findItem, ...prevState];
          }

          return prevState;
        }
      });

      //remove chat item from archive list
      setInActiveConversations?.((prevState) => {
        let findItem = prevState?.find(
          (item) => item.id === conversationId
        );

        if (findItem !== undefined) {
          /* setIsAllDataLoaded(
                        _.without(prevState as Conversation[], findItem).length < 10
                    );*/
          return [..._.without(prevState as Conversation[], findItem)];
        } else {
          return prevState;
        }
      });
    }
  },

  activeInActiveUsers(
    userId: number,
    isJoined: boolean,
    setActiveConversations:
      | Dispatch<SetStateAction<Conversation[] | undefined>>
      | undefined,
    setInActiveConversations:
      | Dispatch<SetStateAction<Conversation[] | undefined>>
      | undefined
  ) {
    setInActiveConversations?.((prevState) => {
      let newList = _.cloneDeep(prevState);

      if (newList !== undefined) {
        _.forEach(newList, (item) => {
          _.forEach(item.conversationUsers, (conversationUsers) => {
            if (conversationUsers.userId === userId) {
              conversationUsers.online = isJoined ? 1 : 0;
            }
          });
        });
        return [...newList];
      } else {
        return prevState;
      }
    });

    setActiveConversations?.((prevState) => {
      let newList = _.cloneDeep(prevState);

      if (newList !== undefined) {
        _.forEach(newList, (item) => {
          _.forEach(item.conversationUsers, (conversationUsers) => {
            if (conversationUsers.userId === userId) {
              conversationUsers.online = isJoined ? 1 : 0;
            }
          });
        });
        return [...newList];
      } else {
        return prevState;
      }
    });
  }
};
