"use client";
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Profile from '@components/Profile';

const ExternalProfile = ({ params }) => {

    const searchParams = useSearchParams();
    const username = searchParams.get('username');
    const id = params.id;
    const [posts, setPosts] = useState([]);
    const router = useRouter();

    useEffect(() => {
        const fetchPosts = async () => {
            const res = await fetch(`/api/users/${id}/posts`);
            const data = await res.json();
            console.log(data);
            setPosts(data);
        }
        fetchPosts();
    }, [])


    return (
        <Profile
            name={username}
            desc={`Welcome to ${username}'s profile`}
            data={posts}
        />
    )
}

export default ExternalProfile;