import { Link } from "react-router-dom";

import {
    Box,
    Button,
    ButtonGroup,
    Container,
    Flex,
    HStack,
    useColorModeValue,
} from "@chakra-ui/react";
import * as React from "react";

const Nav = () => {
    return (
        <Box as="section" pb={{ base: "12", md: "6" }}>
            <Box
                as="nav"
                bg="bg-surface"
                boxShadow={useColorModeValue("sm", "sm-dark")}
            >
                <Container py={{ base: "4", lg: "5" }}>
                    <HStack spacing="10" justify="space-between">
                        <Flex justify="space-between">
                            <ButtonGroup variant="link" spacing="8">
                                {[
                                    "Doctors",
                                    "Records",
                                    "Public-Servants",
                                    "Diseases",
                                ].map((item) => (
                                    <Link to={item.toLocaleLowerCase()}>
                                        <Button key={item}>{item}</Button>
                                    </Link>
                                ))}
                            </ButtonGroup>
                        </Flex>
                    </HStack>
                </Container>
            </Box>
        </Box>
    );
};

export default Nav;
