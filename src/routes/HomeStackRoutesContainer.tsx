import React, { useCallback, useEffect } from "react";
import { HomeStackRoutes } from "routes/HomeStackRoutes";
import AppDataProvider from "ui/screens/home/friends/AppDataProvider";
import { SocketHelper } from "utils/SocketHelper";
import { useAuth } from "hooks";

export const HomeStackRoutesContainer = () => {
  const auth = useAuth();

  //Connect socket
  const connectSocket = useCallback(async () => {
    await SocketHelper.getInstance(
      "Bearer " + auth.user?.authentication?.accessToken
    );
  }, [auth.user]);

  useEffect(() => {
    connectSocket()
      .then((_) => {})
      .catch();
  }, [connectSocket]);
  //Connect Socket End

  return (
    <AppDataProvider>
      <HomeStackRoutes />
    </AppDataProvider>
  );
};
