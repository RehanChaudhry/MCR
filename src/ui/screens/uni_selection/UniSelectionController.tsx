import {
  Uni,
  UniSelectionResponseModel
} from "models/api_responses/UniSelectionResponseModel";
import React, { FC, useState } from "react";
import { useApi } from "repo/Client";
import DataGenerator from "utils/DataGenerator";
import UniSelectionView from "./UniSelectionView";
import UniSelectionApis from "../../../repo/auth/UniSelectionApis";
import { AppLog } from "utils/Util";

type Props = {};

const UniSelectionController: FC<Props> = () => {
  const [unis, setUnis] = useState<Array<Uni>>(
    DataGenerator.getUnis().data
  );

  const unisApi = useApi<any, UniSelectionResponseModel>(
    UniSelectionApis.getUnis
  );

  const handleGetUnisApi = async (onComplete?: () => void) => {
    const { hasError, dataBody, errorBody } = await unisApi.request([]);
    if (hasError || dataBody === undefined) {
      AppLog.log("Unable to find unis " + errorBody);
      return;
    } else {
      setUnis(dataBody.data);
      onComplete?.();
    }
  };

  const uniDidSelect = (item: Uni) => {
    AppLog.log("selected item: ", item);
  };

  AppLog.log("handle getuni api: ", handleGetUnisApi);

  return (
    <UniSelectionView
      isError={unisApi.error}
      isLoading={unisApi.loading}
      unis={unis}
      didSelectItem={uniDidSelect}
    />
  );
};

export default UniSelectionController;
