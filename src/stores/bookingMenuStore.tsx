import { MenuItem } from "@/model/MenuItem"
import { create } from "zustand"

type Order = {
    count: number,
    itemId: string
}

type Booking = {
    id: string,
    firstName: string,
    lastName: string,
    phoneNumber: string,
    date: number,
    totalPrice: number,
    orders: Order[],
}

export type BookingMenu = {
    booking: Booking,
    menuItems: MenuItem[]
}

type BookingMenuStore = {
    bookingMenu: BookingMenu,
    setBookingMenu: (bkmn: BookingMenu) => void,
    removeBookingMenu: () => void
}

export const useBookingMenuStore = create<BookingMenuStore>()((set) => ({
    bookingMenu: {
        booking: {
            id: "",
            firstName: "",
            lastName: "",
            phoneNumber: "",
            date: 0,
            totalPrice: 0,
            orders: []
        },
        menuItems: [],
    },
    setBookingMenu(bookingMenu) {
        set({bookingMenu})
    },
    removeBookingMenu() {
        set({
            bookingMenu: {
                booking: {
                    id: "",
                    firstName: "",
                    lastName: "",
                    phoneNumber: "",
                    date: 0,
                    totalPrice: 0,
                    orders: []
                },
                menuItems: [],
            }
        })
    }
}));