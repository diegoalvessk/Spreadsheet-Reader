const { GoogleSpreadsheet } = require('google-spreadsheet');
const credenciais = require('./credentials.json');
const arquivo = require('./arquivo.json');
const { JWT } = require('google-auth-library');

const SCOPES = [
  'https://www.googleapis.com/auth/spreadsheets'
];

const jwt = new JWT({
  email: credenciais.client_email,
  key: credenciais.private_key,
  scopes: SCOPES,
});

const { GoogleSpreadsheet } = require('google-spreadsheet');
const credenciais = require('./credentials.json');
const { JWT } = require('google-auth-library');

// Configure o JWT (JSON Web Token) para a autenticação.
const jwtClient = new JWT({
  email: credenciais.client_email,
  key: credenciais.private_key,
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

// Função assíncrona GetDoc que cria e retorna um objeto GoogleSpreadsheet.
async function GetDoc(spreadsheetId) {
  try {
    // Criando um novo objeto GoogleSpreadsheet usando o ID da planilha.
    const doc = new GoogleSpreadsheet(spreadsheetId);

    // Autenticando com o JWT.
    await doc.useJwtAuth(jwtClient.email, jwtClient.key);

    // Carregando as informações da planilha.
    await doc.loadInfo();

    // O objeto doc agora contém as informações da planilha e está pronto para ser usado.
    return doc;
  } catch (error) {
    // Caso haja algum erro durante o processo, ele será exibido aqui.
    console.error('Erro ao acessar a planilha:', error);
    throw error; // Relançar o erro para ser tratado por quem chamar GetDoc.
  }
}

// Substitua 'SEU_SPREADSHEET_ID' pelo ID real da sua planilha do Google Sheets.
const spreadsheetId = 'SEU_SPREADSHEET_ID';

// Chamada de exemplo da função GetDoc.
GetDoc(spreadsheetId)
  .then(doc => {
    console.log('Título da Planilha:', doc.title);
    // Aqui você pode continuar a manipular o objeto doc conforme necessário.
  })
  .catch(error => {
    // Tratamento de erro da chamada GetDoc.
    console.error('Erro ao obter a planilha:', error);
  });


