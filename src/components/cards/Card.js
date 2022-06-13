import React, { useEffect, useState } from 'react'
import { Button, Card, Image } from 'semantic-ui-react'

import io from 'socket.io-client';

import { useDispatch, useSelector } from 'react-redux';
import {  setEditReportDetails, setEditReportId, setEditReportName, setEditReportTitle, setIsDataFilled, setisEditClicked, setIsReportPage, setReport, setStateChanger } from '../../reducers/reducers';

const CardGroups = () => {
    const socket = io(`https://socket-report-backend.herokuapp.com`);

    const { reports, stateChanger } = useSelector((state) => state.reportData);
    const dispatch = useDispatch();

    const editReport = async (_id, title, name, details) => {
        console.log(_id, title, name, details, 'edit');

        dispatch(setisEditClicked(true));
        dispatch(setIsDataFilled(false));
        // dispatch(setIsReportPage(false));

        dispatch(setEditReportId(_id));
        dispatch(setEditReportName(name));
        dispatch(setEditReportTitle(title));
        dispatch(setEditReportDetails(details));

        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera

    }

    const deleteReport = async (_id) => {
        console.log(_id, 'delete')

        try {
            await socket.emit("delete report", _id);
            dispatch(setStateChanger());            
        } catch (error) {
            console.log(error)
        }

    }

    const cardsRenderData = reports.map(item => {
        const { _id, title, name, details, images } = item;
        let image;
        if (images) {
            image = images[0];
        }
        return (
            <Card key={_id}>
                <Card.Content>
                    <Image
                        floated='right'
                        size='medium'
                        src={`https://socket-report-backend.herokuapp.com/${image}`}
                    />
                    <Card.Header>{title}</Card.Header>
                    <Card.Meta>- by {name}</Card.Meta>
                    <Card.Description>
                        {details}
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <div className='ui two buttons'>
                        <Button basic color='green' onClick={() => editReport(_id, title, name, details)}>
                            Edit
                        </Button>
                        <Button basic color='red' onClick={() => deleteReport(_id)}>
                            Delete
                        </Button>
                    </div>
                </Card.Content>
            </Card>
        )
    });

    useEffect(() => {
        socket.emit("getAllReports", "fire", (response) => {
            console.log(response);
            dispatch(setReport(response))
        });
    }, [stateChanger]);

    return (
        <Card.Group style={{display:"flex", justifyContent:"center", alignItem:"center"}}>

            {reports ? cardsRenderData : null}

        </Card.Group>
    )
}

export default CardGroups


