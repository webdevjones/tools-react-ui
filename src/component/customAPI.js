import axios from 'axios'

const baseUrl = '/api/custom'
// const baseUrl = 'http://localhost:3001/api/custom'

const getCustom = async (url) => {
    try {
        let result = await axios.get(`${baseUrl}/${url}`)
        return (result.data)
    }
    catch (err) {
        return 0        
    }
}

export default { getCustom }