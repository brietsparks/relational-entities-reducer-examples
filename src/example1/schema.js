
export const modelSchema = {
  post: {
    many: ['comment']
  },
  comment: {
    one: ['post']
  }
};