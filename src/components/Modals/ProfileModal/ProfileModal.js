import React from 'react';

import "./ProfileModal.scss"
import {useSelector} from "react-redux";

function ProfileModal(props) {
	const {isDisplay} = useSelector(state => {
		return state.profileModal
	})

	return (
		{
			isDisplay && <div className="profile-modal-container">


				<div className="blur"/>
			</div>
		}
	);
}

export default ProfileModal;