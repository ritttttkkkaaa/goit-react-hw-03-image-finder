import React, { useState, useEffect } from 'react';
import { findImage } from './services/API';
import Searchbar from './Searchbar/Search';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Button from './Button/Button';
import Modal from './Modal/Modal';


export function App()  {
    const [images, setImages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [querry, setQuerry] = useState('');
    const [modalImageUrl, setModalImageUrl] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMoreImages, setHasMoreImages] = useState(true);
  
    useEffect(() => {
      if (querry === '') return;
      const FetchPostByQuerry = async () => {
        try {
          setIsLoading(true);
          const newImages = await findImage(querry, page);
          if (newImages.length === 0) {
            alert(
              'Oops',
              `Sorry, no images found for the querry "${querry}"`,
              'error'
            );
            return;
          }
          setImages(prevImages => [...prevImages, ...newImages]);
          setHasMoreImages(newImages.length >= 12);
        } catch (error) {
          setError(error.message);
          alert('Error', 'Error 404 - "Not Found"', 'error');
        } finally {
          setIsLoading(false);
        }
      };
  
      FetchPostByQuerry();
    }, [querry, page]);

    const loadMoreImages = () => {
      setPage(prev => prev + 1);
    };
  
    const handleSearchSubmit = e => {
      e.preventDefault();
      setPage(1);
      const query = e.currentTarget.elements.searchImage.value;
      setQuerry(query);
      setImages([]);
      e.currentTarget.reset();
    };
  
    const openModal = imageUrl => {
      setModalImageUrl(imageUrl);
      setIsModalOpen(true);
    };
  
    const closeModal = () => {
      setModalImageUrl(null);
      setIsModalOpen(false);
    };
  
    const showPosts = images.length > 0;

    return (
      <>
        <Searchbar handleSearchSubmit={handleSearchSubmit} />
        {isLoading && <Loader />}
        {error ? (
          setHasMoreImages(false)
        ) : (
          <ImageGallery
            images={images}
            openModal={openModal}
            showPosts={showPosts}
          />
        )}
        {showPosts && hasMoreImages && (
          <Button
            onClick={loadMoreImages}
            showButton={!isLoading}
          />
        )}
        {isModalOpen && (
          <Modal
            isOpen={isModalOpen}
            imageUrl={modalImageUrl}
            onClose={closeModal}
          />
        )}
      </>
    );
  }

