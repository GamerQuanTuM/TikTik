import { NextPage } from 'next'
import React from 'react'
import { BiCommentX } from 'react-icons/bi'
import { MdOutlineVideocamOff } from 'react-icons/md'


type Props = {
  text: string
}

const NoResults: NextPage<Props> = ({ text }: Props) => {
  return (
    <div className='flex flex-col justify-center items-center h-full w-full'>
      <p className='text-8xl'>
        {text !== 'No comments yet!'
          ? <MdOutlineVideocamOff />
          : <BiCommentX />}
      </p>
      <p className='text-2xl text-center'>{text}</p>
    </div>
  )
}

export default NoResults