import axios from 'axios'

const baseUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:3001/api/custom' :'/api/custom'


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