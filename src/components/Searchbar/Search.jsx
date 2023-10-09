import React, { Component } from "react";
import css from "./Searchbar.module.css"
import { toast } from "react-toastify";

class Searchbar extends Component {
  state = { 
    searchName: '',
  };

  handleNameChange = event => {
    this.setState({searchName: event.currentTarget.value.toLowerCase()})
  };

  handleSubmit = event => {
    event.preventDefault();
     if (this.state.searchName.trim() === ''){
     toast('Enter search value');
     return;
     }
    this.props.onSubmit(this.state.searchName)
    this.setState({searchName: ''});
  }
  render(){ 
 return (
  <header onSubmit={this.handleSubmit} className={css.searchbar}>
  <form className={css.searchForm}>
    <button type="submit" className={css.button}>
      <span className={css.buttonLabel}>Search</span>
    </button>

    <input
    className={css.input}
    type="text"
    autoComplete="off"
    autoFocus
    placeholder="Search images and photos"
    value={this.state.searchName}
    onChange={this.handleNameChange}
    />
  </form>
  </header>
  ); }
}
 
export default Searchbar;