import './App.css';
import './scss/app.scss';
import Header from './components/Header';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Cart from './pages/Cart';
import { Route, Routes } from 'react-router-dom';
import PizzaDescription from './pages/PizzaDescription';
import MainLayout from "./layouts/MainLayout";

function App() {
  return (
    <Routes>
        <Route path="/" element={<MainLayout/>}>
            <Route path={'/'} element={<Home />} />
            <Route path={'/cart'} element={<Cart />} />
            <Route path={'/pizza/:id'} element={<PizzaDescription />} />
            <Route path={'*'} element={<NotFound />} />
        </Route>
    </Routes>
  );
}

export default App;
