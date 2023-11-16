import { FormDataFields } from "@/components/AddItemModal"
import { BookingMenu } from "@/stores/bookingMenuStore"
import { MenuItem } from "@/model/MenuItem";
import axios, { AxiosResponse } from "axios"

const url = process.env.NEXT_PUBLIC_URL

const API = axios.create({
    baseURL: url,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    }
})

API.interceptors.request.use((req) => {
    if(localStorage.getItem('jwtToken')) {
        req.headers.authorization = `Bearer ${localStorage.getItem('jwtToken')}`
    }
    return req
})

export async function adminLogout(): Promise<AxiosResponse> {
    const res = await API.post("/logout")
    return res
}


export async function getBookingMenuController(): Promise<BookingMenu[]> {
    const res = await API.get(`${process.env.NEXT_PUBLIC_URL}/admin/bookings`)
    return res.data
}

export async function updateBookingController(): Promise<string> {
    const res = await API.put(`${process.env.NEXT_PUBLIC_URL}/admin/bookings`)
    return res.data
}

export async function deleteBookingController(): Promise<string> {
    const res = await API.delete(`${process.env.NEXT_PUBLIC_URL}/admin/bookings`)
    return res.data
}

export async function adminLogin(username:string, password: string): Promise<AxiosResponse> {
    const creds = {
        username,
        password
    }
    const res = await API.post(`${process.env.NEXT_PUBLIC_URL}/admin/login`, creds)
    console.log(res)
    return res
}


export const adminGetAllMenuItems = async (): Promise<MenuItem[]> => {
    try {
        const response: AxiosResponse<MenuItem[]> = await API.get(`${url}/admin/menu-items`);
        return response.data;
    } catch (error) {
        throw new Error("Error fetching menu items.")
    }
}

export const adminGetMenuItemPhoto = async (photoId: string): Promise<string> => {
    try {
        const response = await API.get(`${url}/admin/get-image/${photoId}`, {
            responseType: 'arraybuffer'
        });

        const base64String = btoa(
            new Uint8Array(response.data).reduce(
                (data, byte) => data + String.fromCharCode(byte),
                ''
            )
        );
        return `data:image/jpeg;base64,${base64String}`;
    } catch (error) {
        throw new Error("Error fetching photo.");
    }
}

export const addItemWithFormDataAndFile = async (data: FormDataFields): Promise<AxiosResponse<any>> => {
    try {
        const res = await API.post(`${url}/admin/menu-items`, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        })

        return res
    } catch (error) {
        throw new Error("Error fetching photo.");
    }
}

export const deleteMenuItem = async (id: string, photoId: string): Promise<AxiosResponse> => {

    const res = await API.delete(`${url}/admin/menu-items?id=${id}&photoId=${photoId}`)
    console.log(res)

    return res
}
