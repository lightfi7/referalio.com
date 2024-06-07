import axios from 'axios'

const client = axios.create({
  baseURL: process.env.HOST_API,
})

export async function doLogin(data) {
  return await client.post('/api/auth/signin/', { data })
}

export async function doRegister(data) {
  return await client.post('/api/auth/signup/', { data })
}

export async function setOffline(data) {
  return await client.post('/api/auth/setOffline', { data })
}

export async function getProgramInfo(data) {
  return await client.post('/api/getInfo/', { data })
}

export async function searchProgram(data) {
  return await client.post('/api/searchPro', { data })
}

export async function getMemberShipInfo(data) {
  return await client.post('/api/getMemberShipInfo', { data })
}

export async function getProgramByPage(data) {
  return await client.post('/api/getData', { data })
}

export async function getSearchData(data) {
  return await client.post('/api/getSearchData', { data })
}

export async function updatePremiumStatus(data) {
  return await client.post('/api/updatePremiumStatus', { data })
}
