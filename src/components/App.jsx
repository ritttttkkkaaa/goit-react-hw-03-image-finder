import React from 'react'
import Searchbar from './Searchbar/Search'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import  ImageGallery from './ImageGallery.jsx/ImageGallery'

class App extends React.Component {
  state = {
    searchQuerry: '',
  };

  handleFormSubmit = searchQuerry => {
    this.setState({ searchQuerry });
  };

  render() {
    return (
      <div>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery searchQuerry={this.state.searchQuerry} />
        <ToastContainer position="top-center" autoClose={2000} />
      </div>
    );
  }
}


export default App;
