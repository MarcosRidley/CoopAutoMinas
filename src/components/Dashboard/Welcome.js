import React from 'react';


export default function Welcome() {
  return (
    <div>
      <h1>Bem vindo ao sistema de consulta de dados da MGCOOP</h1>
      <p>
        Para começar, escolha o tipo de consulta que deseja realizar e clique em "Consultar".
      </p>
      <p>
        Para realizar uma consulta de um único registro, escolha o tipo de consulta e digite o CPF ou
        RENAVAN do registro que deseja consultar.
      </p>
      <p>
        Para realizar uma consulta de todos os registros de uma determinada categoria, escolha o tipo de consulta e clique em "Consultar".
      </p>
    </div>
  );
}