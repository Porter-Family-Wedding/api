import { Person } from 'src/models';

export default async (req, res) => {
  try {
    const { inviteId } = req.body;
    const createdPerson = await Person.create({ inviteId });

    const person = await Person.findOne({
      where: {
        id: createdPerson.id,
      },
    });

    res.send(person);
  } catch (err) {
    console.error(err);

    res.send(err);
  }
}