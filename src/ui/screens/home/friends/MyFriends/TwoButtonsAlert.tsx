import { FONT_SIZE, SPACE } from "config";
import { usePreferredTheme } from "hooks";
import { UpdateRelationStatus } from "models/api_requests/UpdateRelationApiRequestModel";
import RelationModel, { Status } from "models/RelationModel";
import React, {
  Dispatch,
  FC,
  SetStateAction,
  useCallback,
  useContext
} from "react";
import { StyleSheet, View } from "react-native";
import { AppButton } from "ui/components/molecules/app_button/AppButton";
import AppPopUp from "ui/components/organisms/popup/AppPopUp";
import { AppDataContext } from "ui/screens/home/friends/AppDataProvider";
import useSendFriendOrRoommateRequest from "ui/screens/home/friends/useSendFriendOrRoommateRequest";
import useUpdateRelation from "ui/screens/home/friends/useUpdateRelation";

export enum Type {
  FRIEND_REQUEST = "friend_request",
  FRIENDS_ROOMMATE_REQUEST = "friends_roommate_request",
  MATCHES_ROOMMATE_REQUEST = "matches_roommate_request",
  CANCEL = "cancel",
  UNFRIEND = "unfriend",
  REMOVE_ROOMMATE = "remove-roommate"
}

type Props = {
  title: string;
  message: string;
  errorMessage: string;
  shouldShow: boolean;
  isFromMatchScreen: boolean;
  getSelectedItem: () => RelationModel | undefined;
  hideSelf: () => void;
  type: Type;
  firstButtonText: string;
};

const TwoButtonsAlert: FC<Props> = React.memo(
  ({
    shouldShow,
    getSelectedItem,
    hideSelf,
    type,
    title,
    message,
    firstButtonText,
    isFromMatchScreen,
    errorMessage
  }) => {
    const theme = usePreferredTheme();

    const {
      myFriends,
      setMyFriends,
      matches,
      setMatches,
      resetData
    } = useContext(AppDataContext);

    let relations: RelationModel[] | undefined,
      setRelations:
        | Dispatch<SetStateAction<RelationModel[] | undefined>>
        | undefined;
    if (isFromMatchScreen) {
      [relations, setRelations] = [matches, setMatches];
    } else {
      [relations, setRelations] = [myFriends, setMyFriends];
    }

    const changedRelationStatus = useCallback(
      (relation: RelationModel | undefined, status?: Status) => {
        if (!relations || !relation) {
          return;
        }

        let _relations = [...relations];
        let index = _relations.findIndex(
          (value) => value.userId === relation.userId
        );
        let updatedRelation: RelationModel = Object.assign(
          Object.create(relation),
          relation
        );
        updatedRelation.status = status;
        if (status === Status.PENDING) {
          updatedRelation.acceptee = relation.user?.id;
        }
        _relations.splice(index, 1, updatedRelation);

        setRelations?.(_relations);
      },
      [relations, setRelations]
    );

    const onFriendRemoved = useCallback(
      (id: number) => {
        setRelations?.(relations?.filter((value) => value.userId !== id));
        resetData();
      },
      [relations, setRelations, resetData]
    );

    const { shouldShowPb, sendRequest } = useSendFriendOrRoommateRequest(
      errorMessage,
      hideSelf,
      () => {
        changedRelationStatus(getSelectedItem(), Status.PENDING);
      }
    );

    const getTypeForUpdateRelation = () => {
      return type.toString() as UpdateRelationStatus;
    };

    //for cancel match and unfriend
    const {
      shouldShowPb: shouldShowRelationUpdatePb,
      updateRelation
    } = useUpdateRelation(
      getTypeForUpdateRelation(),
      errorMessage,
      hideSelf,
      () => {
        if (type === Type.CANCEL) {
          changedRelationStatus(getSelectedItem(), undefined);
        } else {
          onFriendRemoved(getSelectedItem()?.userId ?? -1);
        }
      }
    );

    return (
      <AppPopUp
        isVisible={shouldShow}
        title={title}
        message={message}
        customActionButtons={
          <View>
            <View
              style={[
                styles.separator,
                { backgroundColor: theme.themedColors.separator }
              ]}
            />
            <AppButton
              text={firstButtonText}
              style={styles.actionContainer}
              shouldShowProgressBar={
                type === Type.FRIEND_REQUEST ||
                type === Type.FRIENDS_ROOMMATE_REQUEST ||
                type === Type.MATCHES_ROOMMATE_REQUEST
                  ? shouldShowPb
                  : shouldShowRelationUpdatePb
              }
              onPress={() => {
                if (
                  type === Type.FRIEND_REQUEST ||
                  type === Type.FRIENDS_ROOMMATE_REQUEST ||
                  type === Type.MATCHES_ROOMMATE_REQUEST
                ) {
                  sendRequest(getSelectedItem());
                } else if (
                  type === Type.CANCEL ||
                  type === Type.UNFRIEND
                ) {
                  updateRelation(getSelectedItem());
                }
              }}
              textStyle={[
                styles.actionStyle,
                {
                  color: theme.themedColors.primary,
                  textAlign: "center",
                  fontSize: FONT_SIZE.base
                }
              ]}
              fontWeight="semi-bold"
            />
            <View
              style={[
                styles.separator,
                { backgroundColor: theme.themedColors.separator }
              ]}
            />
            <AppButton
              text="Cancel"
              style={styles.actionContainer}
              onPress={() => {
                hideSelf();
              }}
              textStyle={[
                styles.actionStyle,
                {
                  color: theme.themedColors.label,
                  fontSize: FONT_SIZE.base
                }
              ]}
            />
          </View>
        }
      />
    );
  }
);

const styles = StyleSheet.create({
  actionStyle: {
    textAlign: "center",
    fontSize: FONT_SIZE.lg
  },
  actionContainer: {
    padding: SPACE.md
  },
  separator: {
    height: 0.5
  }
});
export default TwoButtonsAlert;
