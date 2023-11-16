import AddItemModal from '@/components/AddItemModal';
import { deleteMenuItem } from '@/controller/admin_api';
import { useAdminMenuItemWithPhoto } from '@/hooks/menuItemQuery';
import { MenuItem } from '@/model/MenuItem';
import useMenuItemStore from '@/stores/menuItemStore';
import { Button, Image, Text, Card, CardBody, CardFooter, Flex, Heading, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Stack, VStack, Wrap, WrapItem, Center, Select, HStack, useDisclosure, Modal, ModalOverlay, useToast } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import { useQueryClient } from 'react-query';


const MenuItems = () => {
    const queryClient = useQueryClient()
    const data = useAdminMenuItemWithPhoto();
    const { filteredItems, filterMenuItems } = useMenuItemStore();

    const { isOpen, onOpen, onClose } = useDisclosure()

    const toast = useToast()

    const [filtered, setFiltered] = useState<boolean>(false);
    function handleFilter(cat: string) {
        if (cat == 'all') {
            setFiltered(false)
            return
        }

        if (cat == '') return

        filterMenuItems(cat, data)
        setFiltered(true)
    }

    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            setIsScrolled(scrollTop > 0);
        };

        window.addEventListener('scroll', handleScroll);

        // Clean up the event listener on component unmount
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    async function handleDelete(id: string, photoId: string) {
        // const res = await deleteMenuItem(id, photoId);
        try {
            const res = await deleteMenuItem(id, photoId);
    
            if (res.status === 200) {
                // Menu item successfully deleted (HTTP 200 OK)
                toast({
                    title: 'Success',
                    description: res.data,
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                });
            } 

            queryClient.invalidateQueries('menu-items')
            queryClient.invalidateQueries('booking-menus')
            
        } catch (error) {
            // Handle network or other errors
            toast({
                title: 'Error',
                description: 'An error occurred while deleting the menu item.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    }

    return (
        <>
            <Flex pos='sticky' top='0' zIndex='100'
                justifyContent='space-between'
                alignItems='center'
            >
                <Text fontFamily='mono' px='20px' my='10px' letterSpacing='3px'
                    fontSize={{ base: "xl", md: "4xl", lg: "4xl" }}
                    color={isScrolled ? 'transparent' : 'primary'}
                >Menu Item List</Text>
                <HStack spacing='10px'>
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
                    <Button
                        w={{ base: 'xxs', sm: 'sm', md: 'sm' }}
                        fontSize={{ base: 'xxs', sm: 'md', md: 'md' }}
                        onClick={onOpen} color='white'
                        bgColor='primary'
                        mr='5px'
                        _hover={{
                            bgColor: 'secondary',
                        }}>Add a Menu Item</Button>
                    <Modal
                        isOpen={isOpen}
                        onClose={onClose}
                    >
                        <ModalOverlay />
                        <AddItemModal onClose={onClose} />
                    </Modal>
                </HStack>
            </Flex>
            <Wrap my='10px' justify='center' >
                {
                    filtered ?
                        filteredItems?.map(item => {
                            const { category, id, photoSrc, name, price, photoId } = item
                            return (
                                <>
                                    <WrapItem key={item.id} >
                                        <Card
                                            m='10px'
                                            direction={{ base: 'column', sm: 'row' }}
                                            overflow='hidden'
                                            variant='outline'
                                            w={{ sm: 'sm', md: 'md' }}
                                            h={{ base: 'sm', sm: 'xs', md: 'xs' }}
                                        >
                                            <Image
                                                objectFit='cover'
                                                maxW={{ base: '100%', sm: '200px' }}
                                                src={photoSrc}
                                                alt={name}
                                            />
                                            <Stack>
                                                <CardBody>
                                                    <Heading fontFamily='mono' color='primary' size='md'>{name}</Heading>

                                                    <Text py='2'>
                                                        Category: {category}
                                                    </Text>
                                                    <Text py='2'>
                                                        Price: ${price}
                                                    </Text>
                                                </CardBody>

                                                <CardFooter>
                                                    <Flex w={{ base: 'xxs', md: 'sm' }}>
                                                        <Button
                                                            mr='5px'
                                                            color='red.400'
                                                            w={{ base: '80px', sm: '80px', md: '110px' }}
                                                            fontSize={{ base: 'xs', md: 'md' }}
                                                            onClick={() => handleDelete(id, photoId)} >
                                                            Delete
                                                        </Button>
                                                    </Flex>
                                                    <VStack>
                                                    </VStack>
                                                </CardFooter>
                                            </Stack>
                                        </Card>
                                    </WrapItem>
                                </>
                            )
                        })
                        :
                        data?.map(item => {
                            const { category, id, photoSrc, name, price, photoId } = item
                            return (
                                <>
                                    <WrapItem key={item.id} >
                                        <Card
                                            m='10px'
                                            direction={{ base: 'column', sm: 'row' }}
                                            overflow='hidden'
                                            variant='outline'
                                            w={{ sm: 'sm', md: 'md' }}
                                            h={{ base: 'sm', sm: 'xs', md: 'xs' }}
                                        >
                                            <Image
                                                objectFit='cover'
                                                maxW={{ base: '100%', sm: '200px' }}
                                                src={photoSrc}
                                                alt={name}
                                            />
                                            <Stack>
                                                <CardBody>
                                                    <Heading fontFamily='mono' color='primary' size='md'>{name}</Heading>

                                                    <Text py='2'>
                                                        Category: {category}
                                                    </Text>
                                                    <Text py='2'>
                                                        Price: ${price}
                                                    </Text>
                                                </CardBody>

                                                <CardFooter>
                                                    <Flex w={{ base: 'xxs', md: 'sm' }}>
                                                        <Button
                                                            mr='5px'
                                                            color='red.400'
                                                            w={{ base: '80px', sm: '80px', md: '110px' }}
                                                            fontSize={{ base: 'xs', md: 'md' }}
                                                            onClick={() => handleDelete(id, photoId)} >
                                                            Delete
                                                        </Button>
                                                    </Flex>
                                                    <VStack>
                                                    </VStack>
                                                </CardFooter>
                                            </Stack>
                                        </Card>
                                    </WrapItem>
                                </>
                            )
                        })
                }
            </Wrap>
        </>
    )
}

export default MenuItems