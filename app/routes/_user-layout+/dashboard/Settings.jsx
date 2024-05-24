/**
 * Copyright © 2020 Cenacle Research India Private Limited.
 * All Rights Reserved.
 */
import React from 'react';
import gSettings from '../../../globals/settings.client';

class Settings extends React.PureComponent {
	
	render() {

		return (<>
			<h2>Settings</h2>
			<ul>
				{
					Object.keys(gSettings).map((name, index) => (<li key={index}>{name}</li>))
				}
			</ul>
		</>
		);
	}

	onNotification = () => this.forceUpdate()

};

export default Settings;