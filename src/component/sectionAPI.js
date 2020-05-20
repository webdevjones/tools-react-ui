import axios from 'axios'

console.log()
const baseUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:3001/api/section' :'/api/section'
// const baseUrl = 

const getSection = async (section, load) => {
    let result = await axios.get(`${baseUrl}/${section}`)
    return (result.data)
}

export default { getSection }