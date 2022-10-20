import React, { Component } from "react";
import "./todo-list-item.css";

export default class TodoListItem extends Component {
    
    render() {

        const props = this.props;

        let classNames = "todo-list-item";
        if(props.done) {classNames += ' done'};
        if(props.important) {classNames += ' important'};
    
        return (
            <span className={classNames}>
                <span className="todo-list-item-label" onClick={props.onToggleDone}>{props.label}</span>
                <button type="butoon" className="btn btn-outline-success btn-sm float-right" 
                    onClick={props.onToggleImportant}>
                    <i className="fa fa-exclamation"/>
                </button>
    
                <button type="button" className="btn btn-outline-danger btn-sm float-right"
                    onClick={props.onDeleted}>
                    <i className="fa fa-trash-o"/>
                </button>
            </span>
        ) 
    }
}