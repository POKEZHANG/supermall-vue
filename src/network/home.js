import {request} from './request'

export function getHomeMultidatachild() {
  return request({
    url: 'home/multidata'
  })
}

export function getHomeGoodschild(type, page) {
  return request({
    url: '/home/data',
    params: {
      type,
      page
    }
  })
}