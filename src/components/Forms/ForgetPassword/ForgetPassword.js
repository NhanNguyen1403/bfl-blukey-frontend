import React, { useState } from 'react'

import "./ForgetPassword.scss"

import { gButton } from '../../../services/Generators/gButton'
import gInput from '../../../services/Generators/gInput'
import Button from '../../Inputs/Button/Button'
import Input from '../../Inputs/Input/Input'
import Post from '../../../services/Api/POST/post'

function ForgetPassword() {
	let inputUsername = gInput("Username", "text", '', "lg", true),
			buttonLogin = gButton('Submit', "text", 'solid',  "lg"),
			[isSent, setIsSent] = useState(false)

	let requestPassword = async () => {
		console.log('request New Password')

		let {data} = await Post('resetPassword', {userName: inputUsername.getValue})
		if (data?.code !== 400)
			setIsSent(true)
	}

	return (
		<div className="forgot-password">
			{
				!isSent && <div className="input-group">
					<Input configs={inputUsername} />
				</div>
			}

			{
				!isSent && <div className="button-area">
					<Button clickHandler={requestPassword} configs={buttonLogin} />
				</div>
			}

			{
				isSent && <span>Please check your email to get new password.</span>
			}
		</div>
	)
}

export default ForgetPassword
