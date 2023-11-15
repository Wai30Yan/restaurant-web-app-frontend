import { MenuItem } from "@/model/MenuItem"
import { create } from "zustand"

type Order = {
    count: number,
    menuItem: MenuItem,
}

type OrderStore = {
    orders: Order[],
    isItemInOrders: (itemId: string) => Order | undefined
    addItemToOrder: (item: MenuItem) => void,
    removeItemFromOrder: (itemId: string) => void,
    incrementItemCount: (itemId: string) => void,
    decrementItemCount: (itemId: string) => void,
    removeOrder: () => void
}

const useOrderStore = create<OrderStore>((set, get) => ({
    orders: [],
    isItemInOrders: (itemId) => {
        const state = get(); 
        const foundItem = state.orders.find(order => order.menuItem.id === itemId);
        return foundItem
    },
    addItemToOrder: (menuItem) => {
        set((state) => ({
            orders: [
                ...state.orders,
                { menuItem, count: 1 }
            ]
        }));
    },
    removeItemFromOrder: (itemId) => {
        set((state) => ({
            orders: state.orders.filter(order => order.menuItem.id !== itemId)
        }));
    },
    incrementItemCount: (itemId) => {
        set((state) => ({
            orders: state.orders.map(order =>
                order.menuItem.id === itemId ? { ...order, count: order.count + 1 } : order
            )
        }));
    },
    decrementItemCount: (itemId) => {
        set((state) => {
            const updatedOrders = state.orders.map(order => {
                if (order.menuItem.id === itemId) {
                    if (order.count >= 1) {
                        return { ...order, count: order.count - 1 };
                    } 
                }
                return order;
            });
    
            return { orders: updatedOrders.filter(order => order !== null) }; 
        });
    },
    removeOrder: () => {
        set({
            orders: []
        })
    }
}));

export default useOrderStore;