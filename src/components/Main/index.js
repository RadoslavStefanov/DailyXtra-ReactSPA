import React, { useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

function Main() {
  const [key, setKey] = useState('global');

  return (
    <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => setKey(k)}
      className="mb-3 mt-5"
    >
      <Tab eventKey="global" title="🌐Global">
        <strong>Global</strong>
      </Tab>
      <Tab eventKey="hot" title="🔥Hot">
        <strong>Hot</strong>
      </Tab>
      <Tab eventKey="filter" title="🔎Filter">
        <strong>ForYou</strong>
      </Tab>
      <Tab eventKey="foryou" title="❤️ForYou" disabled>
        <strong>ForYou</strong>
      </Tab>
    </Tabs>
  );
}

export default Main;