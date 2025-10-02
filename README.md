# PDFtk_server_script_generator

1. Instalar o .exe da pasta Instalador: pdftk_server-2.02-win-setup.exe

2. Para manipular um arquivo .pdf o usuário deverá estar dentro da pasta do arquivo.

3. Operações:

    3.1 Dividir o arquivo por páginas:
    Comando: pdftk nomedoarquivo.pdf burst

    3.2 Dividir o arquivo por um número especifico de páginas:
    Comando: pdftk nomedoarquivo.pdf cat 1-5 output parte_01.pdf

    Nesse caso o usuário pode criar um .bat e dividir o arquivo inteiro usando script.
    Ex. para um arquivo de 10 páginas:
    Criar um arquivo chamado dividir.bat e dentro do arquivo os comandos:
    pdftk ArquivoOrginal_10pag.pdf cat 1-5 output parte_01.pdf
    pdftk ArquivoOrginal_10pag.pdf cat 6-10 output parte_02.pdf
    Execuar o .bat e o arquivo será dividido.
    

    3.3 Juntar vários arquivos em um único:
    Comando: pdftk *.pdf cat output combined.pdf (combina todos os arquivos no diretório em um único pdf)
    ou
    Comando: pdftk parte_01.pdf parte_02.pdf cat output combined.pdf (combina somente os arquivos necessários em um único pdf)

Para mais opções de manipulação de arquivo pdf consultar o manual do pdftk em:
https://www.pdflabs.com/docs/pdftk-cli-examples/
