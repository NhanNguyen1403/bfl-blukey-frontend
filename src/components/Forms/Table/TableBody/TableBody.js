import React, {useEffect} from 'react';

import "./TableBody.scss"

function TableBody(props) {
	return (
		<tbody className='table-body-container'>
		{
			props.configs.map(item => {
				return (
					<tr key={`table-row-${item.id}`}>
						{
							Object.keys(item).map(key => {
								switch (key) {
									case 'isAdmin': {
										return <td key={`row-item-${item.id}-${key}`}>{item[key] ? 'TRUE' : ''}</td>
									}

									case 'createAt': return

									default: {
										return (
											<td key={`row-item-${item.id}-${key}`}>{item[key]}</td>
										)
									}
								}
							})
						}
					</tr>
				)
			})
		}
		</tbody>
	)

}

export default TableBody;