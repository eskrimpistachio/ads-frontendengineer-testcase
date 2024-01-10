'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';

import axios from 'axios';

import Link from 'next/link';
import { Button } from '@chakra-ui/react';

export default function DetailBuku() {
  const { id } = useParams();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

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
      setLoading(true);
    }
    fetchData();
  }, [data]);


  return (
    <>
      {!loading ? (
        <p className="text-center text-4xl font-bold my-[50vh]">Loading...</p>
      ) : (
        <div key={data.id} className="py-8 mx-16 flex flex-col gap-8">
          <h1 className="text-2xl font-bold">{data.title}</h1>
          <div className="flex flex-col gap-4">
            <p>Deskripsi : {data.description}</p>
            <p>Price : {data.price}</p>
            <p>Created by : {data.author}</p>
          </div>
          <div className="flex flex-row gap-4">
            <Link href="/">
              <Button colorScheme="green">Back to all books</Button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
