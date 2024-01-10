'use client';

import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
  useToast,
} from '@chakra-ui/react';
import { FaPlus } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';


export default function Home() {
  const [data, setData] = useState();
  const toast = useToast();

  async function handleDelete(id) {
  
    try {
      await axios.delete(
        `https://testcasefe2023.ignorelist.com/api/v1/data/${id}`,
        {
          headers: { nim: 1234 },
        }
      );
      toast({
        title: 'Berhasil menghapus buku',
        description: `Berhasil menghapus buku dengan id ${id}`,
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    async function fetchData() {
      const res = await axios.get(
        'https://testcasefe2023.ignorelist.com/api/v1/data',
        {
          headers: { nim: 1234 },
        }
      );
      const data = await res.data;
      setData(data);
    }
    fetchData();
  }, [data]);

  if (!data) {
    return (
      <p className="text-center text-4xl font-bold my-[50vh]">Loading...</p>
    );
  }
  return (
    <>
      <div className="mx-16 my-8 flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl font-bold">Daftar Buku</h1>
          <hr />
          <h6>Jumlah buku tersedia : {data.data.length}</h6>
          <div>
            <Link href="/add-buku">
              <Button leftIcon={<FaPlus />} colorScheme="teal" variant="solid">
                Tambah Buku
              </Button>
            </Link>
          </div>
        </div>
        <div className="rounded-lg border-black border">
          <TableContainer>
            <h1 className="text-2xl my-4 mx-4 font-semibold">Data Buku</h1>
            <Table>
              <Thead>
                <Tr>
                  <Th>Judul</Th>
                  <Th>Deskripsi</Th>
                  <Th>Harga</Th>
                  <Th>Pemilik</Th>
                  <Th>Aksi</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data.data.map((d) => (
                  <Tr key={d.id}>
                    <Td>{d.title}</Td>
                    <Td>{d.description}</Td>
                    <Td>{d.price}</Td>
                    <Td>{d.author}</Td>
                    <Td className="flex flex-row gap-2">
                      <Link href={`/detail-buku/${d.id}`}>
                        <Button colorScheme="blue" variant="solid">
                          Detail Buku
                        </Button>
                      </Link>
                      <Link href={`/edit-buku/${d.id}`}>
                        <Button colorScheme="green" variant="solid">
                          Ubah
                        </Button>
                      </Link>
                      <Button
                        type="submit"
                        onClick={() => {
                          handleDelete(d.id);
                        }}
                        colorScheme="red"
                        variant="solid"
                      >
                        Hapus
                      </Button>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </>
  );
}
