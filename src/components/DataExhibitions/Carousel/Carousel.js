import React from 'react';
import ImageGallery from 'react-image-gallery';
import './Carousel.scss';


function Carousel(props) {
	const images = props.configs;

	return (
		<ImageGallery
			items={images}
			showPlayButton={false}
			showFullscreenButton={false}
			showNav={false}/>
	);
}

export default Carousel;