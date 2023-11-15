

import { adminLogin } from '@/controller/admin_api'
import { Box, Card, VStack, CardBody, CardHeader, Center, FormControl, FormLabel, Heading, Input, Stack, Button, CardFooter, HStack, Spacer, useToast } from '@chakra-ui/react'
import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useState } from 'react'

const Login = () => {
    const router = useRouter()
    const toast = useToast()
    const [creds, setCreds] = useState({
        username: '',
        password: ''
    })

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target

        setCreds(prev => ({
            ...prev,
            [name]: value
        }))
    }


    async function login() {
        try {
            const res = await adminLogin(creds.username, creds.password);
            localStorage.setItem("jwtToken", res.data);
            router.push('/admin/dashboard');
        } catch (error: any) {
            if (error.response && error.response.status === 400) {
                // Handle 400 Bad Request errors
                toast({
                    title: 'Error Logging In',
                    description: 'Invalid username or password.',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                });
            } else {
                // Handle other errors
                console.error('Login error:', error);
                toast({
                    title: 'Error Logging In',
                    description: 'An unexpected error occurred.',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                });
            }
        }
        
    }


    return (
        <>
            <Center pos='relative' top='40' >
                <Card fontFamily='mono'
                    fontSize={{ base: "24px", md: "40px", lg: "56px" }}>
                    <CardHeader>
                        <Heading
                            fontFamily='mono' mx='10px' letterSpacing='3px' color='primary' fontSize={{ base: "xl", md: "4xl", lg: "4xl" }}
                        >Admin Dashboard Login</Heading>
                    </CardHeader>
                    <CardBody>
                        <VStack alignItems='flex-start' >
                            <Center letterSpacing='1px'
                                fontFamily='mono' color='primary'
                                fontSize={{ base: "sm", md: "md", lg: "md" }}
                            >
                                Username
                            </Center>
                            <Input focusBorderColor='primary' name='username' onChange={handleChange} placeholder='Username' />
                        </VStack>
                        <Spacer h='10px' />
                        <VStack alignItems='flex-start' >
                            <Center letterSpacing='1px'
                                fontFamily='mono' color='primary'
                                fontSize={{ base: "sm", md: "md", lg: "md" }}
                            >
                                Password
                            </Center>
                            <Input focusBorderColor='primary' name='password' type='password' onChange={handleChange} placeholder='Password' />
                        </VStack>
 
                    </CardBody>
                    <CardFooter justifyContent='end'>
                        <Button

                            size={{ base: 'xs', sm: 'sm', md: 'lg' }}
                            onClick={login}
                            color='white'
                            bgColor='primary'
                            _hover={{
                                bgColor: 'secondary',
                            }}
                            isDisabled={creds.password == '' || creds.username == '' ? true : false}

                        >
                            Sign in
                        </Button>
                    </CardFooter>
                </Card>
            </Center>
        </>
    )
}

export default Login