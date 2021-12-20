import React, { Component }  from 'react';

class Categorias extends Component {

    constructor(){
        super();

        this.state = {
            _id: '',
            nombre: '',
            descripcion: '',
            categorias: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.addCategoria = this.addCategoria.bind(this);
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

    fetchCategorias(){
        fetch('/api/categoria/' + localStorage.getItem("id"))
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
        console.log(value)
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
                                                <input name='nombre' onChange={this.handleChange} type='text' placeholder='Nombre categoria' value={this.state.nombre}></input>
                                            </div>

                                            <div className='input-field col s12'>
                                                <input name='descripcion' onChange={this.handleChange} type='text' placeholder='Descipcion categoria' value={this.state.descripcion}></input>
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
                                        <th>Descripcion</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.categorias.map(categoria => {
                                            return(
                                                <tr key={categoria._id}>
                                                    <td>{categoria.nombre}</td>
                                                    <td>{categoria.descripcion}</td>
                                                    <td>
                                                        <button className='btn light-blue darken-4' onClick={() => this.editCategoria(categoria._id)}>
                                                            <i className='material-icons'>edit</i>         
                                                        </button>
                                                        <button className='btn light-blue darken-4' onClick={() => this.deleteCategoria(categoria._id)} style={{margin: '4px'}}>
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

export default Categorias;

