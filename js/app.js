import { CSVProcessor } from './core/csv-processor.js';
import { CalculadoraFactory } from './factories/calculadora-factory.js';

const processor = new CSVProcessor();
const data = new Date("2019-08-01");  // Exemplo

const estrategia = CalculadoraFactory.criarEstrategia(data);
processor.setStrategy(estrategia);

const resultado = processor.processarCSV(dadosCSV, {
  ipcae: 1.28,
  juros: 0.179,
  selic: 0.3083
});
console.log(resultado);
