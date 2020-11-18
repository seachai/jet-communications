import React from "react";
import { Switch, Route } from "react-router-dom";

import WithAuth from "./WithAuth";
import Navigation from "./Navigation";
import EntryPage from "./Components/EntryPage";
import ChatRoom from "./Components/ChatRoom";
import Admin from "./Components/Admin/";
import VideoChat from "./Components/VideoChat/";

const App = () => (
  <>
    <Navigation />
    <Switch>
      <Route exact path='/' component={EntryPage} />
      <WithAuth path='/chatroom'>
        <ChatRoom />
      </WithAuth>
      <WithAuth path='/admin'>
        <Admin />
      </WithAuth>
      <WithAuth path='/video-chat'>
        <VideoChat />
      </WithAuth>
    </Switch>
  </>
);

export default App;
