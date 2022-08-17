import React from 'react';
import TableItem from './TableItem';
import './tableStyles.css';
import { Button } from '@mui/material';

export default function TableInfo({ type, results, setSearchResult }) {
	return (
		<div>
			<table class="tg">
				<thead>
					{type === 'person' && (
						<tr>
							<th class="tg-0pky">Nome Completo</th>
							<th class="tg-0pky">CPF</th>
							<th class="tg-0pky">CNH</th>
							<th class="tg-0pky">Celular</th>
						</tr>
					)}
					{type === 'vehicle' && (
						<tr>
							<th class="tg-0pky">Nome do proprietário</th>
							<th class="tg-0pky">RENAVAM</th>
							<th class="tg-0pky">Placa</th>
							<th class="tg-0pky">Chassi</th>
						</tr>
					)}
				</thead>
				<tbody>
					{results.map((result, index) => (
						<TableItem key={index} result={result} type={type} />
					))}
				</tbody>
			</table>
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
	);
}
