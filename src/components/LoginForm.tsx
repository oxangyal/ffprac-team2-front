import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Formik, Form, Field } from 'formik';
import {
    Stack,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputRightElement,
    Button,
    FormErrorMessage,
    useBreakpointValue,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { LoginData } from '../models/interfaces';
import { loginValidationSchema } from '../validationSchemas';
import { useGlobal } from '../context/useGlobal';

const labelStyle = {
    fontSize: '14px',
    fontWeight: 'normal',
};

const LoginForm: React.FC = () => {
    const navigate = useNavigate();
    const { dispatch } = useGlobal();
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const fieldLength = useBreakpointValue({ base: '300px', md: '350px' });
    const fieldHeight = useBreakpointValue({ base: '40px', md: '50px' });
    const inputStyle = {
        width: fieldLength,
        height: fieldHeight,
        backgroundColor: 'white',
    };

    const buttonLength = useBreakpointValue({ base: '120px', md: '150px' });
    const buttonHeight = useBreakpointValue({ base: '40px', md: '50px' });
    const buttonStyle = {
        width: buttonLength,
        height: buttonHeight,
        fontWeight: 'bold',
    };

    const initialValues: LoginData = { email: '', password: '' };
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={loginValidationSchema}
            onSubmit={async (values, { setSubmitting, setStatus, setFieldError }) => {
                setIsLoading(true);

                try {
                    const response = await axios.post(
                        `${import.meta.env.VITE_REACT_URL}auth/login`,
                        values
                    );
                    const token = response.data.token;
                    localStorage.setItem('token', token);
                    const { firstName, lastName, email, role } = response.data.user;
                    const userData = { firstName, lastName, email, role };
                    localStorage.setItem('userData', JSON.stringify(userData));

                    const globalUser = {
                        firstName: firstName,
                        lastName: lastName,
                        email: email,
                        role: role,
                        token: response.data.token,
                    };
                    dispatch({ type: 'SET_USER', payload: globalUser });
                    dispatch({ type: 'SET_IS_LOGGED_IN', payload: true });

                    if (role === 'parent') {
                        navigate('/parentdashboard');
                    } else {
                        navigate('/tutorprofile');
                    }
                } catch (error) {
                    setStatus('failed');
                    setFieldError('password', 'Invalid email or password. Please try again.');
                }
                setSubmitting(false);
                setIsLoading(false);
            }}
        >
            {(formik) => (
                <Form onSubmit={formik.handleSubmit}>
                    <Stack spacing={4} style={{ width: fieldLength }}>
                        <FormControl
                            isRequired
                            isInvalid={!!(formik.errors.email && formik.touched.email)}
                        >
                            <FormLabel htmlFor="email" style={labelStyle}>
                                Email
                            </FormLabel>
                            <Field
                                as={Input}
                                type="email"
                                id="email"
                                name="email"
                                style={inputStyle}
                            />
                            {formik.errors.email && formik.touched.email && (
                                <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
                            )}
                        </FormControl>
                        <FormControl
                            isRequired
                            isInvalid={!!(formik.errors.password && formik.touched.password)}
                        >
                            <FormLabel htmlFor="password" style={labelStyle}>
                                Password
                            </FormLabel>
                            <InputGroup>
                                <Field
                                    as={Input}
                                    pr="4.5rem"
                                    type={showPassword ? 'text' : 'password'}
                                    id="password"
                                    name="password"
                                    style={inputStyle}
                                />
                                <InputRightElement width="4.5rem">
                                    <Button
                                        h="1.75rem"
                                        size="sm"
                                        fontSize="20px"
                                        onClick={togglePasswordVisibility}
                                        style={{ backgroundColor: 'transparent' }}
                                    >
                                        {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                            {formik.errors.password && formik.touched.password && (
                                <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
                            )}
                        </FormControl>
                        <Stack
                            direction="row"
                            spacing={4}
                            display="flex"
                            alignItems="center"
                            marginTop={4}
                            marginBottom={4}
                        >
                            <Button
                                type="submit"
                                style={{
                                    ...buttonStyle,
                                    backgroundColor: '#F4CD76',
                                    color: 'black',
                                }}
                                flex="1"
                                isLoading={isLoading}
                                loadingText="Logging in..."
                            >
                                Login
                            </Button>
                            <Button
                                type="button"
                                style={{
                                    ...buttonStyle,
                                    backgroundColor: '#59D3C8',
                                    color: 'black',
                                }}
                                flex="1"
                                onClick={() => navigate('/')}
                            >
                                Cancel
                            </Button>
                        </Stack>
                    </Stack>
                </Form>
            )}
        </Formik>
    );
};

export default LoginForm;
