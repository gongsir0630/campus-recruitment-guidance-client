export function wxLogin () {
  return uni.login()
}

export function getUserProfile () {
  return uni.getUserProfile({
    desc: '用于完善柚子帮用户资料'
  })
}

export function getUserInfo () {
  // 改造方法直接返回默认匿名信息,不走网络
  return new Promise((resolve) => {
    resolve([
      '',
      {
        userInfo: {
          nickName: '微信用户',
          gender: 0,
          avatarUrl:
            'https://thirdwx.qlogo.cn/mmopen/vi_32/POgEwh4mIHO4nibH0KlMECNjjGxQUq24ZEaGT4poC6icRiccVGKSyXwibcPq4BWmiaIGuG1icwxaQX6grC9VemZoJ8rg/132'
        }
      }
    ])
  })
}