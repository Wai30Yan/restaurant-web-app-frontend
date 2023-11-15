
import { addItemWithFormDataAndFile } from '@/controller/admin_api'
import { Select, ModalContent, ModalHeader, ModalCloseButton, ModalBody, FormControl, FormLabel, Input, ModalFooter, Button, Spacer, useToast } from '@chakra-ui/react'
import React, { useRef, useState } from 'react'
import { useQueryClient } from 'react-query'

type Props = {
    onClose: () => void
}

export type FormDataFields = {
    name: string,
    category: string,
    price: string,
    photo: File
}

const AddItemModal = (props: Props) => {
    const queryClient = useQueryClient()
    const { onClose } = props;
    const toast = useToast()

    const [formData, setFormData] = useState<FormDataFields>({
        name: '',
        category: '',
        price: '',
        photo: new File([], 'placeholder.jpg'),
    });

    function handleFormDataChange(event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
        const { name, value } = event.target;

        setFormData({
            ...formData,
            [name]: value
        })
    }

    function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
        const photo = event.target.files?.[0] || formData.photo;

        if (photo && photo.size > 1 * 1024 * 1024) {
            alert("File size exceeds 1MB. Please choose a smaller file.");
            event.target.value = ""; 
        } else {
            setFormData({
                ...formData,
                photo,
            });
        }
    }

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault();

        try {
            if (formData.photo !== null) {
                await addItemWithFormDataAndFile(formData).then(res => {
                    if (res.status >= 200 && res.status < 300) {
                        toast({
                            title: 'Menu Item was added successfully.',
                            status: 'success',
                            duration: 3000,
                            isClosable: true,
                        })
                        onClose();
                    }
                })
            }
            queryClient.invalidateQueries('menu-items')
        } catch (error: any) {
            toast({
                title: 'Error creating menu item.',
                description: error.message, 
                status: 'error',
                duration: 3000, 
                isClosable: true,
            });
        }
    }

    return (
        <ModalContent>
            <ModalHeader color='primary'>Create a Menu Item</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
                <FormControl>
                    <FormLabel color='primary' >Item Name</FormLabel>
                    <Input
                        focusBorderColor='primary'
                        placeholder='Name'
                        name='name'
                        value={formData.name}
                        onChange={handleFormDataChange}
                    />
                </FormControl>

                <FormControl mt={4}>
                    <FormLabel color='primary'>Category</FormLabel>
                    <Select
                        focusBorderColor='primary'
                        placeholder='Select option'
                        name='category'
                        value={formData.category}
                        onChange={handleFormDataChange}
                    >
                        <option value='main'>Main</option>
                        <option value='side'>Side</option>
                        <option value='drink'>Drink</option>
                        <option value='dessert'>Dessert</option>
                    </Select>
                </FormControl>

                <FormControl mt={4}>
                    <FormLabel color='primary'>Price</FormLabel>
                    <Input
                        focusBorderColor='primary'
                        placeholder='Price'
                        type='number'
                        name='price'
                        value={formData.price}
                        onChange={handleFormDataChange}

                    />
                </FormControl>
                <Spacer h='10' />
                <FormControl>
                    <input type='file'
                        accept="image/jpeg, image/jpg"
                        name='photo'
                        onChange={handleFileChange}
                    />
                </FormControl>
            </ModalBody>

            <ModalFooter>
                <Button
                    color='white'
                    bgColor='primary'
                    _hover={{
                        bgColor: 'secondary',
                    }}
                    mr={3}
                    onClick={handleSubmit}
                >
                    Add to Menu
                </Button>
                <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
        </ModalContent>
    )
}

export default AddItemModal