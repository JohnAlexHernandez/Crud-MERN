import React, { Component } from "react";
import './styles.css';

class Usuarios extends Component {
  constructor() {
    super();
    this.state = {
      _id: "",
      nombre: "",
      email: "",
      contrasenia: "",
      isRegister: false,
      usuarios: [],
    };
    this.handleChange = this.handleChange.bind(this);
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
          M.toast({ html: "Usuario Saved" });
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

  iniciarSesion() {}

  registrarse(){
    this.setState({isRegister: !this.state.isRegister});
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
          <div className="col s5">
            <div className="card">
              <div className="card-content">
                <form onSubmit={this.addUsuario}>
                  <div className="row">
                    <div className="input-field col s12">
                      <input
                        class="validate"
                        name="nombre"
                        onChange={this.handleChange}
                        type="text"
                        placeholder="Nombre usuario"
                        value={this.state.nombre}
                        required 
                        aria-required="true"
                      ></input>
                      <span className="helper-text" data-error="Nombre usuario no válido" data-success="Nombre usuario válido">¡Los errores aparecen instantáneamente!</span>
                    </div>

                    <div className="input-field col s12">
                      <input
                        class="validate"
                        name="email"
                        onChange={this.handleChange}
                        type="email"
                        placeholder="Email usuario"
                        value={this.state.email}
                        required 
                        aria-required="true"
                      ></input>
                      <span className="helper-text" data-error="Email no válido" data-success="Email válido">¡Los errores aparecen instantáneamente!</span>
                    </div>

                    <div className="input-field col s12">
                      <input
                        class="validate"
                        name="contrasenia"
                        onChange={this.handleChange}
                        type="password"
                        placeholder="Contraseña usuario"
                        value={this.state.contrasenia}
                        required 
                        aria-required="true"
                      ></input>
                      <span className="helper-text" data-error="Contraseña no válida" data-success="Contraseña válida">¡Los errores aparecen instantáneamente!</span>
                    </div>

                    <button type="submit" className="btn light-blue darken-4">
                      Enviar
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

export default Usuarios;
