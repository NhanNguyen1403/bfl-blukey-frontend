import React, {useEffect, useState} from 'react';

import "./DocumentForm.scss"

import Input from "../../Inputs/Input/Input";
import {generateInput} from "../../../services/Generators/generateInput";
import Post from "../../../services/Api/POST/post"
import getAll from "../../../services/Api/GET/getAll"
import {generateButton} from "../../../services/Generators/generateButton";
import Button from "../../Inputs/Button/Button";
import {useDispatch} from "react-redux";
import {hideSnack, showSnack} from "../../../redux";

function DocumentForm(props) {
	let dispatch = useDispatch()
	let {mode, user} = props.configs
	let document = generateInput('Document', 'file', '', 'full')
	let removeButton = generateButton('close', 'icon', 'secondary', 'md', 'close-icon')
	let [files, setFiles] = useState([])

	useEffect(async () => {
		// await getFiles()
	}, [])

	let getFiles = async () => {
		await getAll('files')
	}

	let removeFile = () => {
		console.log('Remove File')
	}

	let fileHandler = async () => {
		if (!document.getValue) return console.log('Ignore')

		if (!/\.pdf$/.test(document.getValue.name))
			return dispatch(showSnack('Document should be PDF file','danger'))
		else
			dispatch(hideSnack())

		console.log('Save file:', document.getValue)
		let formData = new FormData()

		formData.append('file', document.getValue)
		await Post('file', formData)
		await getFiles()
	}

	return (
		<div className='documents-form-container'>
			<div className="info-form-container">
				{mode === 'edit' && < p className="title">NEW</p>}

				{mode === 'edit' && <Input configs={document} fileHandler={fileHandler}/>}

				<div className="documents-area">
					<p className="title">YOUR DOCUMENTS</p>

					<div className="document">
						<a href="#">Document 1</a>

						{
							mode === 'edit' &&
							<div className="button-area">
								<Button configs={removeButton} clickHandler={removeFile}/>
							</div>
						}
					</div>
				</div>
			</div>
		</div>
	);
}

export default DocumentForm;
