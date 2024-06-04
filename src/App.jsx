import { Outlet } from 'react-router-dom';
import { Toast } from './components/toast';
import { Header } from './components/header/Header';

export default function App() {
  return (
    <>
      <Header />
      <Toast />
      <Outlet />
    </>
  );
}
