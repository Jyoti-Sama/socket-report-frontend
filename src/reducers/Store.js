import {configureStore} from '@reduxjs/toolkit'

import reportData from './reducers';


const store = configureStore({
    reducer: {      
      reportData: reportData,      
    }
  })

export default store;