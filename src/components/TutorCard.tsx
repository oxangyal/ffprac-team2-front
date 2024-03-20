import {
    Avatar,
    Box,
    Button,
    ButtonGroup,
    Card,
    CardBody,
    Flex,
    Grid,
    Heading,
    Image,
    Stack,
    Text,
    useBreakpointValue,
} from '@chakra-ui/react';

import { CalendarIcon } from '@chakra-ui/icons';
import React from 'react';
import { Tutor } from '../models/interfaces';
import iconEducation from '../assets/experience.png';
import iconExperience from '../assets/education.png';
import { theme } from '../util/theme';

// import iconCalendar from '../assets/calendar.png';
// import { EmailIcon } from '@chakra-ui/icons';
// import { IconButton } from '@chakra-ui/react'

const customAvatarStyle = {
    width: '90px',
    height: '90px',
};

export interface TutorCardProps {
    tutor: Tutor;
}

const TutorCard: React.FC<TutorCardProps> = ({ tutor }) => {
    // const TutorCard: React.FC = ({tutor: }) => {
    const getButtonColor = (day: string) => {
        return tutor.availability.includes(day) ? 'green.400' : 'red.500';
    };
    return (
        <Box mt="30px" w="100%">
            {/* <Box borderWidth='0px' borderRadius='md' boxShadow='md' ml='70'> */}
            <Card maxW={{ base: '90%', md: '500px' }} bg={theme.colors.customWhite}>
                <Flex justify="flex-end" mb="4" mt="20px">
                    <ButtonGroup
                        gap={{ base: '10px', md: '20px' }}
                        display={{ base: 'grid', md: 'flex' }}
                        gridTemplateColumns={{ base: '1fr', md: 'auto auto' }}
                    >
                        {/* <IconButton
                            variant="outline"
                            h="35px"
                            colorScheme="teal"
                            aria-label="Send email"
                            icon={<EmailIcon />}
                        /> */}
                        <Button
                            variant="solid"
                            bg={theme.dashboardButtons.buttonYellow.bg}
                            mt={{ base: '10px', md: '0', sm: '10px' }}
                            mx={{ base: '10px', md: '0', sm: '10px' }}
                            px={{ base: '30px', md: '20px', sm: '10px' }}
                            size={useBreakpointValue({ base: 'sm', md: 'md', lg: 'lg' })}
                            height={theme.dashboardButtons.height}
                            fontSize={theme.dashboardButtons.fontSize}
                            fontWeight={theme.dashboardButtons.fontWeight}
                        >
                            Send email
                        </Button>
                        <Button
                            variant="solid"
                            bg={theme.dashboardButtons.buttonTeal.bg}
                            mt={{ base: '15px', md: '0' }}
                            mx={{ base: '30px', md: '20px', sm: '10px' }}
                            size={useBreakpointValue({ base: 'sm', md: 'md', lg: 'lg' })}
                            height={theme.dashboardButtons.height}
                            fontSize={theme.dashboardButtons.fontSize}
                            fontWeight={theme.dashboardButtons.fontWeight}
                        >
                            Connect with me
                        </Button>
                    </ButtonGroup>
                </Flex>
                <CardBody>
                    <Stack spacing="2" textAlign="center">
                        <Heading size="xs">{`${tutor.userId.firstName} ${tutor.userId.lastName}`}</Heading>
                        <Avatar
                            borderRadius="full"
                            boxSize="100px"
                            mx="auto"
                            style={customAvatarStyle}
                        />
                    </Stack>
                    <Text mt="4" w="100%" fontSize={theme.dashboardButtons.fontSize}>
                        {tutor.about}
                    </Text>
                    {/* <CardBody> */}
                    {/* <Stack spacing="2" textAlign="center">
                        <Heading size="xs">Patrick Hill</Heading>
                        <Avatar
                            // src='../assets/patrick.jpg'
                            borderRadius="full"
                            boxSize="100px"
                            mx="auto"
                            style={customAvatarStyle}
                        />
                    </Stack> */}
                    {/* <Text mt="4" w="100%" fontSize={theme.dashboardButtons.fontSize}>
                        Lorem ipsum dolor sit amet,consectetur adipiscing elit, sed do eiusmod
                        tempor incididunnim ad minim veniam, quis nost quip ex ea commodo consequat
                    </Text> */}
                    {/* </CardBody> */}
                    <CardBody>
                        <Stack spacing="2" align="flex-start">
                            <Stack spacing="2" align="flex-start">
                                <Flex justify="flex-start">
                                    <Image
                                        src={iconExperience}
                                        alt="Experience"
                                        w="20px"
                                        h="20px"
                                        mr="5"
                                    />
                                    <Text fontSize={theme.styles.global.body.fontSize}>
                                        {tutor.education}
                                    </Text>
                                </Flex>
                                <Flex align="start">
                                    <Image
                                        src={iconEducation}
                                        alt="Education"
                                        w="20px"
                                        h="20px"
                                        mr="5"
                                    />
                                    <Text fontSize={theme.styles.global.body.fontSize}>
                                        {tutor.yearsOfExperience} years of teaching
                                    </Text>
                                </Flex>
                                <Text
                                    fontWeight={theme.dashboardButtons.fontWeight}
                                    fontSize={theme.styles.global.body.fontSize}
                                >
                                    Subjects
                                </Text>

                                <Text>{tutor.MathSubject.join(', ')}</Text>
                                <Text>{tutor.ForeignLanguages.join(', ')}</Text>
                                <Text>{tutor.Science.join(', ')}</Text>
                                <Text>{tutor.English.join(', ')}</Text>
                                <Text>{tutor.SocialStudies.join(', ')}</Text>
                                <Text
                                    fontWeight={theme.dashboardButtons.fontWeight}
                                    fontSize={theme.styles.global.body.fontSize}
                                >
                                    Grades
                                </Text>
                                <Text>{tutor.grades.join(', ')}</Text>
                            </Stack>
                            <Stack spacing="4" align="flex-start">
                                <Flex align="start">
                                    <CalendarIcon w="15px" h="15px" />
                                </Flex>
                                <Grid
                                    templateColumns={{
                                        base: 'repeat(2, 1fr)',
                                        sm: 'repeat(4, 1fr)',
                                        md: 'repeat(7, 1fr)',
                                    }}
                                    gap={1}
                                    justifyItems="center"
                                >
                                    {[
                                        'Monday',
                                        'Tuesday',
                                        'Wednesday',
                                        'Thursday',
                                        'Friday',
                                        'Saturday',
                                        'Sunday',
                                    ].map((day, index) => (
                                        <Button
                                            key={index}
                                            variant="solid"
                                            bg={getButtonColor(day)}
                                            m="0"
                                            w="50%"
                                            _hover={{ bg: getButtonColor(day) }}
                                        >
                                            <Text
                                                color="white"
                                                fontSize={theme.styles.global.body.fontSize}
                                            >
                                                {day.slice(0, 3)}
                                            </Text>
                                        </Button>
                                    ))}
                                </Grid>
                            </Stack>
                        </Stack>
                    </CardBody>
                </CardBody>
            </Card>
        </Box>
    );
};

export default TutorCard;
