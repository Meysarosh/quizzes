import { Outlet } from 'react-router-dom';
import './App.css';
import { Toast } from './components/Toast.jsx';

export default function App() {
  return (
    <>
      <Toast />
      <Outlet />
    </>
  );
}
