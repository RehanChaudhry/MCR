import React from "react";
import { HomeStackRoutes } from "routes/HomeStackRoutes";
import AppDataProvider from "ui/screens/home/friends/AppDataProvider";

export const HomeStackRoutesContainer = () => {
  return (
    <AppDataProvider>
      <HomeStackRoutes />
    </AppDataProvider>
  );
};
