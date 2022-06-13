import { createSlice } from '@reduxjs/toolkit'


export const ReportDataSlice = createSlice({
    name: "reportData",

    initialState: {
        stateChanger: 10,
        isReportPage: true,
        reports: [],
        images: [],
        isImageUploaded: false,
        isEditClicked: false,
        editReportId: "",
        editReportName: '',
        editReportTitle: '',
        editReportDetails: '',
        isDataFilled: false,


    },

    reducers: {
        setStateChanger: (state) => {
            state.stateChanger = state.stateChanger+1;
        },
        setIsReportPage: (state, action) => {
            state.isReportPage = action.payload
        },
        setReport: (state, action) => {
            state.reports = action.payload
        },
        setImageUpload: (state, action) => {
            state.isImageUploaded = action.payload;
        },
        setImageUrl: (state, action) => {
            state.images = action.payload;
        },
        setisEditClicked: (state, action) => {
            state.isEditClicked = action.payload;
        },
        setEditReportId: (state, action) => {
            state.editReportId = action.payload;
        },
        setEditReportName: (state, action) => {
            state.editReportName = action.payload;
        },
        setEditReportTitle: (state, action) => {
            state.editReportTitle = action.payload;
        },
        setEditReportDetails: (state, action) => {
            state.editReportDetails = action.payload;
        },
        setIsDataFilled: (state, action) => {
            state.isDataFilled = action.payload;
        },
        
    }
})

export const {
    setStateChanger,

    setIsReportPage,
    setReport,
    
    setImageUpload,
    setImageUrl,

    setisEditClicked,

    setEditReportId,
    setEditReportName,
    setEditReportTitle,
    setEditReportDetails,

    setIsDataFilled,

} = ReportDataSlice.actions;

export default ReportDataSlice.reducer;