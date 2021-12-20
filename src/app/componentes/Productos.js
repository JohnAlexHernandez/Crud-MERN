import React, { Component } from 'react';
import Select from 'react-select';

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
            categorias: [],
            productos: []
        };
        this.handleChange = this.handleChange.bind(this);
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
            fetch('/api/producto/' + this.state.categoria, {
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
        fetch('/api/producto/' + localStorage.getItem("id"))
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
                cantidad: data.cantidad
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
                                                <input name='nombre' onChange={this.handleChange} type='text' placeholder='Nombre producto' value={this.state.nombre}></input>
                                            </div>

                                            <div className='input-field col s12'>
                                                <input name='tipo' onChange={this.handleChange} type='text' placeholder='Tipo producto' value={this.state.tipo}></input>
                                            </div>

                                            <div className='input-field col s12'>
                                                <input name='precio' onChange={this.handleChange} type='number' placeholder='Precio producto' value={this.state.precio}></input>
                                            </div>

                                            <div className='input-field col s12'>
                                                <input name='cantidad' onChange={this.handleChange} type='number' placeholder='Cantidad producto' value={this.state.cantidad}></input>
                                            </div>

                                            <div className='input-field col s12'> 
                                                <Select 
                                                    onChange={this.changeSelect}
                                                    options={this.state.categorias}
                                                    getOptionLabel={(options) => options['nombre']}
                                                    getOptionValue={(options) => options['_id']}
                                                />
                                            </div>
                                            <button type='submit' className='btn light-blue darken-4'>
                                                Enviar
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className='col s7'>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Nombre</th>
                                        <th>Tipo</th>
                                        <th>Precio</th>
                                        <th>Cantidad</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.productos.map(producto => {
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