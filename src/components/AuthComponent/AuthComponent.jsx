import React from "react";
import { withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to Your App</h1>
      </header>
    </div>
  );
}

export default withAuthenticator(App);
