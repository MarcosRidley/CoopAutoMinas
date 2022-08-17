import React from 'react';
import whatsappImage from '../../images/whatsapp.svg';

export default function TableItem({ result, type }) {

  if(type === 'person') {
    return (
      <tr>
        <td class="tg-0pky">{result.dados.nome}</td>
        <td class="tg-0pky">{result.cpf}</td>
        <td class="tg-0pky">{result.dados.cnh}</td>
        <td class="tg-0pky">{result.dados.contact.cellphone} <a href={`https://api.whatsapp.com/send?phone=55${result.dados.contact.cellphone}`} target="_blank" rel="noreferrer"><img src={whatsappImage} alt="botao whatsapp" /></a></td>
      </tr>
    )
  }
  return (
    <tr>
      <td class="tg-0pky">{result.dados.nome}</td>
      <td class="tg-0pky"><b>{result.renavam}</b></td>
      <td class="tg-0pky">{result.dados.placa || "Não informada"}</td>
      <td class="tg-0pky">{result.dados.chassi || "Não informado"}</td>
    </tr>
  )
}