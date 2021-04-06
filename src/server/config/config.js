const path = require('path')

module.exports = {
  port: process.env.PORT || 8000,
  db: {
    database: process.env.DB_NAME || 'chatdabase',
    user: process.env.DB_USER || 'chat',
    password: process.env.DB_PASS || 'chat@database369',
    options: {
      // timezone : "Asia/Kolkata",
      dialect: process.env.DIALECT || 'sqlite',
      host: process.env.HOST || 'localhost',
      storage: path.resolve(__dirname, '../database/chatdatabase.sqlite')
    }
  },
  authentication: {
    jwtSecret: process.env.JWT_SECRET || 'skbvif7erjhzxloir0345f5fas'
  },
  timezone: process.env.TIMEZONE || 'Asia/Kolkata'
}
