
import { Order } from '@/model/Booking';
import useCustomerStore from '@/stores/customerStore';
import useOrderStore from '@/stores/orderStore';
import { Button, Center, Heading, Text, Image, Flex, Box, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Spacer, Divider, useToast, Card, CardBody, CardHeader, Stack, StackDivider } from '@chakra-ui/react'
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import { formatTime, formatDate } from '@/utils'
import { useQueryClient } from 'react-query';
import menuItems from './admin/menuItems';
import { useMenuItemWithPhoto } from '@/hooks/menuItemQuery';
import { createBooking } from '@/controller/guest_api';

const CheckOut = () => {
    const queryClient = useQueryClient()
    const { orders, incrementItemCount, decrementItemCount, removeOrder } = useOrderStore();
    const { customer, date, removeCustomer, removeDate } = useCustomerStore();
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const totalPrice = Number(calculateTotalPrice(orders).toFixed(2))
    const menuItems = useMenuItemWithPhoto()
    const router = useRouter()
    const toast = useToast()

    function calculateTotalPrice(orderList: Order[]) {
        let price = 0
        orderList.map(order => {
            let priceToAdd = order.menuItem.price * order.count
            price += priceToAdd
        })

        return Number(price.toFixed(2))
    }

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault()
        const ordersList = orders.map(order => ({
            count: order.count,
            itemId: order.menuItem.id
        }))

        setIsLoading(true)

        const formData = {
            firstName: customer.firstName,
            lastName: customer.lastName,
            phoneNumber: customer.phoneNumber,
            date: date,
            orders: ordersList,
            totalPrice: Number(totalPrice.toFixed(2))
        }
        try {
            await createBooking(formData)

            toast({
                title: 'Your reservation was submitted successfully.',
                status: 'success',
                duration: 3000,
                isClosable: true,
            })

            removeCustomer()
            removeDate()
            removeOrder()

            queryClient.invalidateQueries('booking-menus')
            router.push('/')

        } catch (error: any) {
            toast({
                title: 'Error creating booking',
                description: error.message,
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        } finally {
            setIsLoading(false)
        }


    }

    return (
        <>
            <Spacer h='35px' />
            <Heading fontFamily='mono' textAlign='center' mx='10px' color='primary' fontSize={{ base: "24px", md: "40px", lg: "56px" }} >Checkout</Heading>
            <Text textAlign='center' fontSize='xl'>Please review your information and order list below.</Text>
            <Center>
                <Card
                    w={{ base: 'xs', md: 'md' }}
                    color='primary'
                    fontFamily='mono'
                    boxShadow='0'
                >
                    <CardHeader >
                        <Heading fontFamily='mono' size='md'>Booking Information</Heading>
                    </CardHeader>
                    <CardBody >
                        <Stack divider={<StackDivider />} spacing='4'>
                            <Flex justifyContent='space-between'>
                                <Box>
                                    <Heading letterSpacing='2px' fontFamily='mono' size='xs' textTransform='uppercase'>
                                        Customer Name
                                    </Heading>
                                    <Text color='black' pt='2' fontSize='sm'>
                                        {customer?.firstName} {customer?.lastName}
                                    </Text>
                                </Box>
                                <Box>
                                    <Heading letterSpacing='2px' fontFamily='mono' size='xs' textTransform='uppercase'>
                                        Contact
                                    </Heading>
                                    <Text color='black' pt='2' fontSize='sm'>
                                        {customer?.phoneNumber}
                                    </Text>
                                </Box>
                            </Flex>
                            <Box>
                                <Heading letterSpacing='2px' fontFamily='mono' size='xs' textTransform='uppercase'>
                                    Date & Time
                                </Heading>
                                <Text color='black' pt='2' fontSize='sm'>
                                    {formatDate(date).split('at')[0]} - {formatTime(date)}
                                </Text>
                            </Box>

                            <Flex justifyContent='space-between'>
                                <Box>
                                    <Heading letterSpacing='2px' fontFamily='mono' size='xs' textTransform='uppercase'>
                                        Ordered Items
                                    </Heading>
                                    {
                                        orders.map(order => {
                                            const item = menuItems.find(menu => menu.id == order.menuItem.id)
                                            return (
                                                <>
                                                    <Flex>
                                                        <Text key={`${item?.id}`} color='black' pt='2' fontSize='sm'>
                                                            {item?.name} x {order.count}
                                                        </Text>
                                                    </Flex>
                                                </>
                                            )
                                        })
                                    }
                                </Box>
                                <Box textAlign='end'>
                                    <Heading letterSpacing='2px' fontFamily='mono' size='xs' textTransform='uppercase'>
                                        Price
                                    </Heading>
                                    {
                                        orders.map(order => {
                                            const item = menuItems.find(menu => menu.id == order.menuItem.id)
                                            return (
                                                <>
                                                    <Flex>
                                                        <Text key={`${item?.id}`} color='black' pt='2' fontSize='sm'>
                                                            $ {item && Number((item?.price * order.count).toFixed(2))}
                                                        </Text>
                                                    </Flex>
                                                </>
                                            )
                                        })
                                    }
                                </Box>
                            </Flex>
                            <Box>
                                <Flex flexDir='row' justifyContent='space-between' alignItems='center'>

                                    <Heading letterSpacing='2px' fontFamily='mono' size='xs' textTransform='uppercase'>
                                        Total Price
                                    </Heading>
                                    <Text color='black' pt='2' fontSize='sm'>
                                        $ {totalPrice}
                                    </Text>
                                </Flex>
                            </Box>
                        </Stack>
                    </CardBody>
                </Card>

            </Center>
            {
                orders.map(order => {
                    const { menuItem, count } = order
                    return (
                        <>
                            <Center>
                                <Flex m='5px' overflow='hidden' justifyContent='space-between' w={{ base: 'sm' }} my='5px' borderColor='primary' border='1px' borderRadius='10px' >
                                    <Box h='100%' w='100px' >
                                        <Image
                                            objectFit='cover'
                                            w='100px'
                                            h='100px'
                                            src={order.menuItem.photoSrc}
                                            alt={order.menuItem.name}
                                        />

                                    </Box>
                                    <Flex px='5px' flexDir='column' justifyContent='center' alignItems='flex-end'>
                                        <Text fontFamily='mono' fontSize={{ base: 'sm', sm: 'lg' }} color='primary' fontStyle='bold' > {menuItem.name} x {count} </Text>
                                        <Text fontSize={{ base: 'sm', sm: 'lg' }}> Price: {Number((menuItem.price * count).toFixed(2))} </Text>
                                        <NumberInput
                                            // key={found ? found.count : 0}
                                            maxW={{ sm: '60px' }}
                                            defaultValue={order.count}
                                            // defaultValue={found == undefined ? 0 : found.count}
                                            focusBorderColor='primary'
                                            min={0}
                                            mr='10px'
                                        >
                                            <NumberInputField />
                                            <NumberInputStepper>
                                                <NumberIncrementStepper color='primary' onClick={() => incrementItemCount(order.menuItem.id)} />
                                                <NumberDecrementStepper color='primary' onClick={() => decrementItemCount(order.menuItem.id)} />
                                            </NumberInputStepper>
                                        </NumberInput>
                                    </Flex>
                                </Flex>
                            </Center>
                        </>
                    )
                })
            }
            <Heading fontFamily='mono' textAlign='center' mx='10px' color='primary' fontSize={{ base: "24px", md: "35px" }}>Total Price: {totalPrice}</Heading>
            <Center>
                <Button
                    color='white'
                    bgColor='primary'
                    my='5px'
                    mb='10px'
                    _hover={{
                        bgColor: 'secondary',
                    }}
                    onClick={handleSubmit}
                >Submit Order</Button>
            </Center>
        </>
    )
}

export default CheckOut




            {/* <Flex flexDir='column' alignItems='center' >
                <Box color='primary' p='10px' my='10px' border='1px' fontSize={{ base: 'sm', md: 'xl' }} borderRadius='10px' w={{ base: 'xs', md: 'md' }}>
                    <Flex justifyContent='space-between' >
                        <Text color='black'>Name:</Text>
                        <Text> {customer?.firstName} {customer?.lastName}</Text>
                    </Flex>
                    <Divider color='primary' my='5px' />
                    <Flex justifyContent='space-between' >
                        <Text color='black'>Phone No: </Text>
                        <Text>{customer?.phoneNumber}</Text>
                    </Flex>
                    <Divider color='primary' my='5px' />
                    <Flex justifyContent='space-between' >
                        <Text color='black'>Reservation Date: </Text>
                        <Text>{date && formatDate(date).split('at')[0]}</Text>
                    </Flex>
                    <Divider color='primary' my='5px' />
                    <Flex justifyContent='space-between' >
                        <Text color='black'>Time: </Text>
                        <Text>{date && formatTime(date)}</Text>
                    </Flex>
                </Box>
            </Flex> */}