import React, { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import {cpfMask, phoneMask} from '../Utils/AnyUtils';

function List() {

  const [peopleList, setPeopleList] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/users')
      .then(res => res.json())
      .then(data => {
        setPeopleList(data);
      })
      .catch(err => {
        throw err;
      });
  }, [])

  let history = useHistory();

  const goToRoute = () => {
    history.push("/createPerson");
  }

  const Styles = {
    Table: { marginTop: 15 }
  }
  return (
    <React.Fragment >
      <h2>Pessoas: </h2>
      <Button variant="primary" onClick={goToRoute}> Criar Pessoa </Button>
      <Table striped bordered hover variant="dark" style={Styles.Table}>
        <thead>
          <tr>
            <th>#</th>
            <th>Nome: </th>
            <th>Documento: </th>
            <th>Telefones: </th>
          </tr>
        </thead>
        <tbody>
          {peopleList.length > 0 && peopleList.map((value, index) => {
            return (
              <tr key={index}>
                <td> {value.id}</td>
                <td> {value.nome} </td>
                <td> {cpfMask(value.documento)}</td>
                <td>
                  <ul>
                    {JSON.parse(value.telefone).map((val, indice) => {
                      return (
                        <li key={indice+"i"}> {phoneMask(val)} </li>
                      );
                    })}
                  </ul>
                </td>
              </tr>
            );
          })
          }
        </tbody>
      </Table>
    </React.Fragment>
  );
}

export default List;