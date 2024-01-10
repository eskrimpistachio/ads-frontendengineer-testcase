'use client';

import { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  Container,
  useToast,
} from '@chakra-ui/react';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import axios from 'axios';

export default function AddBuku() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState();
  const [author, setAuthor] = useState('');

  const router = useRouter();
  const toast = useToast();

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post(
        'https://testcasefe2023.ignorelist.com/api/v1/data',
        { title, description, price, author },
        {
          headers: { nim: 1234 },
        }
      );
      toast({
        title: 'Berhasil menambah buku',
        description: `Berhasil menambahkan buku 🤩`,
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
      router.push('/');
    } catch (e) {
      console.log(e);
    }

    setTitle('');
    setDescription('');
    setPrice();
    setAuthor('');
  };

  return (
    <>
      <div className="text-black h-[100vh]">
        <Container className="text-center">
          <h1 className="font-bold text-2xl pt-8">Add Books</h1>
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
                  onChange={handleTitleChange}
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
                  onChange={handleDescriptionChange}
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
                  onChange={handlePriceChange}
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
                  onChange={handleAuthorChange}
                />
              </FormControl>
              <Button type="submit" colorScheme="blue">
                Submit
              </Button>
              <Link href="/">
                <Button colorScheme="green">Back to all books</Button>
              </Link>
            </div>
          </form>
        </Container>
      </div>
    </>
  );
}
