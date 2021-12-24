import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import { HomeTemplate } from './templates/HomeTemplate/HomeTemplate';
import Home from './components/Home';
import TodoListRCC from './TodoList/TodoListRCC.js';
import TodoListRFC from './TodoList/TodoListRFC';
import TodoListThunk from './TodoList/TodoListThunk';
import TodoListSaga from './TodoList/TodoListSaga';


function App() {
  return (
    <BrowserRouter>
      <Switch>
        
          <HomeTemplate exact path = "/" Component={Home}/>
          <HomeTemplate exact path = "/home" Component={Home}/>
          <HomeTemplate exact path = "/todolistRCC" Component={TodoListRCC}/>
          <HomeTemplate exact path = "/todolistRFC" Component={TodoListRFC}/>
          <HomeTemplate exact path = "/todoListThunk" Component={TodoListThunk}/>
          <HomeTemplate exact path = "/todoListSaga" Component={TodoListSaga}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
