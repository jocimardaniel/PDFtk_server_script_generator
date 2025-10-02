// Elementos da área de saída
const outputArea = document.getElementById('output-area');
const scriptOutput = document.getElementById('script-output');
const copyButton = document.getElementById('copy-button');
const downloadButton = document.getElementById('download-button');

// Função genérica para exibir o script gerado
function displayScript(scriptContent) {
    scriptOutput.textContent = scriptContent;
    outputArea.classList.remove('hidden');
}

// 1. Gerar Script de Junção (Merge)
function generateMergeScript() {
    const files = document.getElementById('merge-files').value.trim().split('\n').map(f => `"${f}"`).join(' ');
    const output = `"${document.getElementById('merge-output').value}"`;

    if (!files || !output) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    const script = `@echo off
echo Juntando arquivos...
pdftk ${files} cat output ${output}
echo.
echo Processo concluido! O arquivo ${output} foi criado.
pause`;
    displayScript(script);
}

// 2. Gerar Script de Extração de Páginas (VERSÃO CORRIGIDA FINAL)
function generateExtractScript() {
    const input = `"${document.getElementById('extract-input').value}"`;
    const rangeInput = document.getElementById('extract-range').value;
    const output = `"${document.getElementById('extract-output').value}"`;

    if (input === '""' || !rangeInput || output === '""') {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    // ================== INÍCIO DA CORREÇÃO ==================

    // 1. Substitui todas as vírgulas por espaços e normaliza os espaços múltiplos.
    // Exemplo: "1-2, 5, 10-end" se torna "1-2 5 10-end"
    const range = rangeInput.replace(/,/g, ' ').replace(/\s+/g, ' ').trim();

    // 2. A verificação de erro (IF ERRORLEVEL) continua para dar feedback preciso.
    const script = `@echo off
echo Extraindo paginas "${range}" de ${input}...
pdftk ${input} cat ${range} output ${output}

IF ERRORLEVEL 1 (
    echo.
    echo ERRO: Falha ao extrair as paginas. Verifique se o intervalo "${rangeInput}" e valido.
) ELSE (
    echo.
    echo Processo concluido! O arquivo ${output} foi criado com sucesso.
)

pause`;
    // ==================== FIM DA CORREÇÃO ====================

    displayScript(script);
}

// 3. Gerar Script de Divisão a cada X páginas (ABORDAGEM FINAL COM SUB-ROTINA)
function generateChunkSplitScript() {
    const inputFile = document.getElementById('split-chunk-input').value;
    const chunkSize = Math.abs(parseInt(document.getElementById('split-chunk-size').value, 10) || 1);
    const prefix = document.getElementById('split-chunk-prefix').value;
    const totalPages = parseInt(document.getElementById('total-pages').value, 10);

    if (!inputFile || isNaN(chunkSize) || !prefix || isNaN(totalPages)) {
        alert("Por favor, preencha todos os campos corretamente.");
        return;
    }

    let script = '';

    if (chunkSize >= totalPages) {
        script = `@echo off
SET "INPUT_FILE=${inputFile}"
SET "PREFIX=${prefix}"
SET "OUTPUT_FILE=%PREFIX%1.pdf"
echo O tamanho do pedaco e maior ou igual ao total de paginas.
echo Criando um unico arquivo de saida...
pdftk "%INPUT_FILE%" cat 1-end output "%OUTPUT_FILE%"
echo.
echo Processo concluido! Arquivo "%OUTPUT_FILE%" criado.
pause`;
    } else {
        // Lógica de loop reescrita para usar uma sub-rotina, evitando blocos DO (...)
        script = `@echo off
SETLOCAL ENABLEDELAYEDEXPANSION
SET "INPUT_FILE=${inputFile}"
SET "PREFIX=${prefix}"
SET "CHUNK_SIZE=${chunkSize}"
SET "TOTAL_PAGES=${totalPages}"
SET "COUNT=1"

echo Dividindo "%INPUT_FILE%" em partes de %CHUNK_SIZE% paginas...
SET /A NUM_FILES=(%TOTAL_PAGES% + %CHUNK_SIZE% - 1) / %CHUNK_SIZE%

REM --- Loop principal que chama a sub-rotina para cada pedaco ---
FOR /L %%i IN (1, %CHUNK_SIZE%, %TOTAL_PAGES%) DO CALL :PROCESS_CHUNK %%i

echo.
echo Processo concluido!
GOTO :END

:PROCESS_CHUNK
SET "START_PAGE=%1"
SET /A "END_PAGE=%START_PAGE% + %CHUNK_SIZE% - 1"
IF %END_PAGE% GTR %TOTAL_PAGES% SET "END_PAGE=%TOTAL_PAGES%"

SET "OUTPUT_FILE=!PREFIX!!COUNT!.pdf"
echo Gerando parte !COUNT! de %NUM_FILES% (Paginas %START_PAGE%-%END_PAGE%)...
pdftk "%INPUT_FILE%" cat %START_PAGE%-%END_PAGE% output "!OUTPUT_FILE!"

SET /A COUNT+=1
GOTO :EOF

:END
pause`;
    }

    displayScript(script);
}


// 4. Gerar Script de Burst (dividir em páginas únicas) (VERSÃO CORRIGIDA)
function generateBurstScript() {
    const input = `"${document.getElementById('burst-input').value}"`;
    const prefix = document.getElementById('burst-prefix').value;

    if (input === '""' || !prefix) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    // ================== INÍCIO DAS CORREÇÕES ==================

    // 1. O sinal de porcentagem (%) deve ser duplicado (%%) para funcionar dentro de um arquivo .bat
    const output = `"${prefix}%%02d.pdf"`;

    // 2. Adiciona verificação de erro (IF ERRORLEVEL) para feedback preciso.
    const script = `@echo off
echo Dividindo ${input} em paginas unicas...
pdftk ${input} burst output ${output}

IF ERRORLEVEL 1 (
    echo.
    echo ERRO: Falha ao dividir o arquivo.
) ELSE (
    echo.
    echo Processo concluido! Arquivos gerados com o prefixo "${prefix}".
)

pause`;
    // ==================== FIM DAS CORREÇÕES ====================
    
    displayScript(script);
}

// 5. Gerar Script de Rotação
function generateRotateScript() {
    const input = `"${document.getElementById('rotate-input').value}"`;
    const range = document.getElementById('rotate-range').value;
    const direction = document.getElementById('rotate-direction').value;
    const output = `"${document.getElementById('rotate-output').value}"`;

    if (input === '""' || !range || !direction || output === '""') {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    const script = `@echo off
echo Rotacionando as paginas ${range} de ${input}...
pdftk ${input} cat ${range}${direction} output ${output}
echo.
echo Processo concluido! O arquivo ${output} foi criado.
pause`;
    displayScript(script);
}

// Funcionalidade dos botões de Copiar e Download
copyButton.addEventListener('click', () => {
    navigator.clipboard.writeText(scriptOutput.textContent).then(() => {
        copyButton.textContent = 'Copiado!';
        setTimeout(() => {
            copyButton.textContent = 'Copiar para Área de Transferência';
        }, 2000);
    });
});

downloadButton.addEventListener('click', () => {
    const scriptContent = scriptOutput.textContent;
    const blob = new Blob([scriptContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'executar_pdftk.bat';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
});