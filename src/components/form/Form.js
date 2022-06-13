import React, { useEffect, useState } from 'react'
import Dropzone from 'react-dropzone'

import io from 'socket.io-client';

import { useSelector, useDispatch } from 'react-redux'

import { Button, Form } from 'semantic-ui-react'

import StatusComponent from '../status/Status'
import ImageUpload from './ImageUpload';
import { setImageUpload, setImageUrl, setIsDataFilled, setisEditClicked, setStateChanger } from '../../reducers/reducers';

const AddEditForm = () => {
    const socket = io(`http://localhost:5000`);

    const { images, isImageUploaded, isEditClicked, editReportId, editReportName, editReportTitle, editReportDetails, isDataFilled } = useSelector((state) => state.reportData);
    const dispatch = useDispatch();

    const [name, setname] = useState('');
    const [reportTitle, setreportTitle] = useState('');
    const [reportDetails, setreportDetails] = useState('');
    // const [images, setImages] = useState(null)

    const [nameError, setnameError] = useState(false);
    const [reportTitleError, setreportTitleError] = useState(false);
    const [reportDetailsError, setreportDetailsError] = useState(false);

    const submitHandler = async (e) => {
        e.preventDefault();

        setnameError(false)
        setreportTitleError(false)
        setreportDetailsError(false)

        if (!name) setnameError(true);
        if (!reportTitle) setreportTitleError(true);
        if (!reportDetails) setreportDetailsError(true);

        if (!isEditClicked) {
            if (name && reportDetails && reportTitle) {

                console.log(name, reportDetails, reportTitle, images)

                const data = JSON.stringify({ name, reportDetails, reportTitle, images: images })

                try {
                    socket.emit("report data", data);

                    setname("");
                    setreportTitle("");
                    setreportDetails("");

                    dispatch(setImageUpload(false))
                    dispatch(setImageUrl(null))

                    dispatch(setStateChanger());
                } catch (error) {
                    console.log(error)
                }
            }
        } else {
            if (name && reportDetails && reportTitle) {

                let _id = editReportId;

                console.log(_id, name, reportDetails, reportTitle);

                const data = JSON.stringify({ _id, name, reportDetails, reportTitle })


                try {
                    socket.emit("edit report data", data);

                    dispatch(setIsDataFilled(false));
                    dispatch(setisEditClicked(false));

                    dispatch(setStateChanger());
                } catch (error) {
                    console.log(error)
                }
            }
        }
    }

    if (isEditClicked && !isDataFilled) {
        setname(editReportName);
        setreportDetails(editReportDetails);
        setreportTitle(editReportTitle)
        console.log(editReportId, "test2")

        dispatch(setIsDataFilled(true));
    }

    return (
        <div>

            <div style={{ width: "100vw" }}>
                <div style={{ display: "flex", justifyContent: "space-evenly" }}>
                    {isEditClicked
                        ?
                        null
                        :
                        isImageUploaded
                            ?
                            null
                            :
                            <div>
                                <ImageUpload />
                            </div>
                    }
                </div>
                {isEditClicked || isImageUploaded
                    ?
                    <Form onSubmit={submitHandler}>
                        <div style={{ display: "flex", justifyContent: "space-evenly" }}>
                            <Form.Input
                                error={nameError ? 'Please enter your name' : null}
                                fluid
                                label='Name'
                                placeholder='Name'
                                id='form-input-name'
                                value={name}
                                onChange={(e) => setname(e.target.value)}
                                width={"5"}
                            />
                            <Form.Input
                                error={reportTitleError ? 'Please enter the report title' : null}
                                fluid
                                label='Report title'
                                placeholder='Report title'
                                onChange={(e) => setreportTitle(e.target.value)}
                                value={reportTitle}
                                width={"8"}
                            />
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-evenly" }}>
                            <Form.Input
                                error={reportDetailsError ? 'Please enter the report details' : null}
                                fluid
                                label='Report details'
                                placeholder='Report details'
                                onChange={(e) => setreportDetails(e.target.value)}
                                value={reportDetails}
                                width={"14"}
                            />
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-evenly", margin: "20px 6%" }}>
                            <Button type='submit' width={"14"}>Submit</Button>
                        </div>
                    </Form>
                    :
                    null
                }

            </div>
        </div>
    )
}

export default AddEditForm;