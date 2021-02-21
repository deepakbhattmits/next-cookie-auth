/** @format */

import { useState } from 'react';
import Router from 'next/router';
import { loginUser } from '../lib';

const LoginForm = () => {
	const [inputs, setInputs] = useState({ error: '', isLoading: false });
	const handleChange = (event) => {
		const { name, value } = event.target;
		event.persist();
		setInputs((inputs) => ({ ...inputs, [name]: value }));
	};
	const showError = (err) => {
		console.log('error : ', err);
		const error = err?.response?.data || err?.message;
		setInputs((inputs) => ({
			...inputs,
			['error']: error,
			['isLoading']: false,
		}));
	};
	const onSubmit = (event) => {
		event.preventDefault();
		const { email, password } = inputs;
		setInputs((inputs) => ({ ...inputs, ['isLoading']: true }));
		loginUser(email, password)
			.then((data) => Router.push('/profile'))
			.catch((err) => {
				showError(err);
			});
	};

	return (
		<form className='login-form' onSubmit={onSubmit}>
			<div className='login-form-div'>
				<input
					type='email'
					name='email'
					placeholder='email'
					onChange={handleChange}
				/>
			</div>
			<div className='login-form-div'>
				<input
					type='password'
					name='password'
					placeholder='password'
					onChange={handleChange}
				/>
			</div>

			<div className='login-form-div'>
				<button type='submit' disabled={inputs.isLoading}>
					{inputs.isLoading ? 'Sending' : 'Submit'}
				</button>
			</div>

			{inputs.error && (
				<div className='login-form-error'>
					<em>{inputs.error}</em>
				</div>
			)}
			<div>
				<strong>Note:</strong>
				<p>userName:Rey.Padberg@karina.biz</p>
				<p>Password: ambrose.net</p>
			</div>
			<style jsx>{`
				.login-form {
					padding: 10px;
					box-shadow: 0 0 5px #0f0f0f;
					border-radius: 3px;
					display: grid;
					justfy-content: center;
					width: 300px;
				}
				.login-form-div {
					margin: 10px 0;
					display: flex;
					justify-content: center;
				}
				.login-form-div input {
					width: 100%;
					padding: 10px;
				}
				.login-form-div button {
					width: 100px;
					padding: 10px;
				}
				.login-form-error {
					color: red;
					margin: 10px 0;
				}
			`}</style>
		</form>
	);
};
export default LoginForm;
