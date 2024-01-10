'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

import axios from 'axios';

import Link from 'next/link';
import {
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  Container,
  useToast,
} from '@chakra-ui/react';

export default function EditBuku() {
  const { id } = useParams();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState();
  const [author, setAuthor] = useState('');

  const router = useRouter();
  const toast = useToast();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.put(
        `https://testcasefe2023.ignorelist.com/api/v1/data/${id}`,
        { title, description, price, author },
        {
          headers: { nim: 1234 },
        }
      );
      toast({
        title: 'Berhasil mengubah buku',
        description: `Berhasil mengubah buku dengan id ${id}`,
        status: 'info',
        duration: 9000,
        isClosable: true,
      });
    } catch (e) {
      console.log(e);
    } finally {
      router.push('/');
    }
  };

  useEffect(() => {
    async function fetchData() {
      const res = await axios.get(
        `https://testcasefe2023.ignorelist.com/api/v1/data/${id}`,
        {
          headers: { nim: 1234 },
        }
      );
      const data = await res.data.data;
      setData(data);
      setTitle(data.title);
      setDescription(data.description);
      setPrice(data.price);
      setAuthor(data.author);
      setLoading(true);
    }
    fetchData();
  }, []);

  return (
    <>
      {!loading ? (
        <p className="text-center text-4xl font-bold my-[50vh]">Loading...</p>
      ) : (
        <>
          <div className="text-black h-[100vh]">
            <Container className="text-center">
              <h1 className="font-bold text-2xl pt-8">Edit Books</h1>
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-8">
                  <FormControl>
                    <FormLabel htmlFor="title">Title :</FormLabel>
                    <Input
                      id="title"
                      placeholder="Add your title here..."
                      borderColor="blue"
                      focusBorderColor="black"
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel htmlFor="description">Description : </FormLabel>
                    <Textarea
                      id="description"
                      placeholder="Add your description here..."
                      borderColor="blue"
                      focusBorderColor="black"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel htmlFor="price">Price : </FormLabel>
                    <Input
                      id="price"
                      placeholder="Add your price here..."
                      borderColor="blue"
                      focusBorderColor="black"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel htmlFor="author">Author : </FormLabel>
                    <Input
                      id="author"
                      placeholder="Add your author here..."
                      borderColor="blue"
                      focusBorderColor="black"
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                    />
                  </FormControl>
                  <Button type="submit" colorScheme="blue">
                    Edit
                  </Button>
                  <Link href="/">
                    <Button colorScheme="green">Back to all books</Button>
                  </Link>
                </div>
              </form>
            </Container>
          </div>
        </>
      )}
    </>
  );
}
