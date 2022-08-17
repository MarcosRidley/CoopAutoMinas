import React from 'react';
import { Button, Divider, TextField, DialogTitle } from '@mui/material';
import cpfFormatter from '../../helpers/cpfFormatter';
import SinglePersonResult from './SinglePersonResult';
import SingleVehicleResult from './SingleVehicleResult';
import TableInfo from './TableInfo';

export default function Consulta() {
	const [isLoading, setIsLoading] = React.useState(false);
	const [notFound, setNotFound] = React.useState(false);
	const [searchType, setSearchType] = React.useState(null);
	const [searchAmmount, setSearchAmmount] = React.useState(null);
	const [searchResult, setSearchResult] = React.useState([]);
	const [cpf, setCpf] = React.useState('');
	const [renavan, setRenavan] = React.useState('');

	const handleFormCreation = (event) => {
		switch (event.target.value) {
			case 'person':
				setSearchType('person');
				break;
			case 'vehicle':
				setSearchType('vehicle');
				break;
			default:
				setSearchType(null);
				break;
		}
	};

	const handleAmmountSelector = (event) => {
		switch (event.target.value) {
			case 'single':
				setSearchAmmount('single');
				break;
			case 'all':
				setSearchAmmount('all');
				setCpf('');
				setRenavan('');
				break;
			default:
				setSearchAmmount(null);
				break;
		}
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		setIsLoading(true);
		if (cpf || renavan) {
			handleSingleRequest(
				searchType,
				cpf,
				renavan,
				setSearchResult,
				setIsLoading,
				setNotFound
			);
		} else {
			handleMultipleRequest(
				searchType,
				setSearchResult,
				setIsLoading,
				setNotFound
			);
		}
	};

	const cpfDisplayerFilled = () => {
		const formattedCPF = cpfFormatter(cpf);
		return formattedCPF.length === 11;
	};

	const renavanDisplayerFilled = () => {
		const formattedRenavan = renavan.replace(/\D/g, '');
		return formattedRenavan
	};

	const requiredField = () => {
		if (searchAmmount === 'single' && searchType === 'person') {
			return searchAmmount && searchType && cpfDisplayerFilled();
		} else if (searchAmmount === 'single' && searchType === 'vehicle') {
			return searchAmmount && searchType && renavanDisplayerFilled();
		}
		return searchAmmount && searchType;
	};

	return (
		<div>
			{searchResult.length < 1 && (
				<section id="consultation">
					<DialogTitle>Consulta</DialogTitle>
					<form onSubmit={handleSubmit} method="POST">
						<h5>Tipo de consulta:</h5>
						<label>
							<input
								type="radio"
								name="personOrVehicle"
								value="person"
								checked={searchType === 'person'}
								onChange={handleFormCreation}
							/>
							Pessoa
						</label>
						<label>
							<input
								type="radio"
								name="personOrVehicle"
								value="vehicle"
								checked={searchType === 'vehicle'}
								onChange={handleFormCreation}
							/>
							Veículo
						</label>
						<Divider sx={{ my: 1 }} />
						<div>
							<h5>Abrangência de consulta:</h5>
							<label>
							<input
								type="radio"
								name="consulta"
								value="single"
								checked={searchAmmount === 'single'}
								onChange={handleAmmountSelector}
								/>
							Específico
						</label>
						<label>
							<input
								type="radio"
								name="consulta"
								value="all"
								checked={searchAmmount === 'all'}
								onChange={handleAmmountSelector}
								/>
							Todos
						</label>
								</div>
						<Divider sx={{ my: 1 }} />
            {notFound && <p>Nenhum resultado encontrado</p>}
						{searchAmmount === 'single' && searchType === 'person' && (
							<TextField
								margin="normal"
								required
								fullWidth
								id="CPF"
								label="CPF"
								name="CPF"
								autoFocus
								onChange={(event) => setCpf(event.target.value)}
							/>
						)}
						{searchAmmount === 'single' && searchType === 'vehicle' && (
							<TextField
								margin="normal"
								required
								fullWidth
								id="vehicle"
								label="RENAVAN"
								name="vehicle"
								autoFocus
								onChange={(event) => setRenavan(event.target.value)}
							/>
						)}
						{requiredField() && (
							<Button
								type="button"
								fullWidth
								variant="contained"
								sx={{ mt: 3, mb: 2 }}
								onClick={handleSubmit}
							>
								{isLoading ? 'Carregando...' : 'Procurar'}
							</Button>
						)}
					</form>
				</section>
			)}
			{searchResult.length === 1 && (
				<section id="searchResult">
					<h1>Resultado</h1>
					<div>
            {console.log(searchResult)}
						{searchType === "person" && searchResult.map((result, index) => (
							<SinglePersonResult
								key={index}
								result={result}
								setSearchResult={setSearchResult}
							/>
						))}
            {searchType === "vehicle" && searchResult.map((result, index) => (
              <SingleVehicleResult
                key={index}
                result={result}
                setSearchResult={setSearchResult}
              />
            ))}
					</div>
				</section>
			)}
      {searchResult.length > 1 && (
        <section id="searchResult">
          <h1>Resultado</h1>
          <div>
            {searchType === "person" && (
              <TableInfo type="person" results={searchResult} setSearchResult={setSearchResult} />
            )}
            {searchType === "vehicle" && (
              <TableInfo type="vehicle" results={searchResult} setSearchResult={setSearchResult}/>
            )}
          </div>
        </section>
      )}
      
		</div>
	);
}

const handleSingleRequest = (
	searchType,
	cpf,
	renavan,
	setSearchResult,
	setIsLoading,
	setNotFound
) => {
	setSearchResult([]);
	const whichKey = searchType === 'person' ? 'cpf' : 'renavan';
	const options = {
		method: 'GET',
		headers: {
			token: localStorage.getItem('token'),
			type: 'single',
			entity: whichKey,
		},
	};
	const requestedId =
		whichKey === 'cpf' ? cpfFormatter(cpf) : renavan.replace(/\D/g, '');
	// fetch(`http://localhost:5000/search/${requestedId}`, options)
	fetch(`https://cooperativadarhaissa.herokuapp.com/search/${requestedId}`, options)
		.then((res) => res.json())
		.then((res) => {
			console.log(res);
			if (res.status === 'Found') {
				setIsLoading(false);
				setSearchResult(res.data);
			} else {
				setNotFound(true);
				setIsLoading(false);
			}
		})
		.catch((err) => {
			console.log(err);
			setIsLoading(false);
      setNotFound(true)
		});
};

const handleMultipleRequest = (
	searchType,
	setSearchResult,
	setIsLoading,
	setNotFound
) => {
	setSearchResult([]);
	const options = {
		method: 'GET',
		headers: {
			token: localStorage.getItem('token'),
			type: 'all',
			entity: searchType,
		},
	};
	// fetch(`http://localhost:5000/search/all-${searchType}s`, options)
	fetch(`https://cooperativadarhaissa.herokuapp.com/search/all-${searchType}s`, options)
		.then((res) => res.json())
		.then((res) => {
			console.log(res);
			if (res.status === 'OK') {
				setIsLoading(false);
				setSearchResult(res.data);
			} else {
				setNotFound(true);
				setIsLoading(false);
			}
		})
		.catch((err) => {
			console.log(err);
			setIsLoading(false);
      setNotFound(true);
		});
};
