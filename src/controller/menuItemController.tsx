
import { MenuItem } from "@/model/MenuItem";
import axios, { AxiosResponse } from "axios";

const url = process.env.NEXT_PUBLIC_URL

export const getAllMenuItems = async (): Promise<MenuItem[]> => {
    try {
        const response: AxiosResponse<MenuItem[]> = await axios.get(`${url}/guest/menu-items`);
        return response.data;
    } catch (error) {
        throw new Error("Error fetching menu items.")
    }
}

export const getMenuItemPhoto = async (photoId: string): Promise<string> => {
    try {
        const response = await axios.get(`${url}/guest/get-image/${photoId}`, {
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







