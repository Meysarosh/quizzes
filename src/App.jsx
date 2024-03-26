import { Outlet } from 'react-router-dom';
import { Toast } from './components/toast';

export default function App() {
  return (
    <>
      <Toast />
      <Outlet />
    </>
  );
}
