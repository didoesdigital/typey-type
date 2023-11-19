import { useContext } from "react";
import { ContextData, ContextApi } from "./AnnouncerContext";

export const useAnnouncerData = () => useContext(ContextData);
export const useAnnouncerApi = () => useContext(ContextApi);
