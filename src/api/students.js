import request from '@/utils/request'

export function all(){
  return request({
    url:`/students`,
    method:'get'
  })
}

export function deleteById(id){
  return request({
    url:`/students/${id}`,
    method:'delete'
  })
}

export function update(id,dto){
  return request({
    url:`/students/${id}`,
    method:'put',
    data:dto
  })
}

export function insert(dto){
  return request({
    url:`/students`,
    method:'post',
    data:dto
  })
}
