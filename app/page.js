/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import dynamic from "next/dynamic";
import React, { Suspense, useEffect, useState } from "react";
import Loading from "./loading";
import { useRouter } from "next/navigation";

// const Title = React.lazy(() => import("./title"));

const Card = dynamic(() => import("./card"), {
  suspense: true,
  ssr: true,
  loading: () => <Loading />
});

export default function Home(request) {
  const [page, setPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(2);
  const [limit, setLimit] = useState(10);
  const [posts, setPosts] = useState([]);
  const [isEmpty, setIsEmpty] = useState(false);
  const [once, setOnce] = useState(true);
  const [search, setSearch] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const router = useRouter();
  const url = "https://js-post-api.herokuapp.com/api/posts";

  const getData = async () => {
    setIsFetching(true);
    const res = await fetch(url + `?_page=${page}&_limit=${limit}${search ? `&q=${encodeURIComponent(search)}` : ''}`);
    const data = await res.json();
    if (page === Math.ceil(data.pagination._totalRows / data.pagination._limit)) {
      setIsEmpty(true)
    };
    setPosts(prevPosts => [...prevPosts, ...data.data]);
    setIsFetching(false);
  };

  if (once) {
    setPage(2);
    getData();
    setOnce(false);
  };

  useEffect(() => {
    const onScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;
      const scrollPosition = window.scrollY + clientHeight;
      if (scrollPosition >= (9 / 10) * scrollHeight && !isEmpty) {
        setCurrentPage(prevPage => prevPage + 1);
      }
    };
    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    if (posts.length === 0) {
      setIsEmpty(false);
    };
    const timeout = setTimeout(() => {
      if (currentPage > page && !isEmpty) {
        setPage(page + 1);
        getData();
        // router.push(`/?page=${page}&limit=${limit}${search ? `&q=${encodeURIComponent(search)}` : ''}`, { scroll: false });
      }
    }, 500);
    return () => clearTimeout(timeout);
  }, [currentPage, search]);

  const handleInput = (e) => {
    setSearch(e.target.value);
    setPosts([]);
    setPage(1);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setPosts([]);
    setPage(1);
  };

  return (
    <main className="flex flex-col items-center sm:p-4 lg:p-24 min-h-screen">
      {/* {!isFetching &&
        <> */}
      <div className="text-blue-500 text-center font-bold text-5xl">List Post</div>
      <form role="search" onSubmit={handleSearch}>
        <input className="my-10 block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 font-medium"
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => handleInput(e)}
        />
      </form>
      {/* </>
      } */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 flex-grow">
        {posts.map((cardData, index) => <Card {...cardData} key={cardData.id + index} />)}
      </div>
      {isEmpty &&
        <div className="flex flex-col items-center justify-center mt-12">
          <p className="text-center text-red-500 font-bold text-xl">No More Data</p>
        </div>}
    </main >
  )
};