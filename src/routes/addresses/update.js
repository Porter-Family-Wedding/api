import { Address } from 'src/models';

export default async (req, res) => {
  try {
    const { id } = req.params;

    const [, updatedAddress] = await Address.update(req.body, {
      where: {
        id,
      },
      returning: true,
    });

    res.send(updatedAddress);

  } catch (err) {
    console.error(err);

    res.send(500, 'Internal server error.');
  }
}