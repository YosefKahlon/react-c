import { useNotificationStore } from '../../stores/notifications';
import './ToastHost.css';

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
              {notification.type === 'success' && '✓'}
              {notification.type === 'error' && '✕'}
              {notification.type === 'info' && 'ℹ'}
              {notification.type === 'warning' && '⚠'}
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