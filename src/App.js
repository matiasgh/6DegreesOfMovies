import Signup from "./components/Signup" 
import Menu from "./components/Menu"
import Login from "./components/Login"
import {Container} from "react-bootstrap"
import {AuthProvider} from "./contexts/AuthContext"
import {GameProvider} from "./contexts/GraphContext"
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import { GiFilmSpool } from "react-icons/gi"
import PrivateRoute from './components/PrivateRoute'
import Game from "./components/Game"


function App() {
  return (
    <AuthProvider>
      <GameProvider>
      <Container fluid style={{backgroundColor: "coral"}}>
        <h3 style={{color:"#fff", marginLeft:"150px", backgroundColor: "coral"}}> <br/> <GiFilmSpool style={{color:"black"}}/> 6 Degrees Of Movies<br/></h3>
        <br/>
      </Container>
      <Router>
          <Switch>
              <PrivateRoute exact path="/" component={Menu}/>
              <Route path ="/game" component={Game}/>
            <Container fluid style ={{maxWidth: "1000px"}}>
              <Route path = "/signup" component={Signup}/>
              <Route path = "/login" component={Login}/>
            </Container>
          </Switch>
      </Router>
      </GameProvider>
    </AuthProvider>
  );
}

export default App;
