import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from 'react-router-dom';
import { Container, Link, Row } from '@dataesr/react-dsfr';

import Load from './pages/Load';
import Publication from './pages/Publication';
import Publications from './pages/Publications';


export default function BasicExample() {
  return (
    <Router>
      <Container fluid={true} spacing="m-2w p-2w">
        <Row>
          <h1>
            <Link href="/">
              ScanR - Backoffice
            </Link>
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
