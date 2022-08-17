import * as React from 'react';
import { CircularProgress, DialogTitle, Divider, TextField, InputLabel,FormControl, Select, MenuItem } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import cpfFormatter from '../../helpers/cpfFormatter';



export default function Cadastro() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [isWrong, setIsWrong] = React.useState(false);
  const [failure, setFailure] = React.useState(false);
  const [isPerson, setIsPerson] = React.useState("select");
  const [hasBeenChosen, setHasBeenChosen] = React.useState(false);

  const handleSubmitUser = (event) => {
    event.preventDefault();
    setIsLoading(true);
    const data = new FormData(event.currentTarget);
    if (!data.get('CPF') || !data.get('nome')) {
      setIsWrong(true);
      setIsLoading(false);
      return;
    }
    const values = userDataGenerator(data);
    if (values.cpf.length !== 11) {
      setFailure(true);
      setIsLoading(false);
      return;
    }
    setIsWrong(false);
    setFailure(false);

    const options = {
      method: 'POST',
      body: JSON.stringify(values),
      headers: {
        'Content-Type': 'application/json',
        'token': localStorage.getItem('token'),
      }
    }
    // fetch('http://localhost:5000/user', options)
      fetch('https://cooperativadarhaissa.herokuapp.com/user', options)
      .then((res) => res.json())
      .then((res) => {
        if (res.status === 'Created') {
          setIsLoading(false);
          alert('Usuário cadastrado com sucesso!');
        } else {
          setFailure(true);
          setIsLoading(false);
        }
      });
  }

  const handleSubmitVehicle = (event) => {
    event.preventDefault();
    setIsLoading(true);
    const data = new FormData(event.currentTarget);
    if (!data.get('renavam') || !data.get('nome')) {
      setIsWrong(true);
      setIsLoading(false);
      return;
    }
    const values = vehicleDataGenerator(data);

    setIsWrong(false);
    setFailure(false);

    const options = {
      method: 'POST',
      body: JSON.stringify(values),
      headers: {
        'Content-Type': 'application/json',
        'token': localStorage.getItem('token'),
      }
    }
    // fetch('http://localhost:5000/vehicle', options)
      fetch('https://cooperativadarhaissa.herokuapp.com/vehicle', options)
      .then((res) => res.json())
      .then((res) => {
        if (res.status === 'Created') {
          setIsLoading(false);
          alert('Veículo cadastrado com sucesso!');
          console.log(res.vehicle)
        } else {
          setFailure(true);
          setIsLoading(false);
        }
      });
  }

  return (
    <div>
      <DialogTitle>Cadastro</DialogTitle>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Cadastrar pessoa ou veículo?</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={isPerson}
            label="Cadastrar pessoa ou veículo?"
            onChange={(e) => {
              setIsPerson(e.target.value)
              setHasBeenChosen(true);}
            }
          >
            <MenuItem value={true}>Pessoa</MenuItem>
            <MenuItem value={false}>Veículo</MenuItem>
          </Select>
        </FormControl>
      {hasBeenChosen && isPerson && <Box component="form" onSubmit={handleSubmitUser} noValidate sx={{ mt: 1 }}>
        <DialogTitle>Dados pessoais</DialogTitle>
        {isWrong && <Box sx={{ color: 'red', fontSize: '14px', fontWeight: 'bold', mt: 1 }}>Preencha ao menos o nome completo e CPF.</Box>}
        {failure && <Box sx={{ color: 'red', fontSize: '14px', fontWeight: 'bold', mt: 1 }}>Erro ao cadastrar usuário (CPF inválido ou já cadastrado).</Box>}
        <TextField
          margin="normal"
          required
          fullWidth
          id="nome"
          label="Nome Completo"
          name="nome"
          autoFocus
        />

        <TextField
          margin="normal"
          required
          fullWidth
          id="CPF"
          label="CPF"
          name="CPF"
          autoFocus
        />

        <TextField
          margin="normal"
          id="CNH"
          label="CNH"
          name="CNH"
          style={{ marginRight: '1em', width: '25%' }}
          autoFocus
        />

        <TextField
          margin="normal"
          id="naturalidade"
          label="Naturalidade"
          name="naturalidade"
          style={{ marginRight: '1em', width: '25%' }}
          autoFocus
        />

        <TextField
          margin="normal"
          id="nacionalidade"
          label="Nacionalidade"
          name="nacionalidade"
          style={{ marginRight: '1em', width: '25%' }}
          autoFocus
        />

        <Divider sx={{ my: 1 }} />

        <TextField
          margin="normal"
          id="rua"
          label="Rua"
          fullWidth
          name="rua"
          autoFocus
        />
        <TextField
          margin="normal"
          id="numero"
          label="Número"
          name="numero"
          style={{ boxSizing: "border-box", marginRight: '1vw', width: '23%' }}
          autoFocus
        />
        <TextField
          margin="normal"
          id="bairro"
          label="Bairro"
          name="bairro"
          style={{ boxSizing: "border-box", marginRight: '1vw', width: '23%' }}
          autoFocus
        />
        <TextField
          margin="normal"
          id="cidade"
          label="Cidade"
          name="cidade"
          style={{ boxSizing: "border-box", marginRight: '1vw', width: '23%' }}
          autoFocus
        />
        <TextField
          margin="normal"
          id="estado"
          label="Estado"
          name="estado"
          style={{ boxSizing: "border-box", marginRight: '1vw', width: '23%' }}
          autoFocus
        />

        <Divider sx={{ my: 1 }} />

        <TextField
          margin="normal"
          id="celular"
          label="Celular"
          name="celular"
          style={{ marginRight: '5vw', width: '40%' }}
          autoFocus
        />
        <TextField
          margin="normal"
          id="fixo"
          label="Fixo"
          name="fixo"
          style={{ marginRight: '1em', width: '40%' }}
          autoFocus
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          {isLoading ? <CircularProgress color='warning' /> : 'Cadastrar'}
        </Button>

      </Box>}
      {!isPerson && <Box component="form" onSubmit={handleSubmitVehicle} noValidate sx={{ mt: 1 }}>
        <DialogTitle>Dados Do veículo</DialogTitle>
        {isWrong && <Box sx={{ color: 'red', fontSize: '14px', fontWeight: 'bold', mt: 1 }}>O campo RENAVAM e o nome do proprietário são obrigatórios</Box>}
        {failure && <Box sx={{ color: 'red', fontSize: '14px', fontWeight: 'bold', mt: 1 }}>Erro ao cadastrar veículo (RENAVAM inválido ou já cadastrado).</Box>}
        <TextField
          margin="normal"
          required
          fullWidth
          id="renavam"
          label="RENAVAM"
          name="renavam"
          autoFocus
        />
        <TextField
          margin="normal"
          id="nome"
          label="Nome do proprietário"
          fullWidth
          required
          name="nome"
          autoFocus
        />
        <TextField
          margin="normal"
          id="cpf_cnpj_proprietario"
          label="CPF/CNPJ do proprietário"
          name="cpf_cnpj_proprietario"
          fullWidth
          autoFocus
          sx={{ mr: 1 }}
        />
        <TextField
          margin="normal"
          id="placa"
          label="Placa"
          name="placa"
          autoFocus
          sx={{ mr: 1 }}
        />
        <TextField
          margin="normal"
          id="chassi"
          label="Chassi"
          name="chassi"
          autoFocus
          sx={{ mr: 1 }}
        />
        <TextField
          margin="normal"
          id="especie"
          label="Modelo"
          name="especie"
          autoFocus
          sx={{ mr: 1 }}
        />
        <TextField
          margin="normal"
          id="ano"
          label="Ano"
          name="ano"
          autoFocus
          sx={{ mr: 1 }}
        />
        <Divider sx={{ my: 1 }} />
        <TextField
          margin="normal"
          id="apolice"
          label="Apolice de seguro"
          name="apolice"
          autoFocus
          sx={{ mr: 1 }}
        />
        <TextField
          margin="normal"
          id="seguradora"
          label="Seguradora"
          name="seguradora"
          autoFocus
          sx={{ mr: 1 }}
        />
        <TextField
          margin="normal"
          id="tipo"
          label="Tipo de seguro"
          name="tipo"
          autoFocus
          sx={{ mr: 1 }}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          {isLoading ? <CircularProgress color='warning' /> : 'Cadastrar Veículo'}
        </Button>
      </Box>}
    </div>
  );
}

const userDataGenerator = (data) => {
  const cpfNumber = cpfFormatter(data.get('CPF'));
  const phoneNumber = data.get('celular').replace(/\D/g, '');
  const fixoNumber = data.get('fixo').replace(/\D/g, '');
  return {
    _id: cpfNumber,
    cpf: cpfNumber,
    dados: {
      nome: data.get('nome'),
      CNH: data.get('CNH'),
      naturalidade: data.get('naturalidade'),
      nacionalidade: data.get('nacionalidade') || 'Brasileira',
      address: {
        street: data.get('rua'),
        number: data.get('numero'),
        neighborhood: data.get('bairro'),
        city: data.get('cidade'),
        state: data.get('estado'),
      },
      contact: {
        cellphone: phoneNumber,
        fixo: fixoNumber,
      },
      documentos: [],
    }
  }
};


const vehicleDataGenerator = (data) => {
  return {
    _id: data.get('renavam'),
    renavam: data.get('renavam'),
    dados: {
      nome: data.get('nome'),
      placa: data.get('placa'),
      cpf_cnpj_proprietario: data.get('cpf_cnpj_proprietario'),
      chassi: data.get('chassi'),
      especie: data.get('especie'),
      seguro: {
        apolice: data.get('apolice'),
        seguradora: data.get('seguradora'),
        tipo: data.get('tipo'),
      },
      documentos: [],
    }
  }
};