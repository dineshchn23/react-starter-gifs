import React from 'react';
import { connect } from "react-redux";
import { Container, Row, Col, Card, ListGroup, Form, ButtonToolbar, Button, Spinner } from 'react-bootstrap';
import './App.css';
import Axios from 'axios';

import SearchResult from './components/SearchResult.js'
import { searchResult } from "./store/actions/index";

function mapDispatchToProps(dispatch) {
  return {
    searchResult: payload => dispatch(searchResult(payload))
  };
}

const option = {
  endPoints: [
    { label: 'Gifs', value: 'gifs' },
    { label: 'Stickers', value: 'stickers' }
  ],
  categories: [
    { label: 'Search', value: 'search' },
    { label: 'Trending', value: 'trending' },
    { label: 'Random', value: 'random' },
  ]
}

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      inputFields: [
        { action: this.handleInputChange, field: 'search_text', label: 'Search Text', input: true },
        { action: this.handleInputChange, field: 'end_point', label: 'Endpoint', select: true, options: option.endPoints },
        { action: this.handleInputChange, field: 'category', label: 'Category', select: true, options: option.categories },
        { action: this.result, label: 'Gooooo', button: true },
      ],
      formElements: [],
      gifElements: [],
      formInputs: {
        search_text: '',
        end_point: 'gifs',
        category: 'search'
      },
      loader:false,
      gifs: []
    }
  }

  componentWillMount() {
    const formElements = []
    let { inputFields } = this.state
    for (const [index, value] of inputFields.entries()) {
      if (value.input) {
        formElements.push(
          <ListGroup.Item key={index}>
            <Form.Group controlId={`exampleForm.ControlInput${index}`}>
              <Form.Label>{value.label}</Form.Label>
              <Form.Control type="text" key={index} placeholder="type something .." name={value.field} onChange={value.action} />
            </Form.Group>
          </ListGroup.Item>
        )
      } else if (value.select) {
        let customFieldOptions = []
        for (const [, selectOption] of value.options.entries()) {
          customFieldOptions.push(
            <option value={selectOption.value}>{selectOption.label}</option>
          )
        }
        formElements.push(
          <ListGroup.Item key={index}>
            <Form.Group controlId={`exampleForm.ControlInput${index}`}>
              <Form.Label>{value.label}</Form.Label>
              <Form.Control as="select" key={index} name={value.field} onChange={value.action}>
                {customFieldOptions}
              </Form.Control>
            </Form.Group>
          </ListGroup.Item>
        )
      } else if (value.button) {
        formElements.push(
          <ListGroup.Item key={index}>
            <ButtonToolbar>
              <Button variant="primary" size="lg" onClick={value.action}>
                {value.label}
              </Button>
            </ButtonToolbar>
          </ListGroup.Item>
        )
      }
    }
    this.setState({ formElements })
  }

  handleInputChange = ({ target: { value, name } }) => {
    let formInputs = Object.assign({}, this.state.formInputs)
    formInputs[name] = value
    this.setState({ formInputs })
  }

  result = () => {
    let slug
    let { formInputs } = this.state
    if (formInputs.category === 'search') {
      slug = `&q=${formInputs.search_text}&limit=50&offset=0&rating=G&lang=en`
    } else {
      slug = `&limit=25&rating=G`
    }
    this.setState({loader:true})
    Axios.get(`https://api.giphy.com/v1/${formInputs.end_point}/${formInputs.category}?api_key=xdelcHBduR3Lv73AxZwG0ym9vTU2wqak${slug}`)
      .then(res => {
        this.props.searchResult(res.data.data);
        this.setState({loader:false})
        // this.setState({ gifs: res })
        // const gifElements = []
        // res.data.data.map((value, index) => {
        //   gifElements.push(
        //     <Col md={3} className="p-4">
        //       <Image src={value.images.fixed_width.url} rounded fluid />
        //     </Col>
        //   )
        // })
        // this.setState({ gifElements })
      })
  }

  render() {
    let { formElements } = this.state
    let spinner
    if (this.state.loader) {
      spinner = <Spinner animation="grow" />;
    }
    return (
      <div className="App p-2">
        <Container fluid={true}>
          <Row>
            <Col md={4}>
              <Card style={{ width: '100%' }}>
                <Card.Header>Filter</Card.Header>
                <ListGroup variant="flush">
                  {formElements}
                </ListGroup>
              </Card>
            </Col>
            <Col md={8}>
              {/* <Row className="align-items-center justify-content-center">
                {gifElements}
              </Row> */}
              <SearchResult />
              {spinner}
            </Col>
          </Row>
        </Container>
      </div>
    );
  }

}
const Gifs = connect(null, mapDispatchToProps)(App);
export default Gifs;
