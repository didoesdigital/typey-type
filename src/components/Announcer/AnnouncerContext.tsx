import { createContext } from "react";

export const ContextData = createContext({ message: "" });

export const ContextApi = createContext({
  updateMessage: (message: string) => {
    // do nothing
  },
});

export const AnnouncerDataProvider = ContextData.Provider;
export const AnnouncerApiProvider = ContextApi.Provider;
