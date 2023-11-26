
import useCustomerStore from '@/stores/customerStore'
import { PhoneIcon } from '@chakra-ui/icons'
import { ModalContent, ModalHeader, ModalCloseButton, ModalBody, FormControl, FormLabel, Input, ModalFooter, Button, InputGroup, InputLeftElement } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

type Props = {
    onClose: () => void
}

type FormDataFields = {
    firstName: string,
    lastName: string,
    phoneNumber: string,
    date: Date,
}

type Customer = {
    firstName: string,
    lastName: string,
    phoneNumber: string,

}

const CustomerInfoModal = (props: Props) => {
    const { onClose } = props;
    const { customer, addCustomer, setDate } = useCustomerStore();
    const router = useRouter();

    const [isDisables, setIsDisables] = useState<boolean>(true);
    const currentDate = new Date();

    currentDate.setMinutes(currentDate.getMinutes() - currentDate.getTimezoneOffset()); // Set time zone offset to zero

    const [formData, setFormData] = useState<FormDataFields>({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        date: currentDate,
    });

    function handleDateChange(event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
        const selectedDate = new Date(event.target.value);
        setFormData({
            ...formData,
            date: selectedDate
        });

    }

    function handleFormDataChange(event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
        const { name, value } = event.target;

        setFormData({
            ...formData,
            [name]: value
        })
    }

    useEffect(() => {
        const { firstName, lastName, phoneNumber } = formData
        if (firstName.length > 0 && lastName.length > 0 && phoneNumber.length > 0) {
            setIsDisables(false)
        }
        if (firstName == '' || lastName == '' || phoneNumber == '') {
            setIsDisables(true)
        }
    }, [formData])

    function handleContinue(event: React.FormEvent) {
        event.preventDefault();
        const customer = createCustomerFromFormData(formData)
        const date = createDateFromFormData(formData).getTime()
        addCustomer(customer)
        setDate(date)
        router.push('/checkout')
    }

    const createCustomerFromFormData = (formData: FormDataFields): Customer => {
        const { firstName, lastName, phoneNumber } = formData
        return { firstName, lastName, phoneNumber };
    }
    
    const createDateFromFormData = (formData: FormDataFields): Date => {
        const { date } = formData;
        return new Date(date);
    }


    return (
        <ModalContent>
            <ModalHeader color='primary'>Fill Up the Form and Pick a Date</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
                <FormControl>
                    <FormLabel color='primary' >First Name</FormLabel>
                    <Input
                        focusBorderColor='primary'
                        placeholder='First Name'
                        name='firstName'
                        value={formData.firstName}
                        onChange={handleFormDataChange}
                    />
                </FormControl>

                <FormControl mt={4}>
                    <FormLabel color='primary'>Last Name</FormLabel>
                    <Input
                        focusBorderColor='primary'
                        placeholder='Last Name'
                        name='lastName'
                        value={formData.lastName}
                        onChange={handleFormDataChange}
                    />
                </FormControl>

                <FormControl mt={4}>
                    <FormLabel color='primary'>Phone Number</FormLabel>
                    <InputGroup>
                        <InputLeftElement pointerEvents='none'>
                            <PhoneIcon color='primary' />
                        </InputLeftElement>
                        <Input
                            focusBorderColor='primary'
                            type='tel'
                            placeholder='Phone number'
                            name='phoneNumber'
                            value={formData.phoneNumber}
                            onChange={handleFormDataChange}
                        />
                    </InputGroup>
                </FormControl>
                <FormControl mt={4}>
                    <FormLabel color='primary'>Reservation Date</FormLabel>
                    <Input
                        focusBorderColor='primary'
                        size="md"
                        type="datetime-local"
                        min={currentDate.toISOString().slice(0, 16)}
                        onChange={handleDateChange}
                        name="date"
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
                    isDisabled={isDisables}
                    onClick={handleContinue}
                >
                    Continue
                </Button>
                <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
        </ModalContent>
    )
}

export default CustomerInfoModal