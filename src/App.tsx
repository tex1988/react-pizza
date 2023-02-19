import './scss/app.scss';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Cart from './pages/Cart';
import { Route, Routes } from 'react-router-dom';
import PizzaDescription from './pages/PizzaDescription';
import MainLayout from './layouts/MainLayout';
import { ReactElement } from 'react';

function App(): ReactElement | null {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path={'/'} element={<Home />} />
        <Route path={'/cart'} element={<Cart />} />
        <Route path={'/pizza/:id'} element={<PizzaDescription />} />
        <Route path={'*'} element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
