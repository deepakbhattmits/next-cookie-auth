/** @format */

import LoginForm from '../components/LoginForm';
import Layout from '../components/Layout';
import { authInitialProps } from '../lib';
const Loginpage = (props) => (
	<Layout title='Login' {...props}>
		<LoginForm />
	</Layout>
);
Loginpage.getInitialProps = authInitialProps();
export default Loginpage;
