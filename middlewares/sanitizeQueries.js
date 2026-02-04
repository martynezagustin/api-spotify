const sanitize = require('mongo-sanitize');

/*esto previene inyecciones NoSQL*/
function mongoSanitize(req, res, next) {
  req.body = sanitize(req.body);
  req.query = sanitize(req.query);
  req.params = sanitize(req.params);
  next();
}

module.exports = mongoSanitize;
