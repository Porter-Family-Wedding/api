import axios from 'axios';
import jwt from 'jsonwebtoken';

import { Person, Group } from 'src/models';

export default async (req, res) => {
  try {
    const { email, password } = req.body;

    const { AUTH0_DOMAIN, AUTH0_CLIENT_ID, AUTH0_SECRET, JWT_SECRET } = process.env;

    const options = {
      method: 'POST',
      url: `https://${AUTH0_DOMAIN}/oauth/token`,
      headers: { 'content-type': 'application/json' },
      responseType: 'json',
      data: {
        client_id: AUTH0_CLIENT_ID,
        client_secret: AUTH0_SECRET,
        grant_type: 'password',
        username: email,
        password,
      },
    };

    const resp = await axios(options);

    // We only need auth0 to identify the user and to tell us if the username/password is correct, we will
    // be signing our own tokens so we can include system permissions
    const { sub: auth0Id } = JSON.parse(Buffer.from(resp.data.id_token.split('.')[1], 'base64').toString());

    const person = await Person.findOne({
      where: {
        auth0Id,
      },
      include: [
        {
          model: Group,
        }
      ]
    });

    // These are all of the possible system permissions
    const permissions = {
      groups: [],
      people: [],
      addresses: [],
      invites: [],
      messages: [],
      group_memberships: [],
    };

    person.groups.forEach((group) => {
      Object.keys(group.permissions).forEach((permission) => {
        // Ignore any permissions that isn't specified in our system wide permissions
        if (permissions[permission]) {
          permissions[permission] = [...permissions[permission], ...group.permissions[permission]];
        }
      })
    });

    const payload = {
      id: person.id,
      auth0Id: person.auth0Id,
      permissions,
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '4h' });

    res.send({ token });
  } catch (err) {
    if (err?.response?.status >= 400) {
      const { data, status } = err.response;
      if (data?.error) {
        return res.send(status, data.error_description);
      }
    }

    console.error(err);

    res.send(500, 'Internal server error');
  }
};