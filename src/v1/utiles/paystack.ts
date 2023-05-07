import dotenv from 'dotenv';
import axios from 'axios';
import { CustomError } from '../utiles/error.utile';
import { codeGenerator } from './generator.util';

dotenv.config();

export type Form = {
	email: string;
	amount: number;
	reference?: string;
}

// eslint-disable-next-line no-undef
const { PAYSTACK_SECERT_KEY } = process.env;

export const paystack = () => {
	const initializePayment = async (form: Form) => {
		try {
			const submit = {
				email: form.email,
				amount: form.amount
			};
			const url = 'https://api.paystack.co/transaction/initialize';
					
			return await axios.post(url, submit, {
				headers:
				{
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${String(PAYSTACK_SECERT_KEY)}`,
					'reference': codeGenerator(36)
				}
			});
		} catch (err) {
			throw new Error('PAYMENT_FAILED');
		}
	};
	const verifyPayment = async (ref?: string) => {

		try {
			const url = `https://api.paystack.co/transaction/verify/${encodeURIComponent(ref as unknown as string)}`;

			return await axios.get(url, {
				headers:
				{
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${String(PAYSTACK_SECERT_KEY)}`
				}
			});

		} catch (err) {
			throw new CustomError(`${err}`, 400);
		}
	};
	return { initializePayment, verifyPayment };
};
