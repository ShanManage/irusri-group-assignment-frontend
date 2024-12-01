import { notification } from 'antd';
import { NotificationPlacement } from 'antd/es/notification/interface';

const useNotify = () => {
  const [api, contextHolder] = notification.useNotification();

  const notify = (
    message: string,
    description?: string,
    type: 'info' | 'success' | 'warning' | 'error' = 'info',
    placement: NotificationPlacement = 'bottomRight'
  ) => {
    api[type]({
      message,
      description,
      placement,
    });
  };

  return { notify, contextHolder };
};

export default useNotify;
