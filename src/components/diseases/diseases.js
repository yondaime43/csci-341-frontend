import { useState, useEffect } from "react";
import axios from "axios";
import {
    TableContainer,
    Thead,
    Tr,
    Th,
    Table,
    Tbody,
    Td,
} from "@chakra-ui/react";

import { Button, Heading, Flex } from "@chakra-ui/react";

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from "@chakra-ui/react";

import { FormControl, FormLabel, Input } from "@chakra-ui/react";

import { useDisclosure } from "@chakra-ui/react";

import { inputs } from "./inputs";

const Diseases = () => {
    const [doctors, setDoctors] = useState(null);
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [isPost, setIsPost] = useState(false);
    const [doctorEmail, setDoctorEmail] = useState(null);

    const getDoctors = async () => {
        const result = await axios.get(
            "https://csci-341-backend.herokuapp.com/diseases"
        );
        if (result.status == 200) {
            setDoctors(result.data);
        }
    };

    const addDoctor = async (e) => {
        e.preventDefault();

        const userData = {
            disease_code: e.target.disease_code.value,
            id: e.target.id.value,
            pathogen: e.target.pathogen.value,
            description: e.target.description.value,
        };

        let result = null;

        if (isPost) {
            result = await axios.post(
                "https://csci-341-backend.herokuapp.com/diseases",
                userData
            );
        } else {
            result = await axios.put(
                `https://csci-341-backend.herokuapp.com/diseases/${doctorEmail}`,
                userData
            );
        }

        if (result.status == 200) {
            onClose();
        }
    };

    const deleteDoctor = async (email) => {
        const result = await axios.delete(
            `https://csci-341-backend.herokuapp.com/diseases/${email}`
        );
        if (result.status == 200) {
        }
    };

    useEffect(() => {
        getDoctors();
    }, []);

    if (!doctors) return <div className="">Loading</div>;

    console.log(doctors);

    return (
        <div>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Diseases</ModalHeader>
                    <ModalCloseButton />

                    <ModalBody>
                        <form onSubmit={addDoctor}>
                            <FormControl isRequired={isPost}>
                                {inputs.map((el) => (
                                    <>
                                        <FormLabel>{el.placeholder}</FormLabel>
                                        <Input
                                            placeholder={el.placeholder}
                                            mb={3}
                                            name={el.name}
                                            type={el.type}
                                        />
                                    </>
                                ))}
                                <Button
                                    colorScheme="blue"
                                    w="100%"
                                    type="submit"
                                >
                                    {isPost
                                        ? "Add public servant"
                                        : "Update public servant"}
                                </Button>
                            </FormControl>
                        </form>
                    </ModalBody>
                </ModalContent>
            </Modal>

            <Flex alignItems="center" justifyContent="space-evenly" mb={4}>
                <Heading>Diseases</Heading>

                <Button
                    colorScheme="blue"
                    size="md"
                    onClick={() => {
                        onOpen();
                        setIsPost(true);
                    }}
                >
                    Add diseases
                </Button>
            </Flex>

            <TableContainer>
                <Table variant="simple">
                    <Thead>
                        <Tr>
                            <Th>id</Th>
                            <Th>Disease code</Th>
                            <Th>Pathogen</Th>
                            <Th>Description</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {doctors.map((el) => (
                            <Tr key={el["disease_code"]}>
                                <Td>{el.id}</Td>
                                <Td>{el["disease_code"]}</Td>
                                <Td>{el.pathogen}</Td>
                                <Td>{el.description}</Td>
                                <Td>
                                    <form>
                                        <Button
                                            colorScheme="blue"
                                            size="md"
                                            mr={3}
                                            onClick={() => {
                                                onOpen();
                                                setIsPost(false);
                                                setDoctorEmail(el.email);
                                            }}
                                        >
                                            Update
                                        </Button>
                                        <Button
                                            colorScheme="red"
                                            size="md"
                                            onClick={() =>
                                                deleteDoctor(el.email)
                                            }
                                        >
                                            Delete
                                        </Button>
                                    </form>
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default Diseases;
