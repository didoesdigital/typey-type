import { useContext } from "react";
import { ContextData, ContextApi } from "./TPEURPBGSContext";

export const useTPEURPBGSData = () => useContext(ContextData);
export const useTPEURPBGSApi = () => useContext(ContextApi);
