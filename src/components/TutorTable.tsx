import { Box, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';

import React from 'react';
import { TutorStudents } from '../models/interfaces';
import { theme } from '../util/theme';

type TutorTableProps = {
    students: TutorStudents[];
};

const TutorTable: React.FC<TutorTableProps> = ({ students }) => {
    return (
        <Box>
            <Box overflowX="auto" overflowY="hidden" mt="50px" borderRadius="md" width="100%">
                <Table variant="striped" bg={theme.colors.customWhite}>
                    <Thead>
                        <Tr
                            bg={theme.dashboardButtons.buttonTeal.bg}
                            fontWeight={theme.dashboardButtons.fontWeight}
                            color="black"
                            borderRadius="md"
                        >
                            <Th>Parent</Th>
                            <Th>Student</Th>
                            <Th>Email</Th>
                            <Th>Subject</Th>
                            <Th>Schedule</Th>
                        </Tr>
                    </Thead>
                    <Tbody fontSize="13px">
                        {students.map((student, index) => (
                            <Tr key={index}>
                                <Td>{student.parent}</Td>
                                <Td>{student.name}</Td>
                                <Td>
                                    <a href={`mailto:${student.email}`}>{student.email}</a>
                                </Td>
                                <Td>{student.subject}</Td>
                                <Td>{student.availability}</Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </Box>
        </Box>
    );
};

export default TutorTable;
