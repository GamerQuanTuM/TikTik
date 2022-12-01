import axios from 'axios'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { GoVerified } from 'react-icons/go'
import NoResults from '../../components/NoResults'
import VideoCard from '../../components/VideoCard'
import { BASE_URL } from '../../utils'
import { IUser, Video } from "../../types"

type Props = {
  data: {
    user: IUser,
    userLikedVideos: Video[],
    userVideos: Video[]
  }
}

function Profile({ data }: Props) {

  const { user, userVideos, userLikedVideos } = data

  const [showUserVideos, setShowUserVideos] = useState<Boolean>(true);
  const [videosList, setVideosList] = useState<Video[]>([]);

  const videos = showUserVideos ? 'border-b-2 border-black' : 'text-gray-400';
  const liked = !showUserVideos ? 'border-b-2 border-black' : 'text-gray-400';

  useEffect(() => {
    if (showUserVideos) {
      setVideosList(userVideos)
    } else {
      setVideosList(userLikedVideos)
    }
  }, [showUserVideos, userLikedVideos, userVideos])

  

  return (
    <div className='w-full'>
      <div className='flex gap-6 md:gap-10 mb-4 bg-white w-full'>
        <div className='w-16 h-8 md:w-16 md:h-16'>
          <Image src={user.image} width={120} height={120} className="rounded-full" alt="user profile" layout='responsive' />
        </div>

        <div className='flex flex-col items-center justify-center'>
          <p className='md:text-2xl tracking-wider  flex justify-center gap-10 items-center text-md font-bold text-primary lowercase'>
            {user.username.replaceAll(" ", "")}
            <GoVerified className='text-blue-400' />
          </p>
          <p className='pr-16 capitalize md:text-xl text-gray-400 text-xs'>{user.username}</p>
        </div>

      </div>
      <div>
        <div className='flex gap-10 mb-10 mt-10 border-b-2 border-gray-200 w-full bg-white'>

          <p className={`text-xl font-semibold cursor-pointer mt-2 ${videos}`} onClick={() => setShowUserVideos(true)}>Videos</p>
          <p className={`text-xl font-semibold cursor-pointer mt-2 ${liked}`} onClick={() => setShowUserVideos(false)}>Liked</p>

        </div>
        <div className='flex gap-6 flex-wrap md:justify-start'>
          {videosList.length > 0 ? (
            videosList.map((video: Video, idx: number) => (
              <VideoCard post={video} key={idx} />
            ))
          ) : <NoResults text={`No ${showUserVideos ? "" : "Liked"} Videos Yet`} />}
        </div>
      </div>
    </div>
  )
}

export async function getServerSideProps({
  params: { id }
}: { params: { id: string } }) {
  const { data } = await axios.get(`${BASE_URL}/api/profile/${id}`)
  return {
    props: {
      data
    }
  }
}

export default Profile