import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const notify = (type, message) => {
  switch (type) {
    case 'success':
      toast.success(message, {
        position: 'top-center',
      });
      break;
    case 'error':
      toast.error(message, {
        position: 'top-center',
      });
      break;
    case 'info':
      toast.info(message, {
        position: 'top-center',
      });
      break;
    case 'warn':
      toast.warn(message, {
        position: 'top-center',
      });
      break;
    case 'default':
      toast(message);
      break;
    case 'custom':
      toast(message, {
        position: 'bottom-right',
        className: 'foo-bar',
      });
      break;
    default:
      break;
  }
};
