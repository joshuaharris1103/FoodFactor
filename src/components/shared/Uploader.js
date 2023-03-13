import axios from 'axios'
import React from 'react'
import { useDropzone } from 'react-dropzone'
import { useCallback, useState } from 'react'

const Uploader = () => {
    const [fileUpload, setFileUpload] = useState(null)


    const onDrop = useCallback((files) => {
            const formData = new FormData()
            formData.append('file', files[0])

            axios.post(`${process.env.UPLOAD_API}/create-recipe`, formData, {
                onUploadProgress: (p) => {
                    const percentCompleted = Math.round((p.loaded * 100) / p.total)
                    setFileUpload({
                        fileName: files[0].name,
                        percentCompleted
                    })
                    console.log(`${percentCompleted}% uploaded`)
                }
            })
        },
        [])
    
}
export default Uploader