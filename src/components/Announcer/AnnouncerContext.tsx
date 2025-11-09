import { createContext } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const ContextData = createContext({ message: "" });

// eslint-disable-next-line react-refresh/only-export-components
export const ContextApi = createContext({
  updateMessage: (message: string) => {
    // do nothing
  },
});

export const AnnouncerDataProvider = ContextData.Provider;
export const AnnouncerApiProvider = ContextApi.Provider;
