# PDFtk_server_script_generator

<ol>
  <li>Instalar o .exe da pasta Instalador: pdftk_server-2.02-win-setup.exe</li>
  <li>Para manipular um arquivo .pdf o usuário deverá estar dentro da pasta do arquivo.</li>
  <li>Operações:</li>
  <ol>
      <li>Dividir o arquivo por páginas:</li>
      <code>pdftk nomedoarquivo.pdf burst</code>
      <li>Dividir o arquivo por um número especifico de páginas:</li>
      <code>pdftk nomedoarquivo.pdf cat 1-5 output parte_01.pdf</code>
      <li>Dividir o arquivo por um número especifico de páginas:</li>
      <code>pdftk nomedoarquivo.pdf cat 1-5 output parte_01.pdf</code>
      <p>Nesse caso o usuário pode criar um .bat e dividir o arquivo inteiro usando script.</p>
      <p>Ex. para um arquivo de 10 páginas:</p>
      <p>Criar um arquivo chamado dividir.bat e dentro do arquivo os comandos:</p>
      <code>pdftk ArquivoOrginal_10pag.pdf cat 1-5 output parte_01.pdf
    pdftk ArquivoOrginal_10pag.pdf cat 6-10 output parte_02.pdf</code>
      <p>Execuar o .bat e o arquivo será dividido.</p>
      <li>Juntar vários arquivos em um único:</li>
      <code>pdftk *.pdf cat output combined.pdf</code><p>(combina todos os arquivos no diretório em um único pdf)</p>
      <p>ou</p>
      <code>pdftk parte_01.pdf parte_02.pdf cat output combined.pdf</code><p>(combina somente os arquivos necessários em um único pdf)</p>
    </ol>
</ol>

<p>Para mais opções de manipulação de arquivo pdf consultar o manual do pdftk em:</p>
<https://www.pdflabs.com/docs/pdftk-cli-examples/>
