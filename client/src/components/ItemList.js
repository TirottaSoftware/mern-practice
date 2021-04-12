import React, {Component} from 'react';
import axios from 'axios';
import '../App.css';

class ItemList extends Component{
    constructor(props){
        super(props);
        this.state = {
            items:[],
            userInput: "",
        }
    }
    handleSubmit = async (event) => {
        event.preventDefault();
        await axios.post("/items", {name: this.state.userInput}).catch(err => console.log(err));
        this.updateList();
        this.setState({userInput: ""})
    }
    handleUserInput = (event) => {
        this.setState({userInput: event.target.value});
    }
    deleteItem = async (id) => {
        await axios.delete("/items/" + id)
        this.updateList();
    }
    componentDidMount(){
        this.updateList();
    }
    updateList = () => {
         axios.get("/items").then(res => this.setState({items: res.data})).catch(err => console.log(err))
    }
      
     render() {
        return (
            <div>
                <form onSubmit = {this.handleSubmit} className = "add-item-form">
                    <input onChange = {this.handleUserInput} type = "text" value = {this.state.userInput} placeholder = "Add new Item" className = "item-input" />
                    <input className = "item-submit" type = "submit" />
                </form>
                <ul className = "item-list">
                {
                    this.state.items?
                    this.state.items.map(item => <li className = "item" key = {item._id}> <button className = "btn-remove" onClick = {() => this.deleteItem(item._id)}>&times;</button> {item.name}</li>)
                    :<div>Loading...</div>
                }
                </ul>
            </div>
        );}
      }


export default ItemList