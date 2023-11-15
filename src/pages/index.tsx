import Head from 'next/head'
import { useMenuItemWithPhoto } from '@/hooks/menuItemQuery';
import MenuItemCard from '@/components/MenuItemCard';
import { useState } from 'react';
import { Button, Center, Flex, HStack, Heading, Modal, ModalOverlay, Select, Text, Wrap, WrapItem, useDisclosure } from '@chakra-ui/react';
import CustomerInfoModal from '@/components/CustomerInfoModal';
import useOrderStore from '@/stores/orderStore';
import { Order } from '@/model/Booking';
import { useMenuItemStore } from '@/stores/menuItemStore';
import axios from 'axios';

export default function Home() {
  const data = useMenuItemWithPhoto();
  const { orders } = useOrderStore();

  const { filteredItems, filterMenuItems } = useMenuItemStore();

  const { isOpen, onOpen, onClose } = useDisclosure()

  const [filtered, setFiltered] = useState<boolean>(false);


  function calculateTotalPrice(orderList: Order[]) {
    return orderList.reduce((total, order) => {
      return total + order.menuItem.price * order.count;
    }, 0);
  }

  const totalPrice = calculateTotalPrice(orders)

  function handleFilter(cat: string) {
    if (cat == 'all') {
      console.log(cat)
      setFiltered(false)
      return
    }
    filterMenuItems(cat, data)
    setFiltered(true)
  }

  return (
    <>
      <Head>
        <title>Restaurant Web App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Flex w="100%" boxShadow='lg' bgColor='white' pos='sticky' top='0' zIndex='100' justifyContent='space-between' alignItems='center' >
          <Heading fontFamily='mono' mx='10px' letterSpacing='3px' color='primary' fontSize={{ base: "24px", md: "40px", lg: "56px" }} >The Kitchen</Heading>
          <HStack spacing='20px'>
            <Text fontSize='lg' >Total Price: ${totalPrice}</Text>
            <Button
              size={{ base: 'xs', sm: 'sm', md: 'md' }}
              onClick={onOpen} color='white'
              bgColor='primary'
              mr='10px'
              _hover={{
                bgColor: 'secondary',
              }}>Make a Booking</Button>
          </HStack>
          <Modal
            isOpen={isOpen}
            onClose={onClose}
          >
            <ModalOverlay />
            <CustomerInfoModal onClose={onClose} />
          </Modal>
        </Flex>
        <Center pos='sticky' top='20' zIndex='100' >
          <Select
            onChange={(event) => handleFilter(event.target.value)}
            bgColor='white'
            focusBorderColor='primary'
            maxW='xs' placeholder='Select option'>
            <option value='all'>All</option>
            <option value='main'>Main</option>
            <option value='side'>Side</option>
            <option value='drink'>Drink</option>
            <option value='dessert'>Dessert</option>
          </Select>
        </Center>
        <Wrap my='10px' justify='center' >
          {filtered ?
            filteredItems?.map(item => {
              return (
                <>
                  <WrapItem key={item.id} >
                    <MenuItemCard menuItem={item} />
                  </WrapItem>
                </>
              )
            })
            :
            data?.map(item => {
              return (
                <>
                  <WrapItem key={item.id} >
                    <MenuItemCard menuItem={item} />
                  </WrapItem>
                </>
              )
            })
          }
        </Wrap>
      </main>
    </>
  )
}
