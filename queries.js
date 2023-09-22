// Consultas MongoDB

// 1. Recupere um apanhado contendo todos os valores distintos da chave “NOME_TURNO_CURSO_BOLSA”.
const distinctTurnos = db.prouniData.distinct("NOME_TURNO_CURSO_BOLSA");
print("Valores distintos da chave NOME_TURNO_CURSO_BOLSA:");
distinctTurnos.forEach(printjson);

// 2. Recupere a quantidade total do apanhado contendo todos os valores distintos da chave “NOME_TURNO_CURSO_BOLSA”.
const totalDistinctTurnos = db.prouniData.distinct("NOME_TURNO_CURSO_BOLSA").length;
print(`Quantidade total de valores distintos da chave NOME_TURNO_CURSO_BOLSA: ${totalDistinctTurnos}`);

// 3. Recupere a quantidade total do apanhado contendo todos os valores distintos da chave “NOME_CURSO_BOLSA”.
const totalDistinctCursos = db.prouniData.distinct("NOME_CURSO_BOLSA").length;
print(`Quantidade total de valores distintos da chave NOME_CURSO_BOLSA: ${totalDistinctCursos}`);

// 4. Recupere um apanhado de documentos pela chave instituições de ensino (NOME_IES_BOLSA) com base nas regras especificadas.
// Substitua as condições abaixo pelas regras específicas.
const instituicoesEnsino = db.prouniData.find({
    $or: [
      { NOME_IES_BOLSA: /CEN/ },
      { NOME_IES_BOLSA: /UNI/ },
      { NOME_IES_BOLSA: /uni/ },
      { NOME_IES_BOLSA: /uti/ },
      { NOME_IES_BOLSA: /^UNI/ },
      { NOME_IES_BOLSA: /^INS/ },
      { NOME_IES_BOLSA: /^uNI/ },
      { NOME_IES_BOLSA: /OES$/ },
      { $and: [{ NOME_IES_BOLSA: /CEN/ }, { NOME_IES_BOLSA: /uti/ }] },
      { $and: [{ NOME_IES_BOLSA: /tri/ }, { NOME_IES_BOLSA: /TOd/ }] },
    ],
  });
  print("Documentos de instituições de ensino com base nas regras especificadas:");
  instituicoesEnsino.forEach(printjson);

// 5. Recupere um apanhado de documentos em ordem crescente através da chave “ANO_CONCESSAO_BOLSA”.
const ascYearDocs = db.prouniData.find().sort({ ANO_CONCESSAO_BOLSA: 1 }).limit(10);
print("Documentos em ordem crescente por ANO_CONCESSAO_BOLSA:");
ascYearDocs.forEach(printjson);

// 6. Recupere um apanhado de documentos em ordem decrescente através da chave “idade”.
const descAgeDocs = db.prouniData.find().sort({ idade: -1 }).limit(10);
print("Documentos em ordem decrescente por idade:");
descAgeDocs.forEach(printjson);

// 7. Recupere os estudantes do turno “Vespertino” (NOME_TURNO_CURSO_BOLSA) que estavam participando do programa no ano de “2009” (ANO_CONCESSAO_BOLSA).
const vespertino2009 = db.prouniData.find({ NOME_TURNO_CURSO_BOLSA: "Vespertino", ANO_CONCESSAO_BOLSA: 2009 });
print("Estudantes do turno Vespertino em 2009:");
vespertino2009.forEach(printjson);

// 8. Recupere os estudantes do turno “Vespertino” (NOME_TURNO_CURSO_BOLSA) que estavam participando do programa no ano de “2009” (ANO_CONCESSAO_BOLSA), limitando a quantidade de documentos em 5.
const vespertino2009Limited = db.prouniData.find({ NOME_TURNO_CURSO_BOLSA: "Vespertino", ANO_CONCESSAO_BOLSA: 2009 }).limit(5);
print("Estudantes do turno Vespertino em 2009 (limitado a 5 documentos):");
vespertino2009Limited.forEach(printjson);

// 9. Recupere os documentos através dos IDs especificados em ordem crescente.
const idsEspecificos = [1, 2, 3]; // Substitua pelos IDs que você deseja recuperar.
const documentosPorIds = db.prouniData.find({ _id: { $in: idsEspecificos } }).sort({ _id: 1 });
print("Documentos por IDs especificados em ordem crescente:");
documentosPorIds.forEach(printjson);

// 10. Recupere todos os documentos em que as instituições de ensino (NOME_IES_BOLSA) comecem com “uni”, apresentando apenas as chaves e valores “ANO_CONCESSAO_BOLSA”, “TIPO_BOLSA” e “MUNICIPIO_BENEFICIARIO_BOLSA”.
const startsWithUni = db.prouniData.find({ NOME_IES_BOLSA: /^uni/i }, { ANO_CONCESSAO_BOLSA: 1, TIPO_BOLSA: 1, MUNICIPIO_BENEFICIARIO_BOLSA: 1 });
print("Documentos em que NOME_IES_BOLSA começa com 'uni':");
startsWithUni.forEach(printjson);

// 11. Verifique se há algum documento sem a chave e valores de “CODIGO_EMEC_IES_BOLSA”.
const documentoSemCodigoEmec = db.prouniData.findOne({ "CODIGO_EMEC_IES_BOLSA": { $exists: false } });
if (documentoSemCodigoEmec) {
  print("Documento sem a chave CODIGO_EMEC_IES_BOLSA encontrado.");
} else {
  print("Nenhum documento sem a chave CODIGO_EMEC_IES_BOLSA encontrado.");
}

