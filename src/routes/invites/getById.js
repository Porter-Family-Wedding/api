import { Invite, Address, Person } from 'src/models'

export default async (req, res) => {
  try {
    const { id } = req.params;

    const invite = await Invite.findOne({
      where: {
        id,
      },
      include: [
        {
          model: Address
        },
        {
          model: Person,
        },
      ],
    });

    res.send(invite);
  } catch (err) {
    console.error(err);
    
    res.send(500, 'Internal server error.');
  }
}