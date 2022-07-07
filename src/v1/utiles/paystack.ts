import { Request } from 'express';
import dotenv from 'dotenv';
import { defaults } from 'pg';
import axios from 'axios';
import CustomError from '../utiles/error.utile';

dotenv.config();

export type Form = {
	email: string;
	amount: number;
}

// eslint-disable-next-line no-undef
const { PAYSTACK_SECERT_KEY } = process.env;

export const paystack = () => {
	const initializePayment = async (form: Form) => {
		try {
			const url = 'https://api.paystack.co/transaction/initialize';

			return await axios.post(url, form, {
				headers:
				{
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${String(PAYSTACK_SECERT_KEY)}`
				}
			});
		} catch (err) {
			throw new CustomError(`${err}`, 500);
		}
	};
	const verifyPayment = async (ref: string) => {

		try {
			const url = `https://api.paystack.co/transaction/verify/${encodeURIComponent(ref)}`;
			
			return await axios.get(url, {
				headers:
				{
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${String(PAYSTACK_SECERT_KEY)}`
				}
			});

		} catch (err) {
			throw new CustomError(`${err}`, 500);
		}
	};
	return { initializePayment, verifyPayment };
};
