const getters = {
  token: state => state.user.token,
  user: state => state.user.user,
  avatar: state => state.user.avatar,
  nickname: state => state.user.name,
  // apiUrl: state => {
  //   if (state.app.apiUrl) {
  //     return state.app.apiUrl
  //   }
  //   return `${window.location.protocol}//${window.location.host}`
  // }
};

export default getters
