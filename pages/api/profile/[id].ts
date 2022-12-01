import type { NextApiRequest, NextApiResponse } from 'next'
import { client } from "../../../utils/client"
import { singleUserQuery, userCreatedPostsQuery, userLikedPostsQuery } from '../../../utils/queries';


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    switch (req.method) {
        case "GET":
            const { id } = req.query
            const query = singleUserQuery(id)
            const userVideoQuery = userCreatedPostsQuery(id)
            const userLikedVideoQuery = userLikedPostsQuery(id)

            const user = await client.fetch(query);

            const userVideos = await client.fetch(userVideoQuery)

            const userLikedVideos = await client.fetch(userLikedVideoQuery)

            res.status(200).json({
                user: user[0], userVideos, userLikedVideos
            })
            break;

        default:
            break;
    }

}
