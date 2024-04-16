import React from 'react';
import { Box, Flex, useBreakpointValue } from '@chakra-ui/react';
import backgroundImage from '../assets/404NotFound.png';

// Displays Page Not found
const NotFoundPage: React.FC = () => {
    const bgSize = useBreakpointValue({ base: '100% 100%', sm: 'cover' });

    return (
        <Flex
            direction="column"
            align="center"
            justify="center"
            w="full"
            h="100vh"
            position="relative"
        >
            {/* Background Image */}
            <Box
                w="full"
                h="full"
                bgImage={`url(${backgroundImage})`}
                bgSize={bgSize}
                bgPos="center"
                bgRepeat="no-repeat"
                position="absolute"
                _after={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0,
                }}
            ></Box>
        </Flex>
    );
};
export default NotFoundPage;
