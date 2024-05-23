import React from "react";
import { useMount, useUnmount } from "ahooks";
import useNotification from "antd/es/notification/useNotification";

function _NotifyError({ message, title="Error", duration=0 }) {
  const [Notify, NotifyCtxHolder] = useNotification();

  useMount(() => message && Notify.error({ key: title, duration, message: title, description: message }));
  useUnmount(() => Notify.destroy(title));

  return <>{NotifyCtxHolder}</>;
};

const NotifyError = React.memo(_NotifyError, (prevProps, nextProps) => prevProps.message === nextProps.message);

export default NotifyError;