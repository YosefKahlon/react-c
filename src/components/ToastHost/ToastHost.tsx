import { useNotificationStore } from '../../stores/notifications';
import './ToastHost.css';

const getNotificationIcon = (type: string): string => {
  switch (type) {
    case 'success':
      return '✓';
    case 'error':
      return '✕';
    case 'info':
      return 'ℹ';
    case 'warning':
      return '⚠';
    default:
      return '';
  }
};

const ToastHost = () => {
  const { notifications, removeNotification } = useNotificationStore();

  return (
    <div className="toast-host">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`toast toast-${notification.type}`}
        >
          <div className="toast-content">
            <span className="toast-icon">
              {getNotificationIcon(notification.type)}
            </span>
            <p className="toast-message">{notification.message}</p>
          </div>
          <button
            className="toast-close"
            onClick={() => removeNotification(notification.id)}
            aria-label="Close notification"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
};

export default ToastHost;