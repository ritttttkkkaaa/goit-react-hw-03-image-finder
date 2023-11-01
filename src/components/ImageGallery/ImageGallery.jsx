import React from "react";
import ImageGalleryItem from "components/ImageGalleryItem/ImageGalleryItem";
import css from "./ImageGallery.module.css"


const ImageGallery = ({ images, openModal, showPosts}) => {
  return (
    <ul className={css.imageGallery}>
      {showPosts &&
        images.map(image => (
          <ImageGalleryItem
            key={image.id}
            image={image}
            openModal={openModal}
          />
        ))}
    </ul>
  );
};

export default ImageGallery;


