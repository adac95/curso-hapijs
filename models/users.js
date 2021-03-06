'user strict'

const bcrypt = require('bcrypt');

class Users {
  constructor(db) {
    this.db = db
    this.ref = this.db.ref('/')
    this.collection = this.ref.child('users')
  }

  async create(data) {
    // user = { ...data }
    data.password = await this.constructor.encrypt(data.password)
    console.log(data);
    const newUser = this.collection.push()
    newUser.set(data)

    return newUser.key
  }
  static async encrypt(passwd) {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(passwd, saltRounds);
    console.log(hashedPassword);
    return hashedPassword
  }
}


module.exports = Users;