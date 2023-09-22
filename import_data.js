// scripts/import_data.js

const database = 'Prouni';
const collection = 'prouniData';

// Conecte-se ao MongoDB
const conn = new Mongo();
const db = conn.getDB(database);

// Importe os dados do arquivo JSON para a coleção
const filePath = './data/prouni.json';
const fileContent = cat(filePath);
const data = JSON.parse(fileContent);
db[collection].insertMany(data);
print(`Dados importados com sucesso para a coleção ${collection} em ${database}.`);
