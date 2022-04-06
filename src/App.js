import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import { Container, Row } from '@dataesr/react-dsfr';

import Load from './pages/Load';
import Publication from './pages/Publication';
import Publications from './pages/Publications';


export default function BasicExample() {
  return (
    <Router>
      <Container>
        <Row>
          <h1>
            ScanR - Backoffice
          </h1>
        </Row>
        <Row>
          <Routes>
            <Route exact path="/" element={<Publications />} />
            <Route path="/load" element={<Load />} />
            <Route path="/publication/*" element={<Publication />} />
          </Routes>
        </Row>
      </Container>
    </Router>
  );
}
