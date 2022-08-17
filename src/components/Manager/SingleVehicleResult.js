import React from 'react';
import { Button, Divider } from '@mui/material';

export default function SinglePersonResult({ result, index, setSearchResult }) {
  const renavam = result.renavam
  return (
    <div key={index}>
      <div style={{ "display": "flex", "flexDirection": "column", "alignItems": "center" }}>
        <h2>Dados do veículo</h2>
        <p>RENAVAM: {renavam}</p>
        {result.dados.placa && <p>Placa: {result.dados.placa}</p>}
        {result.dados.chassi && <p>Chassi: {result.dados.chassi}</p>}
        {result.dados.especie && <p>Especie: {result.dados.especie}</p>}
        {result.dados.ano && <p>Ano: {result.dados.ano}</p>}
      </div>
      <Divider sx={{ my: 1 }} />
      <div style={{ display: "flex", "justifyContent": "space-evenly" }}>
        <div>
          <h3>Dados de seguro</h3>
          <p>Apólice: {result.dados.seguro.apolice || "Seguro não fornecido"}</p>
          <p>Seguradora: {result.dados.seguro.seguradora || "Seguradora não fornecida"}</p>
          <p>tipo: {result.dados.seguro.tipo || "Tipo não fornecido"}</p>
        </div>
        <div>
          <h3>Dados de propriedade</h3>
          <p>Nome Proprietário: {result.dados.nome || "Nome não fornecido"}</p>
          <p>CPF/CNPJ Proprietário{result.dados.cpf_cnpj_proprietario || "CPF/CNPJ não fornecido"}</p>
        </div>
      </div>
      <Divider sx={{ my: 1 }} />
      <div style={{ "display": "flex", "flexDirection": "column", "alignItems": "center" }}>
        <h3>Documentos</h3>
        {result.documentos.length > 0 ? result.documentos.map((document, index) => {
          return (
            <p key={index}>{document.name}: {document.value}</p>
          )
        }) : "Nenhum documento cadastrado"
        }
      </div>
      <Divider sx={{ my: 1 }} />
      <Button
        type="button"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        style={{ backgroundColor: '#ff0000', color: '#fff' }}
        onClick={() => deleteResult(result, setSearchResult)}
      >
        Apagar registro
      </Button>
      <Button
        type="button"
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        onClick={() => setSearchResult([])}
        fullWidth
      >
        Nova consulta
      </Button>
    </div>
  )
}



const deleteResult = (result, setSearchResult) => {
  const options = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      token: localStorage.getItem('token'),
      type: 'vehicle',
    }
  }
  const id = result._id;
  fetch(`https://cooperativadarhaissa.herokuapp.com/delete/${id}`, options)
    .then((res) => res.json())
    .then((res) => {
      if (res.status === "Deleted") {
        alert("Registro deletado com sucesso");
        setSearchResult([]);
      } else {
        alert("Erro ao deletar registro (já deletado?)");
      }
    })
    .catch((err) => {
      alert("Erro ao deletar registro")
      console.log(err);
    })
}