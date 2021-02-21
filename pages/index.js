/** @format */

import Link from 'next/link';
import Layout from '../components/Layout';
import { authInitialProps } from '../lib';
const IndexPage = (props) => {
	console.log('home :', props);
	return (
		<Layout title='Home' {...props}>
			<Link href='/profile'>
				<a>Go to profile</a>
			</Link>
		</Layout>
	);
};
IndexPage.getInitialProps = authInitialProps();
export default IndexPage;
