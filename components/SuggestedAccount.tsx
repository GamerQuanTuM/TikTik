import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { GoVerified } from 'react-icons/go'
import useAuthStore from '../store/authStore'

import { IUser } from "../types"


function SuggestedAccount() {
  const { fetchAllUsers, allUsers } = useAuthStore()

  React.useEffect(() => {
    fetchAllUsers()
  }, [fetchAllUsers])

  console.log(allUsers);


  return (
    <div className='xl:border-b-2 border-gray-200 pb-4'>
      <p className='text-gray-500 font-semibold m-3 mt-4 hidden xl:block'>Suggested Accounts</p>
      <div>
        {allUsers?.slice(0, 6).map((user: IUser) => (
          <Link key={user._id} href={`/profile/${user._id}`}>
            <div className='flex gap-3 hover:bg-primary p-2 cursor-pointer font-semibold rounded'>
              <div className='flex items-start gap-3'>
                <div className='w-8 h-8'>
                  <Image src={user.image} width={34} height={34} className="rounded-full" alt="user profile" layout='responsive' />
                </div>

                <div className='hidden xl:block'>
                  <p className='flex gap-10 items-center text-md font-bold text-primary lowercase'>
                    {user.username.replaceAll(" ", "")}
                    <GoVerified className='text-blue-400' />
                  </p>
                  <p className='capitalize text-gray-400 text-xs'>{user.username}</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div >
  )
}

export default SuggestedAccount