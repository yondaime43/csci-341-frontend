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

const PublicServants = () => {
    const [doctors, setDoctors] = useState(null);
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [isPost, setIsPost] = useState(false);
    const [doctorEmail, setDoctorEmail] = useState(null);

    const getDoctors = async () => {
        const result = await axios.get(
            "https://csci-341-backend.herokuapp.com/public-servants"
        );
        if (result.status == 200) {
            setDoctors(result.data);
        }
    };

    const addDoctor = async (e) => {
        e.preventDefault();

        const userData = {
            email: e.target.email.value,
            department: e.target.department.value,
            name: e.target.name.value,
            surname: e.target.surname.value,
            salary: e.target.salary.value,
            phone: e.target.phone.value,
            cname: e.target.cname.value,
        };

        let result = null;

        if (isPost) {
            result = await axios.post(
                "https://csci-341-backend.herokuapp.com/public-servants",
                userData
            );
        } else {
            result = await axios.put(
                `https://csci-341-backend.herokuapp.com/public-servants/${doctorEmail}`,
                userData
            );
        }

        if (result.status == 200) {
            onClose();
        }
    };

    const deleteDoctor = async (email) => {
        const result = await axios.delete(
            `https://csci-341-backend.herokuapp.com/public-servants/${email}`
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
                    <ModalHeader>Add doctor</ModalHeader>
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
                <Heading>Public servants</Heading>

                <Button
                    colorScheme="blue"
                    size="md"
                    onClick={() => {
                        onOpen();
                        setIsPost(true);
                    }}
                >
                    Add public servant
                </Button>
            </Flex>

            <TableContainer>
                <Table variant="simple">
                    <Thead>
                        <Tr>
                            <Th>Email</Th>
                            <Th>Degree</Th>
                            <Th>Name</Th>
                            <Th>Surname</Th>
                            <Th>Salary</Th>
                            <Th>Phone</Th>
                            <Th>Country</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {doctors.map((el) => (
                            <Tr key={el.email}>
                                <Td>{el.email}</Td>
                                <Td>{el.degree}</Td>
                                <Td>{el.name}</Td>
                                <Td>{el.surname}</Td>
                                <Td>{el.salary}</Td>
                                <Td>{el.phone}</Td>
                                <Td>{el.cname}</Td>
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

export default PublicServants;
