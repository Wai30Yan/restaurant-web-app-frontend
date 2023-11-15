import { useMenuItemWithPhoto } from "@/hooks/menuItemQuery";
import { create } from "zustand";


type MenuItem = {
    id: string;
    name: string;
    category: string;
    price: number;
    photoId: string;
    photoSrc: string;
}

type MenuItemStore = {
    filteredItems: MenuItem[];
    filterMenuItems: (cat: string, menuItems: MenuItem[]) => void;
};

export const useMenuItemStore = create<MenuItemStore>((set) => ({
    filteredItems: [],
    filterMenuItems: (cat, menuItems) => {
        set((state) => {
            // Filter items based on menuItem.category with category
            const newList = menuItems.filter((item) => item.category === cat);
            return { filteredItems: newList };
        });
    },
}));

export default useMenuItemStore;
