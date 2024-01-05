/* eslint-disable @next/next/no-async-client-component */
"use client"
import React from 'react';

export default async function Page(request) {
    const searchParams = request.searchParams
    const query = searchParams.query

    return (
        <ul>
            {/* {posts.map((post) => (
                <li key={post.id}>
                    <Link href={`/pages/${post.id}`}>{post.id}</Link>
                </li>
            ))} */}
        </ul>
    )
};