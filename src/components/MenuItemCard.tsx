import { MenuItem } from '@/model/MenuItem'
import useOrderStore from '@/stores/orderStore';
import { Card, Stack, CardBody, Heading, CardFooter, Button, Image, Text, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Box, Flex, VStack } from '@chakra-ui/react';
import React from 'react'

type Props = {
    menuItem: MenuItem
}

const MenuItemCard = (props: Props): JSX.Element => {
    const { id, name, category, price, photoSrc } = props.menuItem;
    const { orders, isItemInOrders, addItemToOrder, removeItemFromOrder, incrementItemCount, decrementItemCount } = useOrderStore();


    const found = isItemInOrders(id)

    function handleAdd() {
        if (found !== undefined) incrementItemCount(id);
        else addItemToOrder(props.menuItem)
    }

    function handleRemove() {
        if (found !== undefined) decrementItemCount(id)
    }

    function handleRemoveAll() {
        if (found !== undefined) removeItemFromOrder(id)
    }

    return (
        <Card
            m='10px'
            direction={{ base: 'column', sm: 'row' }}
            overflow='hidden'
            variant='outline'
            h={{ base: 'lg', sm: 'xs', md: 'xs' }}
        >
            <Image
                objectFit='cover'
                maxW={{ base: '100%', sm: '200px' }}
                // h={{ xxs: 'xs' }}
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
                    <VStack>
                    <Heading fontFamily='mono' color='primary' size='sm'>Add to Cart</Heading>
                    <Flex>

                    <NumberInput
                        key={found ? found.count : 0}
                        maxW={{ sm: '90px' }}
                        defaultValue={found == undefined ? 0 : found.count}
                        focusBorderColor='primary'
                        min={0}
                        mr='10px'
                    >
                        <NumberInputField />
                        <NumberInputStepper>
                            <NumberIncrementStepper color='primary' onClick={handleAdd} />
                            <NumberDecrementStepper color='primary' onClick={handleRemove} />
                        </NumberInputStepper>
                    </NumberInput>
                    <Button
                        color='white'
                        bgColor='primary'
                        mr='5px'
                        _hover={{
                            bgColor: 'secondary',
                        }}
                        w={{ base: '80px', sm: '80px', md: '110px'}}
                        fontSize={{ base: 'xs', md: 'md' }}
                        isDisabled={found?.count === 0 || found?.count === undefined}
                        onClick={handleRemoveAll} >
                        Remove
                    </Button>
                    </Flex>
                    </VStack>
                </CardFooter>
            </Stack>
        </Card>
    )
}

export default MenuItemCard