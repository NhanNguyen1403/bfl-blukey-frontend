import React, {useEffect, useState} from 'react';

import "./Home.scss"
import {generatePageOption} from "../../services/Generators/generatePageOption"
import PageOption from "../../components/pageOption/pageOption";
import Carousel from "../../components/Carousel/Carousel";

function Home(props) {
	let [optionList, setOptionList] = useState([
		generatePageOption('Home', 'lg', true),
	])
	let images = [
		{original: 'src/assets/desktop/home-1.jpg', thumbnail: 'src/assets/desktop/home-1.jpg'},
		{original: 'src/assets/desktop/home-2.jpg', thumbnail: 'src/assets/desktop/home-2.jpg'},
		{original: 'src/assets/desktop/home-3.jpg', thumbnail: 'src/assets/desktop/home-3.jpg'},
	]

	let changeOption = (optionName) => {
		setOptionList(optionList.map(i => {
			return generatePageOption(i.name, i.size, i.name === optionName)
		}))
	}

	return (
		<div className='home-container'>
			<div className="options-area">
				{
					optionList.map(i => {
						return (<PageOption key={`option-${i.name}`} configs={i} clickHandler={changeOption}/>)
					})
				}
			</div>
			<div className="carousel-area">
				<Carousel configs={images}/>
			</div>
		</div>
	);
}

export default Home;