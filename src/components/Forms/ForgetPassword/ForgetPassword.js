import React, { useState } from 'react'

import "./ForgetPassword.scss"

import { gButton } from '../../../services/Generators/gButton'
import gInput from '../../../services/Generators/gInput'
import Button from '../../Inputs/Button/Button'
import Input from '../../Inputs/Input/Input'

function ForgetPassword() {
	let inputUsername = gInput("Username", "text", '', "lg", true),
			buttonLogin = gButton('Submit', "text", 'solid',  "lg"),
			[isSent, setIsSent] = useState(false)

	let requestPassword = () => {
		console.log('request New Password')
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
				isSent && <p>Please check your email to get new password.</p>
			}
		</div>
	)
}

export default ForgetPassword
