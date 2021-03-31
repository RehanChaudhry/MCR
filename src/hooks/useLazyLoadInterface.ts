import React, { useEffect, useState } from "react";
import { InteractionManager } from "react-native";

export default (
  loadingView: React.ReactNode,
  actualView: React.ReactNode
) => {
  const [interactionComplete, setInteractionComplete] = useState(false);
  useEffect(() => {
    InteractionManager.runAfterInteractions(() => {
      setInteractionComplete(true);
    });
  });
  if (!interactionComplete) {
    return loadingView;
  } else {
    return actualView;
  }
};
