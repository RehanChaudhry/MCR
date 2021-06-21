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
          findItem.currentUser[0].status = "archived";
          return [findItem, ...(prevState || [])];
        }

        return prevState;
      });

      //remove chat from active list
      setActiveConversations?.((prevState) => {
        let findItem = prevState?.find(
          (item) => item.id === conversationId
        );

        if (findItem !== undefined) {
          return [..._.without(prevState as Conversation[], findItem)];
        } else {
          return prevState;
        }
      });
    } else {
      /*chat is moved to archive*/

      /*
       * this code runs many time because if user goes to chat thread screen
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

          // @ts-ignore
          item!.lastMessagedAt = message?.createdAt;
          item!.message = [message!!];
          item!.currentUser[0].status = "active";

          /* chatsCopy?.splice(
            prevState?.findIndex((_item) => _item.id === conversationId)!!,
            1,
            item!!
          );*/

          //remove item at index
          chatsCopy?.splice(
            prevState?.findIndex(
              (_item: Conversation) => _item.id === conversationId
            )!,
            1
          );

          //add item at index 0
          chatsCopy?.splice(0, 0, item!);

          return chatsCopy;
        } else {
          /* if item was not found in active chat lists maybe it will present in
             inactive chats, so pick it from inactive chat list
             this will happen when chat is opened from archive list
           */
          let findItem = inActiveConversations?.find(
            (item) => item.id === conversationId
          );

          //add item in active chat list
          if (findItem !== undefined) {
            // @ts-ignore
            findItem.lastMessagedAt = message?.createdAt;
            findItem.message = [message!!]; //replace conversation from new object
            findItem!.currentUser[0].status = "active";
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
