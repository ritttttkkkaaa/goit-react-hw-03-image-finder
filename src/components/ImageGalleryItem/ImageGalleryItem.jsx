import React, { Component } from "react";
import css from "./ImageGalleryItem.module.css"


class ImageGalleryItem extends Component {
 render() { 
    const { itemKey,image } = this.props; 
    return (
        <li 
        key={itemKey}
        className={css.galleryItem}
        onClick={this.props.onClick}
        >
        <img 
        src={image} 
        alt={image} />
        </li>
    );
}
}
 
export default ImageGalleryItem;