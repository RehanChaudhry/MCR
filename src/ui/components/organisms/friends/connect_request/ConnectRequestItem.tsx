import { FONT_SIZE, SPACE } from "config";
import { useAuth, usePreferredTheme } from "hooks";
import RelationModel from "models/RelationModel";
import React, { FC, useCallback } from "react";
import { Image, StyleSheet, View } from "react-native";
import { AppLabel } from "ui/components/atoms/app_label/AppLabel";
import { AppButton } from "ui/components/molecules/app_button/AppButton";
import useUpdateRelation from "ui/screens/home/friends/useUpdateRelation";
import { shadowStyleProps } from "utils/Util";
import { useApi } from "repo/Client";
import { FetchMyProfileResponseModel } from "models/api_responses/FetchMyProfileResponseModel";
import AuthApis from "repo/auth/AuthApis";

type Props = {
  item: RelationModel;
  removeItemFromList: (item: RelationModel) => void;
};

const ConnectRequestItem: FC<Props> = ({ item, removeItemFromList }) => {
  const theme = usePreferredTheme();

  const { user, saveProfile } = useAuth();

  const fetchProfileApi = useApi<string, FetchMyProfileResponseModel>(
    AuthApis.fetchMyProfile
  );

  const fetchUserApi = useCallback(async () => {
    const {
      hasError: hasErrorProfile,
      dataBody
    } = await fetchProfileApi.request([]);

    if (!hasErrorProfile) {
      await saveProfile(dataBody?.data!, user!);
    }
  }, [fetchProfileApi, saveProfile, user]);

  const {
    shouldShowPb: acceptRequestPb,
    updateRelation: acceptRequest
  } = useUpdateRelation(
    "accepted",
    "Unable to accept the request",
    undefined,
    (_item) => {
      removeItemFromList(item);
      if (!user?.profile?.agreementId) {
        fetchUserApi().then().catch();
      }
    }
  );

  const {
    shouldShowPb: rejectRequestPb,
    updateRelation: rejectRequest
  } = useUpdateRelation(
    "rejected",
    "Unable to reject the request",
    undefined,
    (_item) => {
      removeItemFromList(item);
    }
  );

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.contentContainer,
          { backgroundColor: theme.themedColors.background }
        ]}>
        <View style={styles.infoContainer}>
          <Image
            style={[
              styles.profileImage,
              { backgroundColor: theme.themedColors.interface[200] }
            ]}
            source={{ uri: item.user?.profilePicture?.fileURL }}
          />
          <View style={styles.infoTextContainer}>
            <AppLabel
              style={[
                styles.titleText,
                { color: theme.themedColors.label }
              ]}
              text={item.user?.getFullName() ?? "N/A"}
            />
            <AppLabel
              style={[
                styles.subTitleText,
                { color: theme.themedColors.labelSecondary }
              ]}
              text={item.user?.getSubtitle()}
            />
          </View>
        </View>
        <View style={styles.actionsContainer}>
          <AppButton
            fontWeight={"semi-bold"}
            textStyle={[
              styles.actionButtonText,
              { color: theme.themedColors.primary }
            ]}
            buttonStyle={[
              styles.actionButton,
              { backgroundColor: theme.themedColors.primaryShade }
            ]}
            text={"Approve"}
            shouldShowProgressBar={acceptRequestPb}
            onPress={() => {
              if (!rejectRequestPb) {
                acceptRequest(item);
              }
            }}
          />
          <View style={styles.spacer} />
          <AppButton
            fontWeight={"semi-bold"}
            textStyle={[
              styles.actionButtonText,
              { color: theme.themedColors.danger }
            ]}
            shouldShowProgressBar={rejectRequestPb}
            buttonStyle={[
              styles.actionButton,
              { backgroundColor: theme.themedColors.dangerShade }
            ]}
            text={"Reject"}
            onPress={() => {
              if (!acceptRequestPb) {
                rejectRequest(item);
              }
            }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  actionButton: {
    height: 36,
    flex: 1
  },
  actionButtonText: {
    fontSize: FONT_SIZE.sm
  },
  actionsContainer: {
    flexDirection: "row",
    marginTop: SPACE.md
  },
  container: {
    paddingTop: SPACE.sm,
    paddingBottom: SPACE.sm,
    paddingLeft: SPACE.lg,
    paddingRight: SPACE.lg
  },
  contentContainer: {
    flexDirection: "column",
    borderRadius: 12,
    padding: SPACE.md,
    ...shadowStyleProps
  },
  infoContainer: {
    flexDirection: "row"
  },
  infoTextContainer: {
    flexDirection: "column",
    paddingLeft: SPACE.sm
  },
  profileImage: {
    width: 48,
    height: 48,
    borderRadius: 24
  },
  subTitleText: {
    fontSize: FONT_SIZE.xs,
    marginTop: SPACE._2xs
  },
  titleText: {
    fontSize: FONT_SIZE.base
  },
  spacer: {
    padding: SPACE.xs
  }
});

export default ConnectRequestItem;
