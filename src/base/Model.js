class Model {
  constructor(options) {
    // 下面代码的简化版
    const keys = ['data', 'update', 'create', 'delete', 'get']
    keys.forEach((key) => {
      if (key in options) {
        this[key] = options[key]
      }
    })
    // this.data = options.data
    // this.update = options.update
  }
  create() {
    // ?.可选链
    // console?.error?.('你还没有实现 create')
    console && console.error && console.error('你还没有实现 create')
  }
  delete() {
    console && console.error && console.error('你还没有实现 delete')
  }
  update() {
    console && console.error && console.error('你还没有实现 update')
  }
  get() {
    console && console.error && console.error('你还没有实现 get')
  }
}

export default Model
