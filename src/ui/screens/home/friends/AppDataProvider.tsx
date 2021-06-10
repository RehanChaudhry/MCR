import RelationModel from "models/RelationModel";
import React, {
  Dispatch,
  FC,
  SetStateAction,
  useCallback,
  useRef,
  useState
} from "react";
import { Conversation } from "models/api_responses/ChatsResponseModel";

type AppDataContextType = {
  myFriends?: RelationModel[];
  setMyFriends?: Dispatch<SetStateAction<RelationModel[] | undefined>>;
  matches?: RelationModel[];
  setMatches?: Dispatch<SetStateAction<RelationModel[] | undefined>>;
  activeConversations?: Conversation[];
  setActiveConversations?: Dispatch<
    SetStateAction<Conversation[] | undefined>
  >;
  inActiveConversations?: Conversation[];
  setInActiveConversations?: Dispatch<
    SetStateAction<Conversation[] | undefined>
  >;
  addListenerOnResetData: (listener: () => void) => void;
  removeListenerOnResetData: (listener: () => void) => void;
  resetData: () => void;
};

export const MyFriendsContext = React.createContext<AppDataContextType>(
  // @ts-ignore
  {}
);

const AppDataProvider: FC = (props) => {
  const [myFriends, setMyFriends] = useState<RelationModel[]>();
  const [matches, setMatches] = useState<RelationModel[]>();
  const [activeConversations, setActiveConversations] = useState<
    Conversation[]
  >();
  const [inActiveConversations, setInActiveConversations] = useState<
    Conversation[]
  >();
  const listenersRef = useRef<Array<() => void>>([]);
  const addListenerOnResetData = useCallback((listener: () => void) => {
    listenersRef.current.push(listener);
  }, []);
  const removeListenerOnResetData = useCallback((listener: () => void) => {
    listenersRef.current = listenersRef.current.filter(
      (value) => value !== listener
    );
  }, []);
  const resetData = useCallback(() => {
    listenersRef.current.forEach((cb) => cb());
  }, []);

  return (
    <MyFriendsContext.Provider
      value={{
        myFriends: myFriends,
        setMyFriends: setMyFriends,
        matches: matches,
        setMatches: setMatches,
        activeConversations: activeConversations,
        inActiveConversations: inActiveConversations,
        setActiveConversations: setActiveConversations,
        setInActiveConversations: setInActiveConversations,
        addListenerOnResetData: addListenerOnResetData,
        removeListenerOnResetData: removeListenerOnResetData,
        resetData: resetData
      }}>
      {props.children}
    </MyFriendsContext.Provider>
  );
};

export default AppDataProvider;
