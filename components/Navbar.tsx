import React from "react"
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { GoogleLogin, googleLogout } from "@react-oauth/google"
import { AiOutlineLogout } from "react-icons/ai"
import { BiSearch } from "react-icons/bi"
import { IoMdAdd } from "react-icons/io"
import Logo from '../utils/tiktik-logo.png';
import { getUserFromToken, User } from "../utils"
import useAuthStore from "../store/authStore";

function Navbar() {
    const { userProfile }: { userProfile: any } = useAuthStore();
    const { addUser, removeUser } = useAuthStore()
    return (
        <div className='w-full flex justify-between items-center b-2 border-gray-200 py-1 px-4'>
            <Link href="/">
                <div className='w-[100px] md:w-[130px] '>
                    <Image className='cursor-pointer' src={Logo} alt="" layout='responsive' objectFit='contain' priority />
                </div>
            </Link>
            <div>SEARCH</div>
            <div>
                {userProfile ? (
                    <div className="flex gap-5 md:gap-10">
                        <Link href='/upload'>
                            <button className="border-2 px-2 md:px-4 text-md font-semibold flex items-center gap-2 bg-red-700 rounded-md text-white">
                                <IoMdAdd className="text-xl" />{` `}
                                <span className="hidden md:block font-medium">UPLOAD</span>
                            </button>
                        </Link>
                        {userProfile?.image && (
                            <Link href='/'>
                                <>
                                    <Image width={40} height={40} className='rounded-full cursor-pointer' alt='' src={userProfile?.image} />
                                </>
                            </Link>
                        )}
                        <button type="button" className="px-2 rounded-full bg-gray-200" onClick={() => {
                            googleLogout();
                            removeUser();
                        }}>
                            <AiOutlineLogout color="black" fontSize={21} />
                        </button>
                    </div>
                ) : (
                    <GoogleLogin  size="medium" shape="circle" text="signin"
                        onSuccess={(response) => {
                            getUserFromToken(response, addUser);
                        }}
                        onError={() => console.log('Error')} />
                )}
            </div>
        </div>
    )
}

export default Navbar