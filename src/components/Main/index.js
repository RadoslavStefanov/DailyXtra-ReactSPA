import React, { useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import DXACarousel from './Carousel';
import MainContent from './Content';

function Main() {
  const [key, setKey] = useState('global');

  return (
    <>
    <DXACarousel/>
    <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => setKey(k)}
      className="mb-3 mt-5"
      style={{ justifyContent: 'center' }}
    >
      <Tab eventKey="global" title="🌐Global">
      </Tab>
      <Tab eventKey="hot" title="🔥Hot">
      </Tab>
      <Tab eventKey="filter" title="🔎Filter">
      </Tab>
      <Tab eventKey="foryou" title="❤️ForYou" disabled>
      </Tab>
    </Tabs>
    <MainContent kay={key}/>
    </>    
  );
}

export default Main;