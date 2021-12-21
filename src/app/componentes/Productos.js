import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './styles.css';

class Productos extends Component {

    constructor(){
        super();
        this.state = {
            _id: '',
            nombre: '',
            tipo: '',
            precio: '',
            cantidad: '',
            categoria: '',
            search: '',
            categorias: [],
            productos: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.changeSelect = this.changeSelect.bind(this);
        this.addProduct = this.addProduct.bind(this);
    }

    addProduct(e){
        if(this.state._id){
            fetch('/api/producto/' + this.state._id, {
                method: 'PUT',
                body: JSON.stringify(this.state),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                M.toast({html: 'Producto updated'})
                this.setState({ _id: '',
                                nombre: '',
                                tipo: '',
                                precio: '',
                                cantidad: '',
                                categorias: []
                });
                this.fetchProductos();
                this.fetchCategorias();
            })
            .catch(err => console.log(err));
            e.preventDefault();
        }else{
            fetch('/api/producto/' + localStorage.getItem("idCategoria"), {
                method: 'POST',
                body: JSON.stringify(this.state),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                M.toast({html: 'Producto Saved'});
                this.setState({ nombre: '',
                                tipo: '',
                                precio: '',
                                cantidad: '',
                                categorias: []
                });
                this.fetchProductos();
                this.fetchCategorias();
            })
            .catch(err => console.log(err));
            e.preventDefault();
        }
    }

    componentDidMount(){
        this.fetchProductos();
        this.fetchCategorias();
    }

    fetchProductos(){
        fetch('/api/producto/categoria/' + localStorage.getItem("idCategoria"))
        .then(res => res.json())
        .then(data => {
            this.setState({ productos: data});
            console.log(this.state.productos);
        });
    }

    fetchCategorias(){
        fetch('/api/categoria/' + localStorage.getItem("id"))
        .then(res => res.json())
        .then(data => {
            this.setState({ categorias: data});
            console.log(this.state.categorias);
        });
    }

    deleteProduct(id){
        if(confirm('Are you sure you want to delete it?')){
            fetch('/api/producto/' +  id, {
                method: 'DELETE',
                body: JSON.stringify(this.state),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                M.toast({html: 'Producto Deleted'});
                this.fetchProductos();
            }
            );
        }
    }

    editProduct(id){
        fetch('/api/producto/' + id)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            this.setState({
                _id: data._id,
                nombre: data.nombre,
                tipo: data.tipo,
                precio: data.precio,
                cantidad: data.cantidad,
                categoria: localStorage.getItem("idCategoria")
            })
        });
    }

    changeSelect(e){
        this.setState({ categoria: e._id })
    }

    handleChange(e){
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    }

    handleSearch(e){
        this.setState({
            search: e.target.value
        });
    }

    render() {
        return (
            <div className="container">
                    <div className='row'>
                        <div className='col s5'>
                            <div className='card'>
                                <div className='card-content'>
                                    <form onSubmit={this.addProduct}>
                                        <div className='row'>
                                            <div className='input-field col s12'>
                                                <input class="validate" name='nombre' onChange={this.handleChange} type='text' placeholder='Nombre producto' value={this.state.nombre} required aria-required="true"></input>
                                                <span className="helper-text" data-error="Nombre producto no válido" data-success="Nombre producto válido">¡Los errores aparecen instantáneamente!</span>
                                            </div>

                                            <div className='input-field col s12'>
                                                <input class="validate" name='tipo' onChange={this.handleChange} type='text' placeholder='Tipo producto' value={this.state.tipo} required aria-required="true"></input>
                                                <span className="helper-text" data-error="Tipo producto no válido" data-success="Tipo producto válido">¡Los errores aparecen instantáneamente!</span>
                                            </div>

                                            <div className='input-field col s12'>
                                                <input class="validate" name='precio' onChange={this.handleChange} type='number' placeholder='Precio producto' value={this.state.precio} pattern="^[0-9]+" required aria-required="true"></input>
                                                <span className="helper-text" data-error="Precio producto no válido" data-success="Precio producto válido">¡Los errores aparecen instantáneamente!</span>
                                            </div>

                                            <div className='input-field col s12'>
                                                <input class="validate" name='cantidad' onChange={this.handleChange} type='number' placeholder='Cantidad producto' value={this.state.cantidad} pattern="^[0-9]+" required aria-required="true"></input>
                                                <span className="helper-text" data-error="Catidad producto no válido" data-success="Cantidad producto válido">¡Los errores aparecen instantáneamente!</span>
                                            </div>
                                            <Link to='/categorias'>
                                                <button className='btn light-blue darken-4'>
                                                    Volver a categorias         
                                                </button>
                                            </Link>
                                            <button type='submit' className='btn light-blue darken-4' style={{margin: '4px'}}>
                                                Enviar
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className='col s7'>
                            <div className='seacrh'>
                                <input id="search" type="text" placeholder='search...' onChange={this.handleSearch} />
                            </div>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Nombre</th>
                                        <th>Tipo</th>
                                        <th>Precio</th>
                                        <th>Cantidad</th>
                                        <th>Editar</th>
                                        <th>Eliminar</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.productos.filter((producto) => {
                                            if(this.state.search ==''){
                                                return producto;
                                            }
                                            else if(producto.nombre.toLowerCase().includes(this.state.search.toLowerCase()) || producto.tipo.toLowerCase().includes(this.state.search.toLowerCase())){
                                                return producto;
                                            }
                                        }).map(producto => {
                                            return(
                                                <tr key={producto._id}>
                                                    <td>{producto.nombre}</td>
                                                    <td>{producto.tipo}</td>
                                                    <td>{producto.precio}</td>
                                                    <td>{producto.cantidad}</td>
                                                    <td>
                                                        <button className='btn light-blue darken-4' onClick={() => this.editProduct(producto._id)}>
                                                            <i className='material-icons'>edit</i>         
                                                        </button>
                                                    </td>
                                                    <td>
                                                        <button className='btn light-blue darken-4' onClick={() => this.deleteProduct(producto._id)} style={{margin: '4px'}}>
                                                            <i className='material-icons'>delete</i>         
                                                        </button>
                                                    </td>
                                                </tr>
                                            )      
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div> 
        )
    }
}

export default Productos;