import React from "react";
import { connect } from "react-redux";
import { Row, Col, Image } from 'react-bootstrap';

const mapStateToProps = state => {
  return { gifs: state.gifs };
};
const ConnectedList = ({ gifs }) => (
  <Row className="align-items-center justify-content-center">
    {gifs.map((el,indx) => (
      <Col md={3} className="p-4" key={indx}>
        <Image src={el.images.fixed_width.url} rounded fluid />
      </Col>
    ))}
  </Row>
);
const SearchResult = connect(mapStateToProps)(ConnectedList);
export default SearchResult;