import React, { Component } from "react";

import './styles.css';

class Login extends Component {

  constructor() {
    super();

    const id = '';

    this.state = {
      _id: "",
      nombre: "",
      email: "",
      usuario: "",
      contrasenia: "",
      usuarios: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.iniciarSesion = this.iniciarSesion.bind(this);
    this.addUsuario = this.addUsuario.bind(this);
  }

  addUsuario(e) {
    if (this.state._id) {
      fetch("/api/usuario/" + this.state._id, {
        method: "PUT",
        body: JSON.stringify(this.state),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          M.toast({ html: "Usuario updated" });
          this.setState({ _id: "", nombre: "", email: "", contrasenia: "" });
          this.fetchUsuarios();
        })
        .catch((err) => console.log(err));
      e.preventDefault();
    } else {
      fetch("/api/usuario", {
        method: "POST",
        body: JSON.stringify(this.state),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          M.toast({ html: "Categoria Saved" });
          this.setState({ nombre: "", email: "", contrasenia: "" });
          this.fetchUsuarios();
        })
        .catch((err) => console.log(err));
      e.preventDefault();
    }
  }

  componentDidMount() {
    this.fetchUsuarios();
  }

  fetchUsuarios() {
    fetch("/api/usuario")
      .then((res) => res.json())
      .then((data) => {
        this.setState({ usuarios: data });
      });
  }

  deleteUsuario(id) {
    if (confirm("Are you sure you want to delete it?")) {
      fetch("/api/usuario/" + id, {
        method: "DELETE",
        body: JSON.stringify(this.state),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          M.toast({ html: "Usuario Deleted" });
          this.fetchUsuarios();
        });
    }
  }

  editUsuario(id) {
    fetch("/api/usuario/" + id)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        this.setState({
          _id: data._id,
          nombre: data.nombre,
          email: data.email,
          contrasenia: data.contrasenia,
        });
        this.fetchUsuarios();
      });
  }

  iniciarSesion(e) {
    fetch("/api/usuario/signin", {
      method: "POST",
      body: JSON.stringify(this.state),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        M.toast({ html: "Inicio de sesión exitoso" });
        this.setState({ usuario: data });
        localStorage.setItem("id", data._id);
      })
      .catch((err) =>  M.toast({ html: "Inicio de sesión fallido" }));
    e.preventDefault();
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }

  

  render() {
    return (
                <div className="container">
                <div className="row">
                <div className="col s7">
                    <div className="card">
                    <div className="card-content">
                        <form onSubmit={this.iniciarSesion}>
                        <div className="row">
                            <div className="input-field col s12">
                              <i class="material-icons prefix">email</i>
                              <input
                                  class="validate"
                                  type="email"
                                  name="email"
                                  onChange={this.handleChange}
                                  placeholder="Email usuario"
                                  value={this.state.email}
                                  required 
                                  aria-required="true"
                              />
                              <span className="helper-text" data-error="Email no válido" data-success="Email válido">¡Los errores aparecen instantáneamente!</span>
                              </div>
                            <div className="input-field col s12">
                              <i class="material-icons prefix">fingerprint</i>
                              <input
                                  class="validate"
                                  type="password"
                                  name="contrasenia"
                                  onChange={this.handleChange}
                                  placeholder="Contraseña usuario"
                                  value={this.state.contrasenia}
                                  required 
                                  aria-required="true"
                              />
                              <span className="helper-text" data-error="Contraseña no válida" data-success="Contraseña válida">¡Los errores aparecen instantáneamente!</span>
                            </div>
                                <button className="btn light-blue darken-4" type="submit">
                                 Iniciar Sesión
                                </button>
                        </div>
                        </form>
                    </div>
                    </div>
                </div>
                </div>
            </div>
    );
  }
}

export default Login;
