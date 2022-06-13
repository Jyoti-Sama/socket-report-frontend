import { useState } from "react";
import { Button } from "semantic-ui-react";
import CardGroups from "./components/cards/Card";
import AddEditForm from "./components/form/Form";

function App() {

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
