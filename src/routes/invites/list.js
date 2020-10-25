import { Invite, Address } from 'src/models';

import parseQuery from 'src/helpers/parseQuery';

export default async (req, res) => {
  try {
    const { where, queryOptions } = parseQuery(['$address.to$'], req);

    const { count, rows } = await Invite.findAndCountAll({
      where,
      ...queryOptions,
      include: [
        {
          model: Address,
          duplicating: false,
          as: 'address'
        },
      ],
    });

    res.send({ count, data: rows });
  } catch (err) {
    console.error(err);

    res.send(500, 'Internal server erorr.');
  }
}