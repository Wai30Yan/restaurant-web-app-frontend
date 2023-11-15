import { MenuItem } from '@/model/MenuItem';
import { BookingMenu } from '@/stores/bookingMenuStore';
import { formatTime, formatDate } from '@/utils';
import { Text, ModalContent, ModalHeader, ModalCloseButton, ModalBody, FormControl, FormLabel, Input, ModalFooter, Button, Box, Card, CardBody, CardHeader, Heading, Stack, StackDivider, Flex, Divider, Modal, ModalOverlay } from '@chakra-ui/react'
import React from 'react'

type Props = {
    onClose: () => void,
    isOpen: boolean,
    onOpen: () => void,
    bookingMenu: BookingMenu,
}


const UpdateBookingMenuModal = (props: Props) => {
    const { onClose, isOpen } = props
    const { booking, menuItems } = props.bookingMenu

    function handleClick() {
        console.log(booking)
    }
    
    return (
        <>
            <Modal isOpen={isOpen}
                onClose={onClose}
                >
                <ModalOverlay />
                <ModalContent>
                    <ModalCloseButton zIndex='100' />
                    <ModalBody pb={6}>
                        <Card color='primary' fontFamily='mono' boxShadow='0'>
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
                                                {booking?.firstName} {booking?.lastName}
                                            </Text>
                                        </Box>
                                        <Box>
                                            <Heading letterSpacing='2px' fontFamily='mono' size='xs' textTransform='uppercase'>
                                                Contact
                                            </Heading>
                                            <Text color='black' pt='2' fontSize='sm'>
                                                {booking?.phoneNumber}
                                            </Text>
                                        </Box>
                                    </Flex>
                                    <Box>
                                        <Heading letterSpacing='2px' fontFamily='mono' size='xs' textTransform='uppercase'>
                                            Date & Time
                                        </Heading>
                                        <Text color='black' pt='2' fontSize='sm'>
                                            {formatDate(booking?.date).split('at')[0]} - {formatTime(booking?.date)}
                                        </Text>
                                    </Box>

                                    <Flex justifyContent='space-between'>
                                        <Box>
                                            <Heading letterSpacing='2px' fontFamily='mono' size='xs' textTransform='uppercase'>
                                                Ordered Items
                                            </Heading>
                                            {
                                                booking.orders.map(order => {
                                                    const item = menuItems.find(menu => menu.id == order.itemId)
                                                    return (
                                                        <>
                                                            <Flex>
                                                                <Text key={`${booking.id} ${item?.id}`} color='black' pt='2' fontSize='sm'>
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
                                                booking.orders.map(order => {
                                                    const item = menuItems.find(menu => menu.id == order.itemId)
                                                    return (
                                                        <>
                                                            <Flex>
                                                                <Text key={`${booking.id} ${item?.id}`} color='black' pt='2' fontSize='sm'>
                                                                    $ {item && item?.price * order.count} 
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
                                            $ {booking?.totalPrice}
                                        </Text>
                                        </Flex>
                                    </Box>
                                </Stack>
                            </CardBody>
                        </Card>
                    </ModalBody>

                    <ModalFooter>
                        <Button bgColor='primary' color='white' mr={3}
                            onClick={handleClick}
                            _hover={{
                                bgColor: 'secondary',
                            }}
                        >
                            Update
                        </Button>
                        <Button colorScheme='red' mr={3}>
                            Delete
                        </Button>
                        {/* <Button onClick={onClose}>Cancel</Button> */}
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default UpdateBookingMenuModal