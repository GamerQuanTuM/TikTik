import type { NextApiRequest, NextApiResponse } from 'next'
import { client } from "../../utils/client"

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    switch (req.method) {
        case "POST":
            const user = req.body;
            client.createIfNotExists(user).then(() => res.status(200).json('Login Success'))
            break;

        default:
            break;
    }

}
