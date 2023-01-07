const baseURL = "https://api.dev.pastorsline.com/api/contacts.json?companyId=171";
const header = {
    'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjU2MCwiZXhwIjoxNjc2NDM5MjI0LCJ0eXBlIjoiYWNjZXNzIiwidGltZXN0YW1wIjoxNjYwODg3MjI0fQ.X6EnuvO5j5n9WLNrQUyJ9M4ABtDQpfsrjfWnts3GmPs'
}
export const configAllContacts = {
    method: 'get',
    url: baseURL,
    headers: header
}
export const configUSContacts = {
    method: 'get',
    url: baseURL + "&countryId=226",
    headers: header
}
export const searchConfig = {
    method: 'get',
    url: baseURL,
    headers: header
}
