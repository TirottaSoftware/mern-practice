import './App.css';
import ItemList from './components/ItemList';
import Register from './components/Register';
import Login from './components/Login';

function App() {
  return (
    <div className="App">
      <Login />
      <h1 className = "heading">Cristian's List</h1>
      <ItemList />
    </div>
  );
}

export default App;
