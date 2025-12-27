import { useNotificationStore } from '../stores/notifications';

export const useToast = () => {
  const { addNotification } = useNotificationStore();

  return {
    success: (message: string, timeout = 3000) =>
      addNotification({ type: 'success', message, timeout }),
    error: (message: string, timeout = 5000) =>
      addNotification({ type: 'error', message, timeout }),
    info: (message: string, timeout = 4000) =>
      addNotification({ type: 'info', message, timeout }),
    warning: (message: string, timeout = 4000) =>
      addNotification({ type: 'warning', message, timeout }),
  };
};