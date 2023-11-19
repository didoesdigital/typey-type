import React, { FC, useMemo, useCallback, useState } from "react";
import {
  AnnouncerApiProvider,
  AnnouncerDataProvider,
} from "./AnnouncerContext";

type Props = {
  children: React.ReactNode;
};

const AnnouncerController: FC<Props> = ({ children }) => {
  const [message, setMessage] = useState("");

  const data = useMemo(() => ({ message }), [message]);

  const updateMessage = useCallback((msg) => setMessage(msg), []);

  const api = useMemo(
    () => ({
      updateMessage,
    }),
    [updateMessage]
  );

  return (
    <AnnouncerDataProvider value={data}>
      <AnnouncerApiProvider value={api}>{children}</AnnouncerApiProvider>
    </AnnouncerDataProvider>
  );
};

export default AnnouncerController;
