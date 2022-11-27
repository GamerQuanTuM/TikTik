import React, { useState } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { GoogleLogin, googleLogout, useGoogleLogin } from "@react-oauth/google"
import { AiFillHome, AiOutlineLogout, AiOutlineMenu } from 'react-icons/ai';
import { ImCancelCircle } from 'react-icons/im';
import Discover from './Discover';
import SuggestedAccount from './SuggestedAccount';
import Footer from './Footer';
import Image from 'next/image';
import jwt_decode from "jwt-decode"
import useAuthStore from '../store/authStore';
import axios from "axios"
import { createorGetUser } from '../utils';

function Sidebar() {
    const [showSideBar, setShowSideBar] = useState(true)
    const { userProfile, addUser } = useAuthStore()

    const login = useGoogleLogin({
        onSuccess: async codeResponse => {
            try {
                const { data } = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
                    headers: {
                        "Authorization": `Bearer ${codeResponse.access_token}`
                    }
                })

                const { name, picture, sub } = data

                createorGetUser({ name, picture, sub }, addUser)

            } catch (error) {
                console.log(error);

            }

        },
        onError(errorResponse) {
            console.log(errorResponse)
        },
    });


    const activeLink = 'flex items-center gap-3 hover:bg-primary p-3 justify-center xl:justify-start cursor-pointer font-semibold text-[#F51997] rounded';

    const normalLink = 'flex items-center gap-3 hover:bg-primary p-3 justify-center xl:justify-start cursor-pointer font-semibold rounded';


    return (
        <div>
            <div className='block xl:hidden m-2 ml-4 mt-3 text-xl' onClick={() => setShowSideBar((prev) => !prev)}>
                {showSideBar ? <ImCancelCircle /> : <AiOutlineMenu />}
            </div>
            {showSideBar && (
                <div className='xl:w-400 w-20 flex flex-col justify-start mb-10 border-r-2 border-gray-100 xl:border-0 p-3'>
                    <div className='xl:border-b-2 border-gray-200 xl:pb-4'>
                        <Link href="/">
                            <div className={activeLink}>
                                <p className='text-2xl'>
                                    <AiFillHome />
                                    <span className='text-xl hidden xl:block'>For You</span>
                                </p>
                            </div>
                        </Link>
                    </div>

                    <div>
                        {!userProfile &&
                            (
                                <button onClick={() => login()} className='bg-whie text-lg text-[#F51997] border-[1px] border-[#F51997] font-semibold px-6 py-3 rounded-md outline-none w-full mt-3 hover:text-white hover:bg-[#F51997] cursor-pointer' >
                                    Log In
                                </button>
                            )}
                    </div>

                    <Discover />
                    <SuggestedAccount />
                    <Footer />
                </div>
            )}
        </div>
    )
}

export default Sidebar