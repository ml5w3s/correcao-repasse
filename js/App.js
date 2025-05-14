import { CSVProcessor } from './csv-processor.js';
import { CalculadoraFactory } from './core/factory/calculadora-factory.js';

// Exemplo de dados CSV para simular (você pode alterar depois)
const dadosCSV = [
  { valorOriginal: 1000, data: '2019-08-01' },
  { valorOriginal: 2000, data: '2020-05-01' }
];

const processor = new CSVProcessor();
const data = new Date("2019-08-01");  // Exemplo

const estrategia = CalculadoraFactory.criarEstrategia(data);
processor.setStrategy(estrategia);

const resultado = processor.processarCSV(data/tunep_monum.csv, {
  ipcae: 1.28,
  juros: 0.179,
  selic: 0.3083
});

console.log(resultado);

