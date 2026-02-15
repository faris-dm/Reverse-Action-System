// // data/userStore.js
// // In-memory store for users (email -> user object)
// const users = new Map();

// const userStore = {
//   // Find user by email (case-insensitive, but emails are stored as provided)
//   findByEmail: (email) => {
//     // Since we store with email as key, we can directly get
//     return users.get(email);
//   },

//   // Create a new user
//   create: (user) => {
//     users.set(user.email, user);
//     return user;
//   },

//   // Optional: get all users (useful for debugging)
//   getAll: () => Array.from(users.values()),
// };

// module.exports = userStore;
