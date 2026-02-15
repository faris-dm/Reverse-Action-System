// // data/refreshStore.js
// // In-memory store for refresh tokens
// const refreshTokens = [];

// const refreshStore = {
//   // Add a token to the store
//   push: (token) => {
//     refreshTokens.push(token);
//   },

//   // Check if token exists
//   includes: (token) => {
//     return refreshTokens.includes(token);
//   },

//   // Optional: remove a token (for logout)
//   remove: (token) => {
//     const index = refreshTokens.indexOf(token);
//     if (index !== -1) refreshTokens.splice(index, 1);
//   },

//   // Optional: get all tokens
//   getAll: () => [...refreshTokens],
// };

// module.exports = refreshStore;
