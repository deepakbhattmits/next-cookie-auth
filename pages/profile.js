/** @format */

import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { getUserProfile, authInitialProps } from '../lib';

const ProfilePage = (props) => {
	const [user, setUser] = useState([]);
	useEffect(() => {
		getUserProfile()
			.then((data) => setUser([...user, data]))
			.catch((err) => {
				console.log(err);
			});
	}, []);
	return (
		<Layout title='Profile' {...props}>
			<pre>
				{user.length === 0
					? 'Loading profile...'
					: JSON.stringify(user, null, 2)}
			</pre>
		</Layout>
	);
};
ProfilePage.getInitialProps = authInitialProps(true);
export default ProfilePage;
