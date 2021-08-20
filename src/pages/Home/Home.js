import React, {useEffect, useState} from 'react';

import "./Home.scss"
import {generatePageOption} from "../../services/Generators/generatePageOption"
import PageOption from "../../components/Inputs/pageOption/pageOption";

import Carousel from "../../components/DataExhibitions/Carousel/Carousel";
import home1 from "../../assets/desktop/home-1.jpg"
import home2 from "../../assets/desktop/home-2.jpg"
import home3 from "../../assets/desktop/home-3.jpg"

function Home(props) {
	let [optionList, setOptionList] = useState([
		generatePageOption('','Home', 'lg', true),
	])
	let images = [
		{original: home1, thumbnail: home1},
		{original: home2, thumbnail: home2},
		{original: home3, thumbnail: home3},
	]

	let changeOption = (optionName) => {
		setOptionList(optionList.map(i => {
			return generatePageOption(i.path, i.name, i.size, i.name === optionName)
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
