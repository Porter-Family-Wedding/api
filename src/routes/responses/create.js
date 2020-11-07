import { Response } from 'src/models';

export default async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      numberAttending,
      attending,
    } = req.body;

    if (!firstName || !lastName || attending == null) {
      res.send(422);
      return;
    }

    const response = await Response.create({
      firstName,
      lastName,
      numberAttending: numberAttending || 0,
      attending,
    });

    res.send(response);
  } catch (err) {
    console.error(err);

    res.send(err);
  }
}