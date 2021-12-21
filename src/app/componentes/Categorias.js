import React, { Component }  from 'react';
import { Link } from "react-router-dom";
import './styles.css';

class Categorias extends Component {

    constructor(){
        super();

        this.state = {
            _id: '',
            nombre: '',
            descripcion: '',
            search: '',
            productos: [],
            categorias: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.addCategoria = this.addCategoria.bind(this);
        this.viewProducts = this.viewProducts.bind(this);
    }

    addCategoria(e){
        if(this.state._id){
            fetch('/api/categoria/' + this.state._id, {
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
                M.toast({html: 'Categoria updated'})
                this.setState({ _id: '',
                                nombre: '',
                                descripcion: '',
                                categorias: []
                });
                this.fetchCategorias();
            })
            .catch(err => console.log(err));
            e.preventDefault();
        }else{
            fetch('/api/categoria/' + localStorage.getItem("id") , {
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
                M.toast({html: 'Categoria Saved'});
                this.setState({ nombre: '',
                                descripcion: '',
                                categorias: []
                });
                this.fetchCategorias();
            })
            .catch(err => console.log(err));
            e.preventDefault();
        }
    }

    componentDidMount(){
        this.fetchCategorias();
    }

    viewProducts(id){
        localStorage.setItem("idCategoria", id);
        console.log(id);
    }

    fetchCategorias(){
        fetch('/api/categoria/user/' + localStorage.getItem("id"))
        .then(res => res.json())
        .then(data => {
            this.setState({ categorias: data});
            console.log(this.state.categorias);
        });
    }

    deleteCategoria(id){
        if(confirm('Are you sure you want to delete it?')){
            fetch('/api/categoria/' +  id, {
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
                M.toast({html: 'Categoria Deleted'});
                this.fetchCategorias();
            }
            );
        }
    }

    editCategoria(id){
        fetch('/api/categoria/' + id)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            this.setState({
                _id: data._id,
                nombre: data.nombre,
                descripcion: data.descripcion
            })
        });
    }

    handleChange(e){
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    }

    handleSearch(e){
        console.log(e.target.value);
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
                                    <form onSubmit={this.addCategoria}>
                                        <div className='row'>
                                            <div>
                                                {this.id}
                                            </div>
                                            <div className='input-field col s12'>
                                                <input class="validate" id="nombre" name='nombre' onChange={this.handleChange} type='text' placeholder='Nombre categoria' value={this.state.nombre} required aria-required="true"></input>
                                                <span className="helper-text" data-error="Nombre categoría válido" data-success="Nombre categoría válido">¡Los errores aparecen instantáneamente!</span>
                                            </div>

                                            <div className='input-field col s12'>
                                                <input class="validate" name='descripcion' onChange={this.handleChange} type='text' placeholder='Descripcion categoria' value={this.state.descripcion} required aria-required="true"></input>
                                                <span className="helper-text" data-error="Descripción categoría no válida" data-success="Descripción categoría válida">¡Los errores aparecen instantáneamente!</span>
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
                            <div className='search'>
                                <input id="search" type="text" placeholder='search...' onChange={this.handleSearch} />
                            </div>

                            <table>
                                <thead>
                                    <tr>
                                        <th>Nombre</th>
                                        <th>Descripcion</th>
                                        <th>Editar</th>
                                        <th>Eliminar</th>
                                        <th>Ver productos</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.categorias.filter((categoria) => {
                                            if(this.state.search ==''){
                                                return categoria;
                                            }
                                            else if(categoria.nombre.toLowerCase().includes(this.state.search.toLowerCase()) || categoria.descripcion.toLowerCase().includes(this.state.search.toLowerCase())){
                                                return categoria;
                                            }
                                        }).map(categoria => {
                                            return(
                                                <tr key={categoria._id}>
                                                    <td>{categoria.nombre}</td>
                                                    <td>{categoria.descripcion}</td>
                                                    <td>
                                                        <button className='btn light-blue darken-4' onClick={() => this.editCategoria(categoria._id)}>
                                                            <i className='material-icons'>edit</i>         
                                                        </button>
                                                    </td>
                                                    <td>
                                                        <button className='btn light-blue darken-4' onClick={() => this.deleteCategoria(categoria._id)} style={{margin: '4px'}}>
                                                            <i className='material-icons'>delete</i>         
                                                        </button>
                                                    </td>
                                                    <td>
                                                        <Link to='/productos'>
                                                            <button className='btn light-blue darken-4' onClick={() => this.viewProducts(categoria._id)} style={{margin: '4px'}}>
                                                                <i className='material-icons'>visibility</i>         
                                                            </button>
                                                        </Link>
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

export default Categorias;

