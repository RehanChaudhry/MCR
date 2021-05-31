import RelationModel from "models/RelationModel";
import React, { FC, MutableRefObject, useRef, useState } from "react";

type MyFriendsContextType = {
  myFriends?: RelationModel[];
  setMyFriends?: (myFriends: RelationModel[] | undefined) => void;
  onResetMyFriends: MutableRefObject<(() => void) | undefined>;
  resetMyFriends?: () => void;
};

export const MyFriendsContext = React.createContext<MyFriendsContextType>(
  // @ts-ignore
  {}
);

const MyFriendsProvider: FC = (props) => {
  const [myFriends, setMyFriends] = useState<RelationModel[]>();
  const onResetMyFriends = useRef<(() => void) | undefined>();

  return (
    <MyFriendsContext.Provider
      value={{
        myFriends: myFriends,
        setMyFriends: setMyFriends,
        onResetMyFriends: onResetMyFriends,
        resetMyFriends: () => {
          onResetMyFriends?.current?.();
        }
      }}>
      {props.children}
    </MyFriendsContext.Provider>
  );
};

export default MyFriendsProvider;
