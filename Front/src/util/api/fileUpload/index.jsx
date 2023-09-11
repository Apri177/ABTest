import axios from 'axios'


export const registFile = async (selectedFiles) => {
    const formData = new FormData()

    for (let i = 0; i < selectedFiles.length; i++) {
        formData.append('file', selectedFiles[i])
    }

    formData.append('type', 'itemQna')

    const res = await axios.post('/upload',{
        'Content-Type' : 'multipart/form-data',
    })
    return res
}