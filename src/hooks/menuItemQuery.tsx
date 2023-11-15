import { adminGetAllMenuItems, adminGetMenuItemPhoto } from "@/controller/admin_api";
import { getAllMenuItems, getMenuItemPhoto } from "@/controller/menuItemController";
import { MenuItem } from "@/model/MenuItem";
import { useQueries, useQuery } from "react-query"


export const useMenuItemWithPhoto = (): MenuItem[] => {
  const { data: menuItems = [] } = useQuery('menu-items', getAllMenuItems);

  const queries = menuItems ? menuItems?.map(item => {
    return {
      queryKey: ['menu-items', item.id],
      queryFn: () => getMenuItemPhoto(item.photoId),
    }
  }) : [] ;


  const photos = useQueries(queries);

  // Combine menuItems with their respective photos
  const menuItemsWithPhotos =  menuItems?.map((item, index) => ({
    ...item,
    photoSrc: photos[index].data ?? '',
  }));

  return menuItemsWithPhotos;
}

export const useAdminMenuItemWithPhoto = (): MenuItem[] => {
  const { data: menuItems = [] } = useQuery('menu-items', adminGetAllMenuItems);

  const queries = menuItems ? menuItems?.map(item => {
    return {
      queryKey: ['menu-items', item.id],
      queryFn: () => adminGetMenuItemPhoto(item.photoId),
    }
  }) : [] ;


  const photos = useQueries(queries);

  // Combine menuItems with their respective photos
  const menuItemsWithPhotos =  menuItems?.map((item, index) => ({
    ...item,
    photoSrc: photos[index].data ?? '',
  }));

  return menuItemsWithPhotos;
}
