import './App.css'
import Login from '../components/login'
import { BrowserRouter, Route} from 'react-router-dom';
import Success from '../components/Success';

function App() {
  return (
       <>
       <BrowserRouter>
          <Route exact path="/">
            <Login />
          </Route>
          <Route exact path="/success">
            <Success />
          </Route>
          </BrowserRouter>
    </>
  );
}

export default App
