import axios from 'axios'

const client = axios.create({
  baseURL: process.env.HOST_API
})

export async function doLogin(data) {
  return await client.post('/admin/api/auth/doLogin', { data })
}

export async function getUserData() {
  return await client.post('/admin/api/getUser', {})
}

export async function updateUserData(data) {
  return await client.post('/admin/api/updateUserData', { data })
}

export async function getProgramList(data) {
  return await client.post('/admin/api/getList', { data })
}

export async function getPromotedList(data) {
  return await client.post('/admin/api/getPromotedList', { data })
}

export async function doSchedule(data) {
  return await client.post('/admin/api/doSchedule', { data })
}

export async function addUser(data) {
  return await client.post('/admin/api/addUser', { data })
}

export async function deleteUser(data) {
  return await client.post('/admin/api/deleteUser', { data })
}

export async function blockUser(data) {
  return await client.post('/admin/api/blockUser', { data })
}

export async function setFreeNumber(data) {
  return await client.post('/admin/api/setFreeNumber', { data })
}

export async function setPrice(data) {
  return await client.post('/admin/api/setPrice', { data })
}

export async function setSecretKey(data) {
  return await client.post('/admin/api/setScretkey', { data })
}

export async function changePassword(data) {
  return await client.post('/admin/api/changePassword', { data })
}
export async function getDashBoardInfo() {
  return await client.post('/admin/api/getDashBoardInfo')
}

export async function getMemberShipPlan(data) {
  return await client.post('/admin/api/getMemberShipPlan', { data })
}

export async function setScrapeSetting(data) {
  return await client.post('/admin/api/setScrapeSetting', { data })
}
