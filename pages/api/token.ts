import { NextApiRequest, NextApiResponse } from 'next';
import { serialize } from 'cookie';

export default (req: NextApiRequest, res: NextApiResponse) => {
    const { body } = req;
    const { token } = body || {};
    res.setHeader('Set-Cookie', serialize('token', token, { path: '/' }));
    res.status(200).send({ token });
};
