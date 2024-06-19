import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const notify = (type, message) => {
  type === 'success' &&
    toast.success(message, {
      position: 'top-center',
    });

  type === 'error' &&
    toast.error(message, {
      position: 'top-center',
    });
};
