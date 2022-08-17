export default function cpfFormatter(cpf) {
  return cpf.replace(/\D/g, '');
}