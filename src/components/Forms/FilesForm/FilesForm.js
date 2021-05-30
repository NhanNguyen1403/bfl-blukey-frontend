import React, {useEffect, useState} from 'react';

import "./FilesForm.scss"

import Input from "../../Inputs/Input/Input";
import {generateInput} from "../../../services/Generators/generateInput";
import Post from "../../../services/Api/POST/post"
import getAll from "../../../services/Api/GET/getAll"
import {generateButton} from "../../../services/Generators/generateButton";
import Button from "../../Inputs/Button/Button";

function FilesForm(props) {
	let {mode, user} = props.configs
	let file = generateInput('File', 'file', '', 'full')
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
		if (!file.getValue) return console.log('Ignore')

		console.log('Save file:', file.getValue)
		let formData = new FormData()

		formData.append('file', file.getValue)
		await Post('file', formData)
		await getFiles()
		return
	}

	return (
		<div className='files-form-container'>
			<div className="info-form-container">
				{mode === 'edit' && < p className="title">NEW</p>}

				{mode === 'edit' && <Input configs={file} fileHandler={fileHandler}/>}

				<div className="files-area">
					<p className="title">YOUR FILES</p>

					<div className="file-item">
						<a href="#">file 1</a>

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

export default FilesForm;
