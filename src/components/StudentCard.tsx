import React, { useState } from 'react';
import { Student } from '../models/interfaces';
import {
    Heading,
    Text,
    Button,
    Flex,
    Table,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    Avatar,
    Card,
    CardBody,
    CardFooter,
    Stack,
    useDisclosure,
    useToast,
} from '@chakra-ui/react';
import avatar from '../assets/avatar.png';
import { EditIcon, EmailIcon } from '@chakra-ui/icons';
import StudentForm from './StudentForm';

import axios from 'axios';
import AlertPopUp from './AlertPopUp';
import AppLoader from './AppLoader';
import { getHeaders } from '../util';
import { useGlobal } from '../context/useGlobal';
import { theme } from '../util/theme';

interface StudentCardProps {
    student: Student;
    setNeedUpdate: React.Dispatch<React.SetStateAction<boolean>>;
}
const StudentCard: React.FC<StudentCardProps> = ({ student, setNeedUpdate }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const profileImage = student.image ? student.image : avatar;
    const [isLoading, setIsLoading] = useState(false);
    const { dispatch } = useGlobal();
    const toast = useToast();

    const handleDeleteTutor = async (tutorId: string, subject: string) => {
        try {
            setIsLoading(true);
            const response = await axios.patch(
                `${import.meta.env.VITE_REACT_URL}students/${student?._id}`,
                { tutorToRemove: { tutorId, subject } },
                { headers: getHeaders() }
            );
            dispatch({ type: 'SET_STUDENTS', payload: response?.data.student });
            setNeedUpdate(true);
            setIsLoading(false);
            toast({
                title: response?.data.msg,
                status: 'success',
                duration: 3000,
                isClosable: true,
                position: 'top',
            });
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

    const handleSendEmail = async (tutorId: string) => {
        const response = await axios.get(`${import.meta.env.VITE_REACT_URL}tutors/${tutorId}`, {
            headers: getHeaders(),
        });
        const recipientEmail = response.data.tutor.userId.email;
        console.log(recipientEmail);
        const subject = encodeURIComponent('Tutoring inquiry');
        const body = encodeURIComponent('');

        window.location.href = `mailto:${recipientEmail}?subject=${subject}&body=${body}`;
    };

    return (
        <Card
            direction={{ base: 'column', sm: 'row' }}
            overflow="hidden"
            variant="outline"
            display={'flex'}
            m={'1rem 0'}
        >
            <Stack
                direction={{ base: 'row', sm: 'column', md: 'row' }}
                m={{ base: '5', sm: 'auto' }}
                display={'flex'}
                alignItems={'center'}
                justifyContent={'center'}
                w={{ base: '100%', sm: '30%' }}
            >
                <Avatar size={{ base: 'xl', md: '2xl' }} name={student.name} src={profileImage} />
                <Stack direction={{ base: 'column', sm: 'column' }} ml={{ base: '10px', sm: '0' }}>
                    <Heading as="h4" size="md">
                        {student.name}
                    </Heading>
                    <Text fontSize="md">Grade {student.grade}</Text>
                </Stack>
            </Stack>

            <Stack
                w={{ base: '100%', md: '75%' }}
                display={'flex'}
                justifyContent={'flex-end'}
                alignItems={'flex-end'}
            >
                <CardBody w={{ base: '100%', md: '80%' }} p={{ base: '0', sm: '2' }}>
                    <Table variant="simple" size={{ base: 'sm', md: 'lg' }}>
                        <Thead>
                            <Tr>
                                <Th>Tutor</Th>
                                <Th>Subject</Th>
                                <Th>Day</Th>
                                <Th></Th>
                            </Tr>
                        </Thead>
                        {isLoading && <AppLoader />}
                        <Tbody>
                            {student.tutorInfo &&
                                student.tutorInfo?.length > 0 &&
                                student.tutorInfo?.map((element) => (
                                    <Tr key={element.tutorId + element.subject}>
                                        <Td fontSize="md" p={{ base: '0', sm: '0' }}>
                                            {element.tutorName}
                                        </Td>
                                        <Td fontSize="md" p={{ base: '0', sm: '0' }}>
                                            {element.subject}
                                        </Td>
                                        <Td fontSize="md" p={{ base: '0', sm: '0' }}>
                                            {element.availability}
                                        </Td>
                                        <Td p={{ base: '0', sm: '0' }}>
                                            <Flex gap={{ base: '0', md: '4' }}>
                                                <Button
                                                    backgroundColor="white"
                                                    onClick={() => {
                                                        handleSendEmail(element.tutorId);
                                                    }}
                                                >
                                                    <EmailIcon w="18px" h="18px" />
                                                </Button>

                                                {student && (
                                                    <AlertPopUp
                                                        title="Remove subject from student"
                                                        bgColor="white"
                                                        onClick={() =>
                                                            handleDeleteTutor(
                                                                element.tutorId,
                                                                element.subject
                                                            )
                                                        }
                                                    />
                                                )}
                                            </Flex>
                                        </Td>
                                    </Tr>
                                ))}
                        </Tbody>
                    </Table>
                </CardBody>

                <CardFooter display={'flex'} alignItems={'flex-end'} justifyContent={'flex-end'}>
                    <Button
                        leftIcon={<EditIcon />}
                        fontSize={theme.dashboardButtons.fontSize}
                        fontWeight={theme.dashboardButtons.fontWeight}
                        bg={theme.dashboardButtons.buttonTeal.bg}
                        variant="solid"
                        color="black"
                        onClick={onOpen}
                    >
                        Edit Student
                    </Button>
                    <StudentForm
                        isOpenForm={isOpen}
                        onCloseForm={onClose}
                        title="Edit Student"
                        student={student}
                        setNeedUpdate={setNeedUpdate}
                    />
                </CardFooter>
            </Stack>
        </Card>
    );
};
export default StudentCard;
