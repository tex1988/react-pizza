import Header from '../components/Header';
import { Outlet } from 'react-router-dom';
import { ReactElement } from 'react';

function MainLayout(): ReactElement | null {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
}

export default MainLayout;
