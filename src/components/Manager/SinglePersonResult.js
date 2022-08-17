import React from 'react';
import whatsappImage from '../../images/whatsapp.svg';
import { Button, Divider } from '@mui/material';

export default function SinglePersonResult({ result, index, setSearchResult }) {
  const cpf = result.cpf;
  return (
    <div key={index}>
      <div style={{"display":"flex", "flexDirection": "column", "alignItems": "center"}}>
        <h2>{result.dados.nome}</h2>
      <p>CPF: {cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")}</p>
      {result.dados.RG && <p>RG: {result.dados.RG}</p>}
      {result.dados.CNH && <p>CNH: {result.dados.CNH}</p>}
      {result.dados.naturalidade && <p>Naturalidade: {result.dados.naturalidade}</p>}
      {result.dados.nacionalidade && <p>Nacionalidade: {result.dados.nacionalidade}</p>}
        </div>
      <Divider sx={{ my: 1 }} />
      <div style={{display: "flex", "justifyContent": "space-evenly"}}>
        <div>
          <h3>Dados de endereço</h3>
      <p>Endereço: {result.dados.address.street || "Endereço não fornecido"}, {result.dados.address.number || "número não fornecido"} </p>
      <p>Bairro: {result.dados.address.neighborhood || "Bairro não fornecido"}</p>
      <p>Cidade: {result.dados.address.city || "Cidade não fornecida"}</p>
      <p>Estado: {result.dados.address.state || "Estado não fornecido"}</p>
          </div>
      <div>
        <h3>Dados de contato</h3>
      <p>Telefone: {result.dados.contact.cellphone || "Telefone não fornecido"} {result.dados.contact.cellphone && <span><a href={`https://api.whatsapp.com/send?phone=55${result.dados.contact.cellphone}`} target="_blank" rel="noreferrer">
        <img src={whatsappImage} alt="botao whatsapp" /></a></span>}</p>
      <p>Telefone Fixo: {result.dados.contact.fixo || "Telefone fixo não fornecido"}</p>
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
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        onClick={() => setSearchResult([])}
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
      type: 'person',
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