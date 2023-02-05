import './App.css';
import  './scss/app.scss'
import Header from "./components/Header";
import Categories from "./components/Categories";
import Sort from "./components/Sort";
import PizzaBlock from "./components/PizzaBlock";

function App() {
    return (
      <div className="wrapper">
        <Header />
        <div className="content">
          <div className="container">
            <div className="content__top">
              <Categories />
              <Sort />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
              <PizzaBlock title="Some pizza 1" price="100"/>
              <PizzaBlock title="Some pizza 2" price="200"/>
              <PizzaBlock title="Some pizza 3" price="300"/>
              <PizzaBlock title="Some pizza 4" price="400"/>
            </div>
          </div>
        </div>
      </div>
    );
}

export default App;
