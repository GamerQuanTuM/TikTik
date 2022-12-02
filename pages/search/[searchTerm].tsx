import axios from 'axios'
import Image from 'next/image'
import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { GoVerified } from 'react-icons/go'

import NoResults from '../../components/NoResults'
import VideoCard from '../../components/VideoCard'
import { BASE_URL } from '../../utils'
import { IUser, Video } from "../../types"
import useAuthStore from '../../store/authStore'


const Search = ({ videos }: { videos: Video[] }) => {

    const router = useRouter();
    const { searchTerm }: any = router.query
    const { allUsers } = useAuthStore()

    const [isAccounts, setIsAccounts] = useState(false)

    const accounts = isAccounts ? 'border-b-2 border-black' : 'text-gray-400';
    const isVideos = !isAccounts ? 'border-b-2 border-black' : 'text-gray-400';

    const searchAccounts = allUsers.filter((user: IUser) => user.username.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <div className='w-full'>
            <div className='flex gap-10 mb-10 mt-10 border-b-2 border-gray-200 w-full bg-white'>

                <p className={`text-xl font-semibold cursor-pointer mt-2 ${accounts}`} onClick={() => setIsAccounts(true)}>Accounts</p>
                <p className={`text-xl font-semibold cursor-pointer mt-2 ${isVideos}`} onClick={() => setIsAccounts(false)}>Videos</p>

            </div>
            {isAccounts ? (
                <div className='md:mt-16'>
                    {searchAccounts.length > 0 ? (
                        searchAccounts.map((user: IUser, idx: number) => (
                            <Link href={`/profile/${user._id}`} key={idx}>
                                <div className='flex p-2 cursor-pointer font-semibold rounded border-b-2 border-gray-200 gap-3'>
                                    <div>
                                        <Image
                                            width={50}
                                            height={50}
                                            className='rounded-full cursor-pointer'
                                            src={user.image}
                                            alt='user-profile'
                                        />
                                    </div>

                                    <p className='flex cursor-pointer gap-1 items-center text-[18px] font-bold leading-6 text-primary'>
                                        {user.username}{' '}
                                        <GoVerified className='text-blue-400' />
                                    </p>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <NoResults text={`No Video Results for ${searchAccounts}`} />
                    )}
                </div>
            ) : (
                <div className='md:mt-16 flex flex-wrap gap-6 md:justify-start'>
                    {videos?.length ? (
                        videos.map((video: Video, idx: number) => (
                            <VideoCard post={video} key={idx} />
                        ))
                    ) : <NoResults text={`No Video Results for ${searchTerm}`} />}
                </div>
            )}
        </div>
    )
}

export async function getServerSideProps({
    params: { searchTerm }
}: { params: { searchTerm: string } }) {
    const { data } = await axios.get(`${BASE_URL}/api/search/${searchTerm}`)
    return {
        props: {
            videos: data
        }
    }
}

export default Search
