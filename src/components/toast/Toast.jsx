import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { notify } from '../../utils/helperFunctions/notify';
import { resetUserMessage } from '../../store/slices/userSlice';

export function Toast() {
  const { message, error } = useSelector((state) => state.user);
  const { token } = useSelector((state) => state.token);
  const dispatch = useDispatch();

  useEffect(() => {
    message && notify('success', message);
    error && notify('error', error);
    !token && notify('error', 'Please login to comtinue!');

    const timeout = setTimeout(() => {
      (message || error) && dispatch(resetUserMessage());
    }, 3000);

    return () => clearTimeout(timeout);
  }, [message, error, token, dispatch]);

  return (
    <ToastContainer
      position="top-center"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"
    />
  );
}
