import React, { Component } from "react";
import ReactDOM from "react-dom";
import TodoList from "./components/todo-list/todo-list";
import AppTitle from "./components/app-title/app-title";
import SearchPanel from "./components/search-panel/search-panel";
import ItemStatusFilter from "./components/item-status-filter/item-status-filter";
import AddItem from "./components/add-item-btn/add-item-btn";

import "./index.css"

class App extends Component {
  maxId = 100;
  constructor() {
    super();

    this.state = {
      todoData : [
        this.createTodoItem('Drink Coffee'),
        this.createTodoItem('Build Awesome App'),
        this.createTodoItem('Have a lunch')
      ],
      term: '',
      filter: 'all'
    };
  }
  createTodoItem (label) {
    return {
      label,
      important: false,
      done: false,
      id: this.maxId++
    }
  }

  deleteItem = (id) => {
    this.setState((state) => {
      const idx = state.todoData.findIndex((el) => el.id === id);

      const newArray = [
        ...state.todoData.slice(0, idx),
        ...state.todoData.slice(idx+1)
      ];
      return {
        todoData:newArray
      }
    })
  }

  addItem = (text) => {
    const newItem = this.createTodoItem(text);

    this.setState(({todoData}) => {
      const newArr = [
        ...todoData,
        newItem
      ]
      return {
        todoData: newArr
      }
    })
  }

  toggleProperty (arr, id, propName) {
    const idx = arr.findIndex( el => el.id === id);

      const oldItem = arr[idx];

      const newItem = {...oldItem, [propName]:!oldItem[propName]};

      return [
        ...arr.slice(0, idx),
        newItem,
        ...arr.slice(idx+1)
      ]
  }
  
  onToggleImportant = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'important')
      }
    })
  };

  onToggleDone = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'done')
      }
    })
  };

  searchItem = (items, term) => {
    if(term.length === 0) {
      return items;
    }
    return items.filter(item => {
      return (item.label.toLowerCase()).indexOf(term.toLowerCase()) > -1
    });
  }

  filterItem = (items, filter) => {
    switch(filter) {
      case 'all':
        return items;
      case 'active':
        return items.filter(item => !item.done);
      case 'done': 
        return items.filter(item => item.done);
      default:
        return items;
    }
  }
  onSearchChange = (term) => {
    this.setState({term});
  }
  onFilterChange = (filter) => {
    this.setState({filter})
  }

  render () {

    const {todoData, term, filter} = this.state;
    
    const visibleterms = this.filterItem(this.searchItem(todoData, term), filter);

    const doneCount = todoData.filter(el => el.done).length;
    
    const todoCount = todoData.length - doneCount;
    return (
      <div className="todo-app">
        <AppTitle toDo={todoCount} done={doneCount}/>
        <div className="top-panel d-flex">
          <SearchPanel onItemSearched={this.onSearchChange}/>
          <ItemStatusFilter filter={filter}
            onFilterChange = {this.onFilterChange}
          />
        </div>
        <TodoList todos={visibleterms} 
          onDeleted = {this.deleteItem}
          onToggleImportant = {this.onToggleImportant}
          onToggleDone = {this.onToggleDone}  
          />
        
        <AddItem onItemAdded = {this.addItem}/>
      </div>
    )
  }
}


ReactDOM.render(<App/>, document.getElementById('root'));