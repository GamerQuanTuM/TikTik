import React, { useEffect, useRef, useState } from 'react';
import { NextPage } from "next"
import Image from 'next/image';
import Link from 'next/link';
import { Video } from '../types';
import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi';
import { BsFillPlayFill, BsFillPauseFill } from 'react-icons/bs';
import { GoVerified } from 'react-icons/go';
import { BsPlay } from 'react-icons/bs';


type VideoProps = {
    post: Video
}

const VideoCard: NextPage<VideoProps> = ({ post }: VideoProps) => {
    

    const [playing, setPlaying] = useState(false);
    const [isHover, setIsHover] = useState(false);
    const [isVideoMuted, setIsVideoMuted] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null)

    const onVideoPress = () => {
        if (playing) {
            videoRef?.current?.pause()
            setPlaying(false)
        } else {
            videoRef?.current?.play();
            setPlaying(true)
        }
    }

    useEffect(() => {
        if (videoRef?.current) {
          videoRef.current.muted = isVideoMuted;
        }
      }, [isVideoMuted]);


    return (
        <div className='flex flex-col border-b-2 border-gray-200 pb-6'>
            <div className="">
                <div className="flex gap-3 p-2 cursor-pointer font-semibold rounded">
                    <div className="md:w-16 md:h-16 w-10 h-10">
                        <Link href="/">
                            <>
                                <Image width={62} height={62} className='rounded-full' alt='' src={post.postedBy.image} layout='responsive' />
                            </>
                        </Link>
                    </div>
                    <div className="flex items-center gap-2">
                        <Link href="/">
                            <div className="">
                                <p className='flex gap-2 items-center md:text-md font-bold text-primary'>{post.postedBy.username} {" "}
                                    <GoVerified className='text-blue-400 text-md' />
                                </p>
                                <p className='capitalize font-medium text-xs text-gray-500 hidden md:block'>{post.postedBy.username}</p>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="lg:ml-20 flex gap-4 relative w-full">
                <div onMouseEnter={() => setIsHover(true)}
                    onMouseLeave={() => setIsHover(false)} className="rounded-3xl">
                    <Link href={`/detail/${post._id}`}>
                        <video src={post.video.asset.url} loop ref={videoRef} className='lg:w-[600px] h-[300px] md:h-[400px] lg:h-[528px] w-[200px] rounded-2xl cursor-pointer bg-gray-100'>

                        </video>
                    </Link>
                    {isHover && (
                        <div className='absolute bottom-6 cursor-pointer left-8 md:left-14 lg:left-0 flex gap-10 lg:justify-between w-[100px] md:w-[50px] p-3'>
                            {playing ? <button>
                                <BsFillPauseFill onClick ={onVideoPress}className='text-black text-2xl lg:text-4xl' />
                            </button> : <button>
                                <BsFillPlayFill 
                                onClick ={onVideoPress}className='text-black text-2xl lg:text-4xl' /></button>}
                            {isVideoMuted ? <button>
                                <HiVolumeOff onClick ={()=>setIsVideoMuted(false)}className='text-black text-2xl lg:text-4xl' />
                            </button> : <button>
                                <HiVolumeUp onClick ={()=>setIsVideoMuted(true)}className='text-black text-2xl lg:text-4xl' /></button>}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default VideoCard