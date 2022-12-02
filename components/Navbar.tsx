import React from "react"
import Image from 'next/image'
import Link from 'next/link'
import { GoogleLogin, googleLogout } from "@react-oauth/google"
import { AiOutlineLogout } from "react-icons/ai"
import { IoMdAdd } from "react-icons/io"
import Logo from '../utils/tiktik-logo.png';
import { getUserFromToken } from "../utils"
import useAuthStore from "../store/authStore";
import { BiSearch } from "react-icons/bi"
import { useRouter } from "next/router"

function Navbar() {
    const router = useRouter()
    const [searchValue, setSearchValue] = React.useState("")

    const handleSearch = (e: { preventDefault: () => void }) => {
        e.preventDefault()
        if (searchValue) {
            router.push(`/search/${searchValue}`)
        }

    }


    const { userProfile }: { userProfile: any } = useAuthStore();
    const { addUser, removeUser } = useAuthStore()
    return (
        <div className='w-full flex justify-between items-center b-2 border-gray-200 py-1 px-4'>
            <Link href="/">
                <div className='w-[100px] md:w-[130px] '>
                    <Image className='cursor-pointer' src={Logo} alt="" layout='responsive' objectFit='contain' priority />
                </div>
            </Link>
            <div className="relative hidden md:block">
                <form className="absolute md:static top-10 -left-20 bg-white" onSubmit={handleSearch}>
                    <input type="text" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} placeholder="Search Videos and Accounts" className="bg-primary p-3 md:text-md font-medium border-2 border-gray-100 focus:outline-none focus:border-2 focus:border-gray-300 w-[300px] md:w-[350px] rounded-full md:top-0 " />
                    <button onClick={handleSearch} className="absolute md:right-5 right-6 top-4 border-l-2 border-gray-300 pl-4 text-2xl text-gray-400"><BiSearch /></button>
                </form>
            </div>

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
                    <GoogleLogin size="medium" shape="circle" text="signin"
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