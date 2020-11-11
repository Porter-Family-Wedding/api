import db from 'src/config/db';

export default async (req, res, next) => {
  const [[count]] = await db.query(`
    select sum(size_of_party) as total
    from invites
    where invites.status = 'Accepted';
  `);

  res.send(count);

  next();
}