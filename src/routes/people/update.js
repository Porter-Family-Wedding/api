import { Person } from 'src/models';

export default async (req, res) => {
  try {
    const { id } = req.params;

    const [, updatedPerson] = await Person.update(req.body, {
      where: {
        id,
      },
      returning: true,
    });

    res.send(updatedPerson);

  } catch (err) {
    console.error(err);

    res.send(500, 'Internal server error.');
  }
}