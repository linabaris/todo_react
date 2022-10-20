import React, { Component } from "react";
import "./search-panel.css";

class SearchPanel extends Component {
    state = {
        term: ''
    }
    onChangeInput = (evt) => {
        const term = evt.target.value;
        this.setState( {
            term 
        })
        this.props.onItemSearched(term);
    }

    render() {
        return <input className="form-control search-input" placeholder="search" type='text'
        onChange={this.onChangeInput}
        value={this.state.term}
    />
    }
};

export default SearchPanel;