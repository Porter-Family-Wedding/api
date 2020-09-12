import { Op } from 'sequelize';

export default function parseQuery(searchableFields = [], req) {

  const { page = 1, limit = 50, search, sort_by = 'createdAt:desc' } = req.query;

  const searchFields = {};

  if (search) {
    searchableFields.map((attribute) => {
      searchFields[attribute] = { [Op.iLike]: `%${search}%` };
    });
  }

  const order = sort_by.split(',').map((sort) => {
    const parts = sort.split(':');

    return [parts[0], parts[1].toUpperCase()];
  });

  const parsedQuery = {
    where: {},
    queryOptions: {
      order,
      limit: limit,
      offset: (page - 1) * limit,
    }
  };

  if (Object.keys(searchFields).length) {
    parsedQuery.where[Op.or] = { ...searchFields };
  }

  return parsedQuery;
} 