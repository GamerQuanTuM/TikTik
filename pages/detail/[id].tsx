import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useState, useEffect, useRef } from 'react'
import Link from "next/link";
import { GoVerified } from "react-icons/go"
import { MdOutlineCancel } from "react-icons/md"
import { BsFillPlayFill } from 'react-icons/bs';
import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi';
import axios from "axios"
import { BASE_URL } from '../../utils';
import { Video } from '../../types';
import useAuthStore from "../../store/authStore"
import LikeButton from '../../components/LikeButton';
import Comments from '../../components/Comments';

type Props = {
  postDetails: Video
}

export default function Details({ postDetails }: Props) {


  const [post, setPost] = useState(postDetails);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isVideoMuted, setIsVideoMuted] = useState<boolean>(false);
  const [isPostingComment, setIsPostingComment] = useState<boolean>(false);
  const [comment, setComment] = useState<string>('');

  const videoRef = useRef<HTMLVideoElement>(null);
  const router = useRouter();

  const { userProfile }: any = useAuthStore();

  const onVideoClick = () => {
    if (isPlaying) {
      videoRef?.current?.pause();
      setIsPlaying(false);
    } else {
      videoRef?.current?.play();
      setIsPlaying(true);
    }
  };


  useEffect(() => {
    if (post && videoRef?.current) {
      videoRef.current.muted = isVideoMuted;
    }
  }, [post, isVideoMuted]);

  const handleLike = async (like: boolean) => {
    if (userProfile) {
      const res = await axios.put(`${BASE_URL}/api/like`, {
        userId: userProfile._id,
        postId: post._id,
        like
      });
      setPost({ ...post, likes: res.data.likes });
    }
  };

  const addComment = async (e: React.FormEvent<Element>) => {
    e.preventDefault();
    if (userProfile && comment) {
      setIsPostingComment(true)
      const { data } = await axios.put(`${BASE_URL}/api/post/${post._id}`, {
        userId: userProfile._id,
        comment
      });
      setPost({ ...post, comments: data.comments })
      setComment("");
      setIsPostingComment(false)
    }
  }


  return (
    <div className='flex w-full overflow-hidden  absolute left-0 top-0 bg-white flex-wrap lg:flex-nowrap'>
      <div className='relative flex-2 w-[1000px] lg:w-9/12 flex justify-center items-center bg-black'>
        <div className="absolute top-6 left-2 lg:left-6 flex gap-6 z-50 ">
          <p className='cursor-pointer' onClick={() => router.back()}>
            <MdOutlineCancel className='text-white text-[35px]' />
          </p>
        </div>
        <div className='relative'>
          <div className="lg:h-[100vh] h-[60vh]">
            <video src={post.video.asset.url} className='h-full cursor-pointer' ref={videoRef} loop onClick={onVideoClick} >

            </video>
          </div>
          <div className='absolute top-[45%] left-[45%] cursor-pointer'>
            {!isPlaying && (
              <button>
                <BsFillPlayFill onClick={onVideoClick} className='text-white text-6xl lg:text-8xl' />
              </button>
            )}
          </div>
        </div>

        <div className='absolute bottom-5 lg:bottom-10 right-5 lg:right-10 cursor-pointer'>
          {isVideoMuted ? <button>
            <HiVolumeOff onClick={() => setIsVideoMuted(false)} className='text-white text-2xl lg:text-4xl' />
          </button> : <button>
            <HiVolumeUp onClick={() => setIsVideoMuted(true)} className='text-white text-2xl lg:text-4xl' /></button>}
        </div>
      </div>

      <div className='relative w-[1000px] md:w-[900px] lg:w-[700px] '>
        <div className="lg:mt-20 mt-10">

          <div className="flex gap-3 p-2 cursor-pointer font-semibold rounded">
            <div className="ml-4 md:w-20 md:h-20 w-16 h-16">
              <Link href="/">
                <>
                  <Image width={62} height={62} className='rounded-full' alt='' src={post.postedBy.image} layout='responsive' />
                </>
              </Link>
            </div>
            <div className="flex items-center gap-2">
              <Link href="/">
                <div className="flex flex-col gap-2">
                  <p className='flex gap-2 md:text-md font-bold text-primary'>{post.postedBy.username} {" "}
                    <GoVerified className='text-blue-400 text-md' />
                  </p>
                  <p className='capitalize font-medium text-xs text-gray-500 md:block'>{post.postedBy.username}</p>
                </div>
              </Link>
            </div>
          </div>
          <p className='px-10 text-lg text-gray-800 font-semibold'>{post.caption}</p>
          <div className="mt-10 px-10">
            {userProfile && (
              <LikeButton handleLike={() => handleLike(true)} handleDislike={() => handleLike(false)} likes={post.likes} />
            )}
          </div>
          <Comments comment={comment} setComment={setComment} addComment={addComment}
            comments={post.comments}
            isPostingComment={isPostingComment} />
        </div>
      </div>
    </div>
  )
}


export const getServerSideProps = async (
  { params: { id } }: { params: { id: string } }
) => {
  const { data } = await axios.get(`${BASE_URL}/api/post/${id}`)

  return {
    props: {
      postDetails: data
    }
  }
}

