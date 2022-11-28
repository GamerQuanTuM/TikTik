import type { NextApiRequest, NextApiResponse } from 'next';
import { uuid } from 'uuidv4';
import { client } from '../../utils/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    switch (req.method) {
        case "PUT":
            const { userId, postId, like } = req.body

            const data = like > 0 ? await client.patch(postId).setIfMissing({ likes: [] }).insert('after', 'likes[-1]', [
                {
                    _ref: userId,
                    _type: "reference"
                }
            ]).commit({autoGenerateArrayKeys:true})
                :
                await client.patch(postId).unset([`likes[_ref == "${userId}"]`]).commit()
            res.status(200).json(data)
            break;

        default:
            res.send(500)
            res.end()
            break;
    }

}