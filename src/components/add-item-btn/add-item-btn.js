import React, { Component } from "react";
import './add-item-btn.css'

export default class AddItem extends Component {

    state = {
        label: '',
    }

    onLabelChange = (evt) => {
        this.setState({
            label: evt.target.value
        })
        
    }
    onSubmit = (evt) => {
        evt.preventDefault();
        this.props.onItemAdded(this.state.label)
        this.setState( {
            label: ''
        })
    }

    render() {

        return (
            <form className="add-item-btn d-flex" onSubmit={this.onSubmit}>
            <input type='text' className="form-control" onChange={this.onLabelChange} placeholder='What needs to be done' value={this.state.label}/>
                <button>Add Element</button>
            </form>
        )
    }
}