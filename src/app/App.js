import React, { Component } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Productos from './componentes/Productos';
import Categorias from './componentes/Categorias';
import Usuarios from './componentes/Usuarios';
import Login from './componentes/Login';

class App extends Component {

  constructor(){
    super();

    this.state = {
        active: ''
    };
    this.logout = this.logout.bind(this);
  }

  componentDidMount(){
    if(localStorage.getItem("id")){
      document.getElementById('categorias').style.display = "inline";
    }
  }

  logout() {
    localStorage.setItem("id", "");
    document.getElementById('categorias').style.display = "none";
    document.getElementById('logout').style.display = "none";
    document.getElementById('registrarse').style.display = "inline";
    document.getElementById('login').style.display = "inline";
  }

  login(){
    if(localStorage.getItem("id")){
      document.getElementById('logout').style.display = "inline";
      document.getElementById('registrarse').style.display = "none";
      document.getElementById('login').style.display = "none";
    }
  }

  render() {
    return (
        <BrowserRouter>
      <div>
        {/* Navigation */}

        <nav className="nav-wrapper blue darken-4">
          <div className="nav-wrapper">
            <a href="/" class="brand-logo center">Gestionar productos</a>

            <ul className="left hide-on-med-and-down">
                <li><Link id="categorias" to="/categorias">Categorias</Link></li>
            </ul>
            <ul class="right hide-on-med-and-down">
                <li><Link id="registrarse" to="/usuarios">Registrarse</Link></li>
                <li><Link id="login" to="/login" onClick={() => this.login()}>Login</Link></li>
                <li><Link to='/login'><a id="logout" href="#" onClick={() => this.logout()}>Logout</a></Link></li>
            </ul>
          </div>
        </nav>
        
        <Routes>
            <Route path="/productos" exact element={<Productos></Productos>} />
            <Route path="/categorias" exact element={<Categorias></Categorias>} />
            <Route path="/usuarios" exact element={<Usuarios></Usuarios>} />
            <Route path="/login" exact element={<Login></Login>} />
        </Routes>
      </div>
        </BrowserRouter>
    );
  }
}

export default App;
