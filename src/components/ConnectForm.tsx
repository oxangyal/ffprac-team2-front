/* eslint-disable indent */
import React, { useState } from 'react';
import {
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Select,
    Text,
    useToast,
} from '@chakra-ui/react';
import { Field, Formik, FormikHelpers } from 'formik';
import { Tutor, TutorConnectionRequest } from '../models/interfaces';
import { connectSchema } from '../validationSchemas';
import axios from 'axios';
import { getHeaders } from '../util';
import { useGlobal } from '../context/useGlobal';
import { useNavigate } from 'react-router-dom';
import AppLoader from './AppLoader';
import { theme } from '../util/theme';

interface ConnectFormProps {
    isOpen: boolean;
    onClose: () => void;
    tutor: Tutor;
}

interface InitialValues {
    studentId: string;
    availability: string;
    subject: string;
}

const initialValues: InitialValues = {
    studentId: '',
    subject: '',
    availability: '',
};

type SelectChangeEvent = React.ChangeEvent<HTMLSelectElement>;

const ConnectForm: React.FC<ConnectFormProps> = ({ isOpen, onClose, tutor }) => {
    const { students, dispatch } = useGlobal();
    const [isOptionSelected, setIsOptionSelected] = useState(false);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const toast = useToast();

    const fieldsToDisplay: (keyof Tutor)[] = [
        'MathSubject',
        'ForeignLanguages',
        'English',
        'SocialStudies',
        'Science',
    ];

    const getSubjectName = (fieldName: string): string => {
        switch (fieldName) {
            case 'MathSubject':
                return 'Math';
            case 'ForeignLanguages':
                return 'Foreign Languages';
            case 'SocialStudies':
                return 'Social Studies';
            default:
                return fieldName;
        }
    };

    const handleSubmit = async (
        values: TutorConnectionRequest,
        actions: FormikHelpers<TutorConnectionRequest>
    ) => {
        const connectionData = {
            studentId: values.studentId,
            tutorId: tutor._id,
            subject: values.subject,
            availability: values.availability,
        };

        try {
            setIsLoading(true);
            const response = await axios.patch(
                `${import.meta.env.VITE_REACT_URL}students/${values.studentId}`,
                { tutorInfo: [connectionData] },
                { headers: getHeaders() }
            );
            const studentData = response?.data;
            dispatch({ type: 'UPDATE_STUDENTS', payload: studentData.student });
            toast({
                title: response?.data.msg,
                status: 'success',
                duration: 3000,
                isClosable: true,
                position: 'top',
            });
            actions.resetForm();
            setIsOptionSelected(false);
            setIsLoading(false);
            onClose();
            navigate('/parentdashboard');
        } catch (error) {
            if (error instanceof Error) {
                setIsLoading(false);
                toast({
                    title: error.message,
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                    position: 'top',
                });
            }
        }
    };

    const handleSelectChange = () => {
        setIsOptionSelected(true);
    };

    return (
        <>
            <Modal
                isOpen={isOpen}
                onClose={() => {
                    onClose();
                    setIsOptionSelected(false);
                }}
                isCentered
            >
                <ModalOverlay />
                <Formik
                    onSubmit={handleSubmit}
                    validationSchema={connectSchema}
                    initialValues={initialValues}
                >
                    {(formik) => (
                        <ModalContent backgroundColor="#E7E0D6">
                            <form onSubmit={formik.handleSubmit}>
                                <ModalHeader>{isLoading && <AppLoader />}</ModalHeader>
                                <ModalCloseButton />
                                <ModalBody pb={6}>
                                    <FormControl
                                        mt={4}
                                        isRequired
                                        isInvalid={
                                            !!(formik.errors.studentId && formik.touched.studentId)
                                        }
                                    >
                                        <FormLabel>Which student needs help?</FormLabel>
                                        <Field
                                            as={Select}
                                            placeholder="Select student"
                                            backgroundColor="white"
                                            name="studentId"
                                        >
                                            {students &&
                                                students.map((student) => {
                                                    return (
                                                        <option
                                                            key={student._id}
                                                            value={student._id}
                                                        >
                                                            {student.name}
                                                        </option>
                                                    );
                                                })}
                                        </Field>
                                        {formik.errors.studentId && formik.touched.studentId && (
                                            <FormErrorMessage>
                                                {formik.errors.studentId}
                                            </FormErrorMessage>
                                        )}
                                    </FormControl>
                                    <Text fontSize="16px" fontWeight="500" mt="2rem">
                                        In which subject do you need tutoring?
                                    </Text>
                                    {tutor.availability.length > 0 ? (
                                        <FormControl
                                            mt={4}
                                            isRequired
                                            isInvalid={
                                                !!(
                                                    formik.errors.availability &&
                                                    formik.touched.availability
                                                )
                                            }
                                        >
                                            <FormLabel fontSize="14px" fontWeight="400">
                                                Availability
                                            </FormLabel>
                                            <Field
                                                as={Select}
                                                placeholder="Select day"
                                                backgroundColor="white"
                                                name="availability"
                                            >
                                                {tutor.availability.length > 0 &&
                                                    tutor.availability.map((day) => {
                                                        return (
                                                            <option key={day} value={day}>
                                                                {day}
                                                            </option>
                                                        );
                                                    })}
                                            </Field>
                                            {formik.errors.availability &&
                                                formik.touched.availability && (
                                                    <FormErrorMessage>
                                                        {formik.errors.availability}
                                                    </FormErrorMessage>
                                                )}
                                        </FormControl>
                                    ) : (
                                        <Text>Tutor not available right now. Send him email.</Text>
                                    )}

                                    {fieldsToDisplay.map((field) => {
                                        const fieldValue = tutor[field];
                                        if (Array.isArray(fieldValue) && fieldValue.length > 0) {
                                            return (
                                                <FormControl key={field} mt={4}>
                                                    <FormLabel fontSize="14px" fontWeight="400">
                                                        {getSubjectName(field)}
                                                    </FormLabel>
                                                    <Field
                                                        as={Select}
                                                        placeholder={`Select ${getSubjectName(field)}`}
                                                        backgroundColor="white"
                                                        name={'subject'}
                                                        onChange={(event: SelectChangeEvent) => {
                                                            handleSelectChange();
                                                            formik.setFieldValue(
                                                                'subject',
                                                                event.target.value
                                                            );
                                                        }}
                                                        disabled={isOptionSelected}
                                                    >
                                                        {fieldValue.map((option: string) => (
                                                            <option key={option} value={option}>
                                                                {option}
                                                            </option>
                                                        ))}
                                                    </Field>
                                                    {formik.errors.subject &&
                                                        formik.touched.subject && (
                                                            <FormErrorMessage>
                                                                {formik.errors.subject}
                                                            </FormErrorMessage>
                                                        )}
                                                </FormControl>
                                            );
                                        }
                                        return null;
                                    })}
                                </ModalBody>

                                <ModalFooter>
                                    <Button
                                        type="submit"
                                        bg={theme.dashboardButtons.buttonYellow.bg}
                                        fontSize={theme.dashboardButtons.fontSize}
                                        fontWeight={theme.dashboardButtons.fontWeight}
                                        mr={3}
                                        isDisabled={!formik.dirty || !formik.isValid}
                                    >
                                        Connect
                                    </Button>
                                    <Button
                                        fontSize={theme.dashboardButtons.fontSize}
                                        fontWeight={theme.dashboardButtons.fontWeight}
                                        bg={theme.dashboardButtons.buttonTeal.bg}
                                        mr={3}
                                        onClick={() => {
                                            onClose();
                                            setIsOptionSelected(false);
                                        }}
                                    >
                                        Cancel
                                    </Button>
                                </ModalFooter>
                            </form>
                        </ModalContent>
                    )}
                </Formik>
            </Modal>
        </>
    );
};

export default ConnectForm;
