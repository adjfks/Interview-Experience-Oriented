# 手写题

## JavaScript

### 1. 深拷贝

基础版本：只考虑对象数组和基本数据类型

```js
function deepClone(target) {
  if (typeof target === 'object') {
    let cloneResult = Array.isArray(target) ? [] : {}
    Reflect.ownKeys(target).forEach(key => {
      cloneResult[key] = deepClone(target[key])
    })
    return cloneResult
  } else {
    return target
  }
}
```

解决循环引用

```js
function deepClone(target , map = new WeakMap()) {
  if (typeof target === 'object') {
    let cloneResult = Array.isArray(target) ? [] : {}
    if (map.get(target)) return map.get(target)
    map.set(target , cloneResult)
    Reflect.ownKeys(target).forEach(key => {
      cloneResult[key] = deepClone(target[key] , map)
    })
    return cloneResult
  } else {
    return target
  }
}
```


