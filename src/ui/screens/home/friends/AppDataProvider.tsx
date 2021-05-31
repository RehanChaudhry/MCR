import RelationModel from "models/RelationModel";
import React, {
  Dispatch,
  FC,
  SetStateAction,
  useCallback,
  useRef,
  useState
} from "react";

type AppDataContextType = {
  myFriends?: RelationModel[];
  setMyFriends?: Dispatch<SetStateAction<RelationModel[] | undefined>>;
  matches?: RelationModel[];
  setMatches?: Dispatch<SetStateAction<RelationModel[] | undefined>>;
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
        addListenerOnResetData: addListenerOnResetData,
        removeListenerOnResetData: removeListenerOnResetData,
        resetData: resetData
      }}>
      {props.children}
    </MyFriendsContext.Provider>
  );
};

export default AppDataProvider;
