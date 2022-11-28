import type { NextApiRequest, NextApiResponse } from 'next'
import { client } from '../../../utils/client';
import { allPostsQuery, postDetailQuery } from '../../../utils/queries';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    switch (req.method) {
        case "GET":
            const { id } = req.query;
            const query = postDetailQuery(id)
            const data = await client.fetch(query)
            res.status(200).json(data[0])
            break;

        default:
            break;
    }
}
