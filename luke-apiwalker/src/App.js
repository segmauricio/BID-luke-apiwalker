import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import Personas from './Personas/Personas';
import Principal from './Principal/Principal';

function App() {
  return (
    <BrowserRouter>
        <div className="App">
          <Route path='/' exact render={() => <Principal/>} />
          <Route path='/:id' exact render={(routeProps) => <Personas {...routeProps} />} />
        </div>
    </BrowserRouter>
  );
}

export default App;
