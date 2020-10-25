import { Invite } from 'src/models';

export default async (req, res) => {
  try {
    const { id } = req.params;

    const [, updatedInvite] = await Invite.update(req.body, {
      where: {
        id,
      },
      returning: true,
    });

    res.send(updatedInvite);

  } catch (err) {
    console.error(err);

    res.send(500, 'Internal server error.');
  }
}