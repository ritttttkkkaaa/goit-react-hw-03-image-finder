import React from "react";
import css from "./ImageGalleryItem.module.css"

const ImageGalleryItem = ({ image, openModal }) => {
  return (
    <li key={image.id} className={css.galleryItem}>
      <img
        className={css.galleryItemImg}
        src={image.webformatURL}
        alt={image.tags}
        onClick={() => openModal(image.largeImageURL)}
      />
    </li>
  );
};
 
export default ImageGalleryItem;