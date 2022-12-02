import type { NextApiRequest, NextApiResponse } from 'next'
import { client } from "../../../utils/client"
import { topicPostsQuery } from '../../../utils/queries';


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    switch (req.method) {
        case "GET":
            const { topic } = req.query
            const videoQuery = topicPostsQuery(topic)
            const videos = await client.fetch(videoQuery)
            res.status(200).json(videos)
            break;

        default:
            break;
    }

}
