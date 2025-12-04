function calcularIMC() {
    const peso = parseFloat(document.getElementById('peso').value);
    const alturaCm = parseFloat(document.getElementById('altura').value);
    const alturaM = alturaCm / 100;
    const imc = peso / (alturaM * alturaM);
    const resultadoElemento = document.getElementById('resultado');

    if (isNaN(peso) || isNaN(alturaM) || peso <= 0 || alturaM <= 0) {
        alert("Por favor, insira valores positivos e validos para todos os campos.");
        resultadoElemento.classList.remove('resultado-visivel');
        resultadoElemento.textContent = '';
        return;
    }

    let classificacao = '';
    if (imc < 18.5) {
        classificacao = 'Abaixo do peso';
    } else if (imc >= 18.5 && imc < 25) {
        classificacao = 'Peso normal';
    } else if (imc >= 25 && imc < 30) {
        classificacao = 'Sobrepeso';
    } else if (imc >= 30 && imc < 35) {
        classificacao = 'Obesidade grau 1';
    } else if (imc >= 35 && imc < 40) {
        classificacao = 'Obesidade grau 2';
    } else {
        classificacao = 'Obesidade grau 3';
    }

    const imcLinhas = [
        `<li><strong>Indice:</strong> ${imc.toFixed(2)}</li>`,
        `<li><strong>Classificacao:</strong> ${classificacao}</li>`
    ];

    resultadoElemento.classList.remove('resultado-visivel');
    resultadoElemento.innerHTML = `<div class="resultado-text"><div class="resultado-titulo">IMC</div><ul class="resultado-lista">${imcLinhas.join('')}</ul></div>`;
    void resultadoElemento.offsetWidth;
    resultadoElemento.classList.add('resultado-visivel');
}

function calcularkcal() {
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value);
    const yo = parseFloat(document.getElementById('yo').value);
    const genero = document.getElementById('genero').value;
    const wl = document.getElementById('wl').value;
    const atividade = parseFloat(document.getElementById('atividade').value);
    const atividadeM = parseFloat(document.getElementById('atividadeM').value);
    const resultadoKcalElemento = document.getElementById('resultadoKcal');

    if (isNaN(weight) || isNaN(height) || isNaN(yo) || isNaN(atividade) || isNaN(atividadeM) || weight <= 0 || height <= 0 || yo <= 0 || atividade <= 0 || atividadeM <= 0) {
        alert("Por favor, insira valores positivos e validos para todos os campos.");
        resultadoKcalElemento.classList.remove('resultado-visivel');
        resultadoKcalElemento.textContent = '';
        return;
    }

    let tmb;
    if (genero === 'masculino') {
        tmb = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * yo);
    } else {
        tmb = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * yo);
    }

    const tmt = tmb * atividade;
    const macroP = atividadeM * weight;
    const macroG = 1 * weight;
    const macroPkcal = macroP * 4;
    const macroGkcal = macroG * 9;
    const macroResult = macroGkcal + macroPkcal;
    const macroRes = tmt - macroResult;
    const macroC = macroRes > 0 ? macroRes / 4 : 0;
    const macroCkcal = macroRes > 0 ? macroRes : 0;
    const superavit = tmt + 500;
    const deficit = tmt - 500;
    const sla = superavit - macroResult;
    const sla2 = deficit - macroResult;
    const carbo = sla / 4;
    const carboD = sla2 / 4;

    let titulo = 'Para manter o peso';
    let caloriasDia = tmt;
    let carboGramas = macroC;
    let carboKcal = macroCkcal;

    if (wl === 'p') {
        titulo = 'Para perder peso';
        caloriasDia = deficit;
        carboGramas = carboD;
        carboKcal = sla2;
    } else if (wl === 'g') {
        titulo = 'Para ganhar peso';
        caloriasDia = superavit;
        carboGramas = carbo;
        carboKcal = sla;
    }

    const linhas = [
        `<p class="resultado-linha destaque"><strong>${titulo}:</strong> ${caloriasDia.toFixed(0)} calorias/dia.</p>`,
        `<li>${macroP.toFixed(0)}g / ${macroPkcal.toFixed(0)}kcal de Proteina.</li>`,
        `<li>${macroG.toFixed(0)}g / ${macroGkcal.toFixed(0)}kcal de Gordura.</li>`,
        `<li>${carboGramas.toFixed(0)}g / ${carboKcal.toFixed(0)}kcal de Carboidratos.</li>`
    ];

    resultadoKcalElemento.classList.remove('resultado-visivel');
    resultadoKcalElemento.innerHTML = `<div class="resultado-text"><div class="resultado-titulo">Sugestao de consumo</div>${linhas[0]}<ul class="resultado-lista">${linhas.slice(1).join('')}</ul></div>`;
    void resultadoKcalElemento.offsetWidth;
    resultadoKcalElemento.classList.add('resultado-visivel');
}

function configurarTeclaEnter(idFormulario, idBotao) {
    const formulario = document.getElementById(idFormulario);
    const botao = document.getElementById(idBotao);

    if (formulario && botao) {
        const inputs = formulario.querySelectorAll('input, select');
        inputs.forEach(input => {
            input.addEventListener('keydown', function (event) {
                if (event.key === 'Enter') {
                    event.preventDefault();
                    botao.click();
                }
            });
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    configurarTeclaEnter('calcImc', 'botaoimc');
    configurarTeclaEnter('calcForm', 'botaokcal');
});
