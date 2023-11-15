import { create } from "zustand";
import { MenuItem } from "../model/MenuItem";
import { useMenuItemWithPhoto } from "../hooks/menuItemQuery";

type Customer = {
    firstName: string,
    lastName: string,
    phoneNumber: string,
}

type CustomerStore = {
    customer: Customer,
    date: number,
    addCustomer: (customer: Customer) => void,
    removeCustomer: () => void,
    setDate: (date: number) => void,
    removeDate: () => void
}

const useCustomerStore = create<CustomerStore>() ((set) => ({
    customer: {
        firstName: "",
        lastName: "",
        phoneNumber: ""
    },
    date: 0,
    addCustomer(customer: Customer) {
        set({
            customer
        })
    },
    removeCustomer: () => {
        set({
            customer: {
                firstName: "",
                lastName: "",
                phoneNumber: ""
            }
        })
    },
    setDate(date: number) {
        set({
            date
        })
    },
    removeDate: () => {
        set({
            date: 0
        })
    }
}));


export default useCustomerStore;


