import { FONT_SIZE, SPACE, STRINGS } from "config";
import { usePreferredTheme } from "hooks";
import React, { useCallback, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  FlatListProps,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle
} from "react-native";
import { AppLoadMore } from "ui/components/atoms/app_load_more/AppLoadMore";
import ErrorWithRetryView from "ui/components/molecules/ErrorWithRetryView";
import { AppLabel } from "ui/components/atoms/app_label/AppLabel";
import NoRecordFound from "assets/images/empty_state.svg";

interface OwnProps<ItemT> extends FlatListProps<ItemT> {
  shouldShowProgressBar?: boolean;
  error?: string;
  errorView?: (errorText: string) => React.ReactElement | null;
  retryCallback?: () => void;
  pullToRefreshCallback?: (onComplete: () => void) => void;
  style?: StyleProp<ViewStyle>;
  ItemSeparatorHeaderAndFooterComponent?: React.ComponentType<any> | null;
  isAllDataLoaded?: boolean;
  noRecordFoundText?: string;
  listRef?: React.RefObject<FlatList>;
  noRecordFoundImage?: React.ReactElement;
  noRecordFoundStyle?: StyleProp<ViewStyle>;
}

type Props<ItemT> = OwnProps<ItemT>;

export function FlatListWithPb<ItemT extends any>(props: Props<ItemT>) {
  const {
    style,
    shouldShowProgressBar,
    error,
    errorView,
    retryCallback,
    pullToRefreshCallback,
    ItemSeparatorHeaderAndFooterComponent,
    isAllDataLoaded = true,
    noRecordFoundText = STRINGS.common.no_record_found,
    onEndReached,
    listRef,
    noRecordFoundImage,
    noRecordFoundStyle,
    ...rest
  } = props;

  const [refreshing, setRefreshing] = useState(false);
  const theme = usePreferredTheme();
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    pullToRefreshCallback?.(() => {
      setRefreshing(false);
    });
  }, [pullToRefreshCallback]);

  function shouldShowError() {
    return error !== undefined && !dataHasRecords();
  }

  function getErrorView() {
    if (error !== undefined && errorView !== undefined) {
      return errorView(error);
    } else {
      return (
        <ErrorWithRetryView
          text={error}
          retryCallback={retryCallback}
          style={styles.errorView}
        />
      );
    }
  }

  const { data } = rest;

  function dataHasRecords() {
    return (data?.length ?? 0) > 0;
  }

  const footerWrapper = React.memo<Props<any>>(() => {
    return (
      <>
        {!isAllDataLoaded && dataHasRecords() && (
          <View style={styles.loadMore}>
            <AppLoadMore testID="loader" />
          </View>
        )}
        {ItemSeparatorHeaderAndFooterComponent}
      </>
    );
  });

  function getNormalView() {
    if (shouldShowError()) {
      return getErrorView();
    }

    if (!shouldShowError()) {
      let ui = (
        <FlatList
          // initialNumToRender={7}
          ref={listRef}
          onEndReachedThreshold={1}
          refreshing={refreshing}
          onRefresh={
            pullToRefreshCallback === undefined ? undefined : onRefresh
          }
          onEndReached={
            isAllDataLoaded || !dataHasRecords() ? undefined : onEndReached
          }
          ItemSeparatorComponent={ItemSeparatorHeaderAndFooterComponent}
          ListHeaderComponent={ItemSeparatorHeaderAndFooterComponent}
          ListFooterComponent={footerWrapper}
          {...rest}
        />
      );

      if (!dataHasRecords()) {
        return (
          <>
            <View style={[styles.noRecordParent, noRecordFoundStyle]}>
              {noRecordFoundImage ? (
                noRecordFoundImage
              ) : (
                <NoRecordFound
                  width={"100%"}
                  height={"50%"}
                  fillPrimary={theme.themedColors.primary}
                  fillSecondary={theme.themedColors.secondary}
                />
              )}

              <AppLabel
                text={noRecordFoundText}
                style={[
                  styles.noRecord,
                  { color: theme.themedColors.label }
                ]}
              />
            </View>
            {ui}
          </>
        );
      } else {
        return ui;
      }
    }
  }

  return (
    <View style={style}>
      {shouldShowProgressBar && data === undefined && (
        <ActivityIndicator
          testID="initial-loader"
          size="large"
          color={theme.themedColors.primary}
          style={[
            styles.initialPb,
            { backgroundColor: theme.themedColors.backgroundSecondary }
          ]}
        />
      )}

      {!(shouldShowProgressBar && data === undefined) && getNormalView()}
    </View>
  );
}

const styles = StyleSheet.create({
  errorView: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
  noRecordParent: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: SPACE.lg
  },
  noRecord: {
    textAlign: "center",
    fontSize: FONT_SIZE.lg
  },
  loadMorePb: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
    marginBottom: 16
  },
  initialPb: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
  loadMore: {
    marginTop: SPACE.lg,
    height: SPACE._3xl,
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center"
  }
});
