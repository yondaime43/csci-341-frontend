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

const Records = () => {
    const [doctors, setDoctors] = useState(null);
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [isPost, setIsPost] = useState(false);
    const [doctorEmail, setDoctorEmail] = useState(null);

    const getDoctors = async () => {
        const result = await axios.get(
            "https://csci-341-backend.herokuapp.com/records"
        );
        if (result.status == 200) {
            setDoctors(result.data);
        }
    };

    const addDoctor = async (e) => {
        e.preventDefault();

        const userData = {
            email: e.target.email.value,
            cname: e.target.cname.value,
            disease_code: e.target.disease_code.value,
            total_deaths: e.target.total_deaths.value,
            total_patients: e.target.total_patients.value,
        };

        let result = null;

        if (isPost) {
            result = await axios.post(
                "https://csci-341-backend.herokuapp.com/records",
                userData
            );
        } else {
            result = await axios.put(
                `https://csci-341-backend.herokuapp.com/records/${doctorEmail}`,
                userData
            );
        }

        if (result.status === 200) {
            onClose();
        }
    };

    const deleteDoctor = async (email) => {
        const result = await axios.delete(
            `https://csci-341-backend.herokuapp.com/records/${email}`
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
                    <ModalHeader>Add records</ModalHeader>
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
                                    {isPost ? "Add records" : "Update records"}
                                </Button>
                            </FormControl>
                        </form>
                    </ModalBody>
                </ModalContent>
            </Modal>

            <Flex alignItems="center" justifyContent="space-evenly" mb={4}>
                <Heading>Records</Heading>

                <Button
                    colorScheme="blue"
                    size="md"
                    onClick={() => {
                        onOpen();
                        setIsPost(true);
                    }}
                >
                    Add records
                </Button>
            </Flex>

            <TableContainer>
                <Table variant="simple">
                    <Thead>
                        <Tr>
                            <Th>Email</Th>
                            <Th>Country</Th>
                            <Th>Disease code</Th>
                            <Th>Total deaths</Th>
                            <Th>Total patients</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {doctors.map((el) => (
                            <Tr key={el.email}>
                                <Td>{el.email}</Td>
                                <Td>{el.cname}</Td>
                                <Td>{el["disease_code"]}</Td>
                                <Td>{el["total_deaths"]}</Td>
                                <Td>{el["total_patients"]}</Td>
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

export default Records;
