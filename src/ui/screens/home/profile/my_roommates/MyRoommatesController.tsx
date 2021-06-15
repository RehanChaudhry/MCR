import { PaginationParamsModel } from "models/api_requests/PaginationParamsModel";
import RelationApiResponseModel from "models/api_responses/RelationApiResponseModel";
import RelationModel from "models/RelationModel";
import React, {
  FC,
  useCallback,
  useEffect,
  useRef,
  useState
} from "react";
import { Alert } from "react-native";
import { useApi } from "repo/Client";
import RelationsApis from "repo/friends/FriendsApis";
import MyRoommatesView from "ui/screens/home/profile/my_roommates/MyRoommatesView";

type Props = {};

const MyRoommatesController: FC<Props> = () => {
  const [myRoommates, setMyRoommates] = useState<
    RelationModel[] | undefined
  >(undefined);

  const requestModel = useRef<PaginationParamsModel>({});

  const getMyRoommatesApi = useApi<
    PaginationParamsModel,
    RelationApiResponseModel
  >(RelationsApis.getRelations);

  const fetchMyRoommates = useCallback(async () => {
    const {
      hasError,
      errorBody,
      dataBody
    } = await getMyRoommatesApi.request([requestModel.current]);

    if (hasError || dataBody === undefined) {
      Alert.alert("Unable to fetch posts", errorBody);
      return;
    } else {
      setMyRoommates((prevState) => {
        return [
          ...(prevState === undefined ? [] : prevState),
          ...dataBody?.data!
        ];
      });
    }
  }, [getMyRoommatesApi]);

  useEffect(() => {
    fetchMyRoommates().then().catch();
  }, [fetchMyRoommates]);

  return <MyRoommatesView data={myRoommates} />;
};

export default MyRoommatesController;
