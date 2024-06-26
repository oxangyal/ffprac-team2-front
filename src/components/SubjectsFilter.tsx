import { Box, Button, Checkbox, CheckboxGroup, FormControl, Icon } from '@chakra-ui/react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import React, { useState } from 'react';

interface SubjectData {
    [key: string]: string[];
}

interface SelectedSubjects {
    [key: string]: (number | string)[];
}

interface ShowCheckboxes {
    [key: string]: boolean;
}

interface SubjectsFilterProps {
    onSelectSubjects: (subjects: string[]) => void;
}

const subjectsData: SubjectData = {
    Math: [
        'Math',
        'Algebra',
        'Geometry',
        'Trigonometry',
        'Calculus',
        'Statistics',
        'Pre-Calculus',
        'SAT Math Test Prep',
        'ACT Math Test Prep',
    ],
    English: [
        'Writing',
        'Reading',
        'ESL',
        'Poetry',
        'Literacy',
        'ACT English Test Prep',
        'ACT Reading Test Prep',
        'ACT Writing Test Prep',
    ],
    Science: [
        'Biology',
        'Chemistry',
        'Earth Science',
        'Physics',
        'Science',
        'ACT Science Test Prep',
    ],
    ForeignLanguages: ['Spanish', 'French', 'Chinese', 'German', 'Latin'],
    SocialStudies: [
        'World History',
        'Psychology',
        'US Government',
        'Social Science',
        'US History',
        'Political Science',
        'Geography',
        'European History',
    ],
};

const SubjectsFilter: React.FC<SubjectsFilterProps> = ({ onSelectSubjects }) => {
    const [selectedSubjects, setSelectedSubjects] = useState<SelectedSubjects>({});
    const [showCheckboxes, setShowCheckboxes] = useState<ShowCheckboxes>({
        Math: false,
        English: false,
        Science: false,
        ForeignLanguages: false,
        SocialStudies: false,
    });
    const [showAllSubjects, setShowAllSubjects] = useState<boolean>(false);

    const toggleSubject = (subject: string) => {
        setShowCheckboxes((prevState) => ({
            ...prevState,
            [subject]: !prevState[subject] || showAllSubjects,
        }));
        setSelectedSubjects((prevState) => {
            const newState: SelectedSubjects = { ...prevState };
            newState[subject] = typeof prevState[subject] === 'number' ? prevState[subject] : [];
            return newState;
        });
        if (!showAllSubjects) {
            setShowAllSubjects(true);
        }
    };

    const toggleAllSubjects = () => {
        setShowAllSubjects((prevState) => {
            if (prevState && Object.values(showCheckboxes).some((value) => value)) {
                Object.keys(showCheckboxes).forEach((group) => {
                    setShowCheckboxes((prevState) => ({
                        ...prevState,
                        [group]: false,
                    }));
                });
            }
            return !prevState;
        });
    };

    const handleSubjectsChange = (subjects: SelectedSubjects) => {
        setSelectedSubjects(subjects);

        const allSelectedSubjects = Object.values(subjects)
            .reduce(
                (acc, value) => acc.concat(Array.isArray(value) ? value : []),
                [] as (string | number)[]
            )
            .filter((value): value is string => typeof value === 'string');

        onSelectSubjects(allSelectedSubjects);
    };

    return (
        <Box p="1px" bg="white" w="170px" shadow="10px" borderRadius="md">
            <FormControl w="100px" mt="10px" mb="10px" ml="10px">
                <Button
                    onClick={toggleAllSubjects}
                    w="150px"
                    fontSize="14px"
                    h="30px"
                    fontWeight="700"
                    rightIcon={
                        showAllSubjects ? <Icon as={FiChevronUp} /> : <Icon as={FiChevronDown} />
                    }
                >
                    Subjects
                </Button>
            </FormControl>
            {showAllSubjects &&
                Object.entries(subjectsData).map(([group, options]) => (
                    <FormControl key={group} w="100px" mt="10px" mb="10px" ml="10px">
                        <Button
                            onClick={() => toggleSubject(group)}
                            w="150px"
                            fontSize="12px"
                            h="20px"
                            justifyContent="flex-start"
                        >
                            {group.replace(/([A-Z])/g, ' $1').trim()}
                        </Button>
                        {showCheckboxes[group] && (
                            <CheckboxGroup
                                onChange={(values) =>
                                    handleSubjectsChange({ ...selectedSubjects, [group]: values })
                                }
                            >
                                {options.map((subject) => (
                                    <Checkbox key={subject} value={subject}>
                                        {subject}
                                    </Checkbox>
                                ))}
                            </CheckboxGroup>
                        )}
                    </FormControl>
                ))}
        </Box>
    );
};

export default SubjectsFilter;
