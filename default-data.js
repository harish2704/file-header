
module.exports = {
  user: process.env.USER,
  email: process.env.USER + '@' + process.env.HOST,
  date: new Date(),
};
