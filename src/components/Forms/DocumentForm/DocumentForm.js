import React, {useEffect, useState} from 'react';

import "./DocumentForm.scss"

import Input from "../../Inputs/Input/Input";
import gInput from "../../../services/Generators/gInput";
import Post from "../../../services/Api/POST/post"
import getAll from "../../../services/Api/GET/getAll"
// import {gButton} from "../../../services/Generators/gButton";
// import Button from "../../Inputs/Button/Button";
import {useDispatch} from "react-redux";
import {hideSnack, showSnack} from "../../../redux";

function DocumentForm(props) {
	let dispatch = useDispatch(),
	 		{mode, user} = props.configs,
	 		document = gInput('Document', 'file', '', 'full'),
			[documents, setDocuments] = useState([])
	// 	removeButton = gButton('close', 'icon', 'secondary', 'md', 'close-icon')

	useEffect(async () => {
		await getDocuments()
	}, [])

	let isOwner = () => {
		if (mode === 'view') return false

		let {id} = JSON.parse(localStorage.getItem('user'))
		return id === user.id
	}

	let getDocuments = async () => {
		let res = await getAll('documentUsers', {userId: user.id})
		if (res && res.data)
			setDocuments(res.data)
	}

	// let removeFile = () => {
	// 	console.log('Remove File')
	// }

	let fileHandler = async () => {
		if (!document.getValue) return console.log('Ignore')

		if (!/\.pdf$/.test(document.getValue.name))
			return dispatch(showSnack('Document should be PDF file', 'danger'))
		else
			dispatch(hideSnack())

		// console.log('Save document:', document.getValue)
		let formData = new FormData()

		formData.append('pdf', document.getValue)
		await Post('uploadDocumentUser', formData)
		await getDocuments()
	}

	return (
		<div className='documents-form-container'>
			<div className="info-form-container">
				{
					isOwner() &&
					<div className='add-document-area'>
						<p className="title">NEW</p>
						<Input configs={document} fileHandler={fileHandler}/>
					</div>
				}


				<div className="documents-area">
					<p className="title">DOCUMENTS</p>

					{
						documents.length === 0
							? (<span>Documents uploaded will be here... </span>)
							: documents.map(i => {
								return (
									<div key={i.id} className="document" title={i.fileName}>
										<a href={i.url} target="_blank">{i.fileName}</a>

										{/*{*/}
										{/*	mode === 'edit' &&*/}
										{/*	<div className="button-area">*/}
										{/*		<Button configs={removeButton} clickHandler={removeFile}/>*/}
										{/*	</div>*/}
										{/*}*/}
									</div>
								)
							})
					}
				</div>
			</div>
		</div>
	);
}

export default DocumentForm;
