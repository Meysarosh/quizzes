import { Outlet } from 'react-router-dom';
import './App.css';
import { Toast } from './components/Toast.jsx';
import { GlobalStyles } from './styles';

export default function App() {
  return (
    <>
      <GlobalStyles />
      <Toast />
      <Outlet />
    </>
  );
}
