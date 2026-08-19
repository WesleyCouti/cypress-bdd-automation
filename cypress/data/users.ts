export const users = {
  standard: {
    username: 'standard_user',
    password: 'secret_sauce'
  },

  locked: {
    username: 'locked_out_user',
    password: 'secret_sauce',
    errorMessage: 'Sorry, this user has been locked out'
  }
} as const;