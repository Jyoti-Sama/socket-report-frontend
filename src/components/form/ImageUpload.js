import axios from 'axios';
import React, { useState } from 'react'
import Dropzone from 'react-dropzone'
import { useDispatch } from 'react-redux'
import { setImageUpload, setImageUrl } from '../../reducers/reducers';

function ImageUpload() {
    const dispatch = useDispatch();

    const [images, setImages] = useState(null);
    const [uploadPercentage, setUploadPercentage] = useState(0)

    const imageUploadHandler = async () => {

        if (images) {
            var formData = new FormData();

            images.map((file, index) => {
                formData.append("images", file);
            });
            console.log(formData);

            try {
                const response = await axios.post('http://localhost:5000/report/image', formData, {
                    headers: {
                        origin: 'http://localhost:3000'
                    },
                    onUploadProgress: (data) => {
                        let progresPercent = Math.floor((data.loaded / data.total) * 100);
                        // console.log(data.loaded, data.total, progresPercent);
                        setUploadPercentage(progresPercent); //set the state for upload progress bar
                    }
                });
                
                if(response.data) {
                    const {images} = response.data;
                    console.log(images)
                    dispatch(setImageUrl(images));
                    dispatch(setImageUpload(true));
                }
            } catch (error) {
                console.log(error)
            }
        }
    }

    console.log(uploadPercentage)

    return (
        <div>
            <Dropzone onDrop={acceptedFiles => setImages(acceptedFiles)}>
                {({ getRootProps, getInputProps }) => (
                    <section>
                        <div {...getRootProps()}>
                            <input {...getInputProps()} />
                            <p style={{ curser: "pointer" }}>Select Image</p>
                        </div>
                    </section>
                )}
            </Dropzone>
            <button onClick={imageUploadHandler}>upload</button>
        </div>
    )
}

export default ImageUpload;