export default (permission, context) =>
  async (req, res, next) => {
    const { permissions } = req?.auth;
  
    if (!permissions) {
      console.error('requiresPermission called without a preceding auth middleware');
      res.send(500, 'Internal server error');
    }

    

    const [model, action] = permission.split('.');

    if (permissions[model].includes('*')) {
      return next();
    }

    if (permissions[model].includes(action)) {
      // TODO: Handle permissions in context here
      return next();
    }

    res.send(401, 'The users permissions failed to satisfy the requirements.');
    return next(false);
  }