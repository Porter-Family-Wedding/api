import { Person, Group } from 'src/models';

export default async (req, res) => {
  const { id } = req.auth;

  const person = await Person.findOne({
    where: {
      id,
    },
    attributes: ['id', 'auth0Id', 'firstName', 'lastName', 'phoneNumber', 'pending', 'attending', 'addressId', 'inviteId'],
    include: [
      {
        model: Group,
        attributes: ['id', 'enumeratedName', 'displayName'],
        through: {
          attributes: ['role']
        }
      }
    ]
  });

  res.send(person);
}