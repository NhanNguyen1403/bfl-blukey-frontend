import React, { useEffect, useState } from 'react';

import "./DocumentForm.scss";

import { useDispatch } from "react-redux";
import { hideSnack, showSnack } from "../../../redux";

import getAll from "../../../services/Api/GET/getAll";
import Post from "../../../services/Api/POST/post";
import Delete from "../../../services/Api/DELETE/delete";
import gInput from "../../../services/Generators/gInput";
import Input from "../../Inputs/Input/Input";
import { gButton } from "../../../services/Generators/gButton";
import Button from "../../Inputs/Button/Button";



function DocumentForm(props) {
	let dispatch = useDispatch(),
		{ mode, user } = props.configs,
		[documentInput, setDocumentInput] = useState(gInput('Document', 'file', null, 'full')),
		[documents, setDocuments] = useState([]),
		submitButton = gButton('Submit', 'text', 'solid', 'h-full w-fit'),
		removeButton = gButton('close', 'icon', 'secondary', 'md', 'close-icon')

	useEffect( () => {
		async function fetchData() {
			await loadDocuments()
		}

		fetchData();
	}, [])

	let isOwner = () => {
		if (mode === 'view') return false

		let { id } = JSON.parse(localStorage.getItem('user'))
		return id === user.id
	}

	let loadDocuments = async () => {
		let res = await getAll('documentUsers', { userId: user.id })
		if (res && res.data)
			setDocuments(res.data)
	}

	let removeFile = async (file) => {
		console.log('Remove File')
		await Delete('uploadDocumentUser', file.id)
		loadDocuments()
	}

	let fileHandler = async () => {
		if (!documentInput.getValue) return console.log('Ignore')

		if (!/\.pdf$/.test(documentInput.getValue.name))
			return dispatch(showSnack('Document should be PDF file', 'danger'))
		else
			dispatch(hideSnack())

		let formData = new FormData()

		formData.append('pdf', documentInput.getValue)
		console.log('UPload')
		await Post('uploadDocumentUser', formData)
		loadDocuments()
	}

	return (
		<div className='documents-form-container'>
			<div className="info-form-container">
				{
					isOwner() &&
					<div className='add-document-area'>
						<p className="title">NEW</p>

						<div className="upload-area">
							<Input configs={documentInput} fileHandler={() => { }} />
							<Button configs={submitButton} clickHandler={fileHandler} />
						</div>
					</div>
				}


				<p className="title">DOCUMENTS</p>
				<div className="documents-area">
					{
						documents.length === 0
							? (<span>Can you update your documents.</span>)
							: documents.map(i => {
								return (
									<div key={i.id} className="documents-area__document" title={i.fileName}>
										<a href={i.url} target="_blank" rel="noreferrer">{i.fileName}</a>

										{
											mode === 'edit' &&
											<div className="button-area">
												<Button configs={removeButton} clickHandler={() => removeFile(i)} />
											</div>
										}
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
