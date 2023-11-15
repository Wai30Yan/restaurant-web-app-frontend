'use client'
import axios, { AxiosResponse } from "axios"

type Order = {
    count: number,
    itemId:string
}

type FormDataFields = {
    firstName: string,
    lastName: string,
    phoneNumber: string,
    date: number,
    orders: Order[],
    totalPrice: number
}

const url = process.env.NEXT_PUBLIC_URL

export async function createBooking(data: FormDataFields): Promise<AxiosResponse<any>> {
    try {
        const res = await axios.post(`${url}/guest/create-booking`, data, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return res;
    } catch (error) {
        throw new Error("Error fetching photo.");
    }
}

