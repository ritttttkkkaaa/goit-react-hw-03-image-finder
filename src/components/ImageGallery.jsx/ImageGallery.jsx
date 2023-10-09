import React from "react";
import ImageGalleryItem from "components/ImageGalleryItem/ImageGalleryItem";
import axios from "axios";
import css from "./ImageGallery.module.css"
import Modal from "components/Modal/Modal";
import Loader from "components/Loader/Loader";


class ImageGallery extends React.Component {
    state = {
      pictures: [],
      totalCount: 0,
      isLoading: false,
      currentPage: 1,
      selectedImage: null,
    };
  
    createSearchOptions(searchQuery) {
      const BASE_URL = 'https://pixabay.com/api/';
      const My_API_key = '35942774-c248ff19570495ecc1d8f115d';
      const options = new URLSearchParams({
        key: My_API_key,
        q: searchQuery,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: this.state.currentPage,
        per_page: 12,
      });
      return BASE_URL + `?` + options.toString();
    }
    async getFetchImages() {
      this.setState({ isLoading: true });
  
      try {
        const { data } = await axios.get(
          this.createSearchOptions(this.props.searchQuerry)
        );
        const totalCount = data.totalHits;
        const newPictures = data.hits;
        this.setState({ totalCount });
        this.setState(prevState => ({
          pictures: [...prevState.pictures, ...newPictures],
        }));
      } catch (error) {
        console.error(error);
      } finally {
        this.setState({ isLoading: false });
      }
    }
  
    handleClickLoadMore = () => {
      this.setState({ currentPage: this.state.currentPage + 1 });
    };
  
    async componentDidUpdate(prevProps, prevState) {
      if (prevProps.searchQuerry === this.props.searchQuerry) {
        if (
          prevState.currentPage !== this.state.currentPage &&
          this.state.currentPage !== 1
        ) {
          this.getFetchImages();
        }
        return;
      }
      if (prevProps.searchQuerry !== this.props.searchQuerry) {
        this.setState({ currentPage: 1, pictures: [] }, () => {
          this.getFetchImages();
        });
      }
    }
  
    toggleModal = () => {
      this.setState({ selectedImage: null });
    };
  
    render() {
      const { pictures, isLoading, selectedImage } = this.state;
  
      return (
        <>
          <ul className={css.imageGallery}>
          {pictures &&
            pictures.map(picture => (
              <ImageGalleryItem
                key={picture.id}
                image={picture.webformatURL}
                onClick={() => {
                  this.setState({ selectedImage: picture.largeImageURL });
                }}
              />
            ))}
        </ul>
        {isLoading && <Loader />}

        {!isLoading &&
          pictures &&
          this.state.totalCount - (this.state.currentPage - 1) * 12 >= 12 && (
            <button
              type="button"
              className={css.button}
              onClick={this.handleClickLoadMore}
            >
              Load More
            </button>
          )}
        {selectedImage && (
          <Modal image={this.state.selectedImage} onClose={this.toggleModal} />
        )}
      </>
    );
  }
}
  
 
  
  export default ImageGallery;