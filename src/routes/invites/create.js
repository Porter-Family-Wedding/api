import { Invite, Address } from 'src/models';

export default async (req, res) => {
  try {
    const createdInvite = await Invite.create();

    const invite = await Invite.findOne({
      where: {
        id: createdInvite.id,
      },
      include: [Address]
    })

    res.send(invite);
  } catch (err) {
    console.error(err);

    res.send(err);
  }
}