import axios from 'axios';
import jwt_decode from "jwt-decode"

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export type User = {
    name: string,
    picture: string,
    sub: string,
}

//Creating a new user or getting a user from database
export const createorGetUser = async ({ name, picture, sub }: User, addUser: any) => {
    const url = `http://localhost:3000/api/auth`
    const user = {
        _id: sub,
        _type: 'user',
        username: name,
        image: picture,
    }

    addUser(user)
    await axios.post(url, user)
}
//Decoding User From JWT Token
export const getUserFromToken = async (response: any, addUser: any) => {
    const decoded: User = await jwt_decode(response.credential)
    const { name, picture, sub } = decoded
    createorGetUser({ name, picture, sub }, addUser)

};