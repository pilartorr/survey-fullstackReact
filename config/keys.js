if (process.env.NODE_ENV === 'production') {
  module.exports = require('./prod');
  require('dotenv').config()
} else {
  module.exports = require('./dev');
}
