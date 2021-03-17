import { FONT_SIZE, STRINGS } from "config";
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
import ErrorWithRetryView from "ui/components/molecules/ErrorWithRetryView";
import { AppLabel } from "ui/components/atoms/app_label/AppLabel";

interface OwnProps<ItemT> extends FlatListProps<ItemT> {
  shouldShowProgressBar: boolean;
  error?: string;
  errorView?: (errorText: string) => React.ReactElement | null;
  retryCallback?: () => void;
  pullToRefreshCallback?: (onComplete: () => void) => void;
  style: StyleProp<ViewStyle>;
  ItemSeparatorHeaderAndFooterComponent?: React.ComponentType<any> | null;
  isAllDataLoaded?: boolean;
  noRecordFoundText?: string;
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
    return error !== undefined;
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

  function getNormalView() {
    if (shouldShowError()) {
      return getErrorView();
    }

    if (!shouldShowError() && dataHasRecords()) {
      return (
        <FlatList
          // initialNumToRender={7}
          onEndReachedThreshold={1}
          refreshing={refreshing}
          onRefresh={
            pullToRefreshCallback === undefined ? undefined : onRefresh
          }
          onEndReached={isAllDataLoaded ? undefined : onEndReached}
          ItemSeparatorComponent={ItemSeparatorHeaderAndFooterComponent}
          ListHeaderComponent={ItemSeparatorHeaderAndFooterComponent}
          ListFooterComponent={ItemSeparatorHeaderAndFooterComponent}
          {...rest}
        />
      );
    }

    if (!shouldShowError() && !dataHasRecords()) {
      return (
        <View style={styles.noRecordParent}>
          <AppLabel
            text={noRecordFoundText}
            style={[styles.noRecord, { color: theme.themedColors.label }]}
          />
        </View>
      );
    }

    if (!isAllDataLoaded && shouldShowProgressBar && data !== undefined) {
      return (
        <ActivityIndicator
          testID="loader"
          style={[
            styles.loadMorePb,
            { backgroundColor: theme.themedColors.background }
          ]}
        />
      );
    }
  }

  return (
    <View style={style}>
      {shouldShowProgressBar && data === undefined && (
        <ActivityIndicator
          testID="initial-loader"
          style={styles.initialPb}
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
    alignItems: "center"
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
  }
});
