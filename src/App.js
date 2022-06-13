import { useState } from "react";
import { Button } from "semantic-ui-react";
import CardGroups from "./components/cards/Card";
import AddEditForm from "./components/form/Form";

import { useDispatch, useSelector } from 'react-redux'
import { setIsReportPage } from "./reducers/reducers";

function App() {
  const dispatch = useDispatch();

  const { isReportPage } = useSelector((state) => state.reportData);

  return (
    <div>
      <div>
        <div style={{ position: "relatve", padding: "20px", background: "silver" }}>
          <AddEditForm />
        </div>
        <div style={{padding: "20px", margin:" 0 auto "}}>
          <CardGroups />
        </div>
      </div>
    </div>
  );
}

export default App;
