/**
 * @typedef {Object} User
 * @property {number} id
 * @property {string} name
 * @property {boolean} isAdmin
 */

/**
 * @param {User} user
 */
function printUser(user) {
  console.log(user.name)
}

printUser({
  id: 1,
  name: "Ratul",
  isAdmin: true,
})
