import React from "react";

export const ContextData = React.createContext({ message: "" });

export const ContextApi = React.createContext({
  updateMessage: (message: string) => {},
});

export const AnnouncerDataProvider = ContextData.Provider;
export const AnnouncerApiProvider = ContextApi.Provider;
