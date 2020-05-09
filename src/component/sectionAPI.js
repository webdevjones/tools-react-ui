import axios from 'axios'

const baseUrl = '/api/section'
// const baseUrl = 'http://localhost:3001/api/section'

const getSection = async (section, load) => {
    // load(true)
    let result = await axios.get(`${baseUrl}/${section}`)
    return (result.data)
}

export default { getSection }