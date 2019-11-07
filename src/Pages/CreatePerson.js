import React, { useState } from 'react';
import { Form, Col, Button, Row, Card } from 'react-bootstrap';
import axios from 'axios';
import {cpfMask, phoneMask} from '../Utils/AnyUtils';

function CreatePerson() {

  const [name, setName] = useState("");
  const [document, setDocument] = useState("");
  const [phone, setPhone] = useState("");
  const [phones, setPhones] = useState([]);

  const addPhone = () => {
    setPhones([...phones, phone]);
    setPhone("");
  }
  const submitForm = async (e) => {
    e.preventDefault();
    //unmask cpf
    var newDoc = parseInt(document.replace('-', '').replace(/\./g,'').substring(0,11));
    axios.post('http://localhost:4000/users/create', { name: name, document: newDoc, phones: phones })
      .then(response => {
        alert('registro inserido com sucesso')
      })
  }

  const Styles = {
    Table: { marginTop: 15 },
    DFLex: { display: 'flex'},
    Ml15: {marginLeft: 15},
    M15: {margin: 15}
  }

  return (
    <React.Fragment >
      <Card>
        <Card.Header>
        <h2>Criar Pessoa: </h2>
        </Card.Header>
        <Card.Body>
        <Form style={Styles.Table}>
        <Form.Row>
          <Form.Group as={Col} controlId="name">
            <Form.Label>Nome</Form.Label>
            <Form.Control onChange={(e) => { setName(e.target.value); }} />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} controlId="document">
            <Form.Label>Documento: </Form.Label>
            <Form.Control onChange={(e) => { setDocument(e.target.value); }} value={cpfMask(document)}/>
          </Form.Group>
        </Form.Row>
        <Row>

          <Form.Group as={Col} controlId="document">
            <Form.Label>Telefones: </Form.Label>
            <div style={Styles.DFLex}>
              <Form.Control onChange={(e) => { setPhone(e.target.value); }} value={phoneMask(phone)} maxLength="15"/>
              <Button onClick={addPhone} style={Styles.Ml15}> + </Button>
            </div>
          </Form.Group>
        </Row>
        <div style={Styles.M15}>
        {phones.length > 0 && phones.map((value, index) => {
          return <li className="teste" key={index}>{value}</li>
        })}
        </div>
        <Button variant="primary" type="submit" onClick={submitForm}>
          Submit
  </Button>
      </Form>
        </Card.Body>
      </Card>
     
    </React.Fragment>
  );
}

export default CreatePerson;