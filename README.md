Claro, aqui está o texto formatado em Markdown:

# Manual Básico - PDFtk Server

1.  **Instalar o .exe da pasta `Instalador`:**
    `pdftk_server-2.02-win-setup.exe`

2.  **Para manipular um arquivo `.pdf` o usuário deverá estar dentro da pasta do arquivo.**

3.  **Operações:**

    3.1. **Dividir o arquivo por páginas (Burst):**

      * **Comando:**
        ```bash
        pdftk nomedoarquivo.pdf burst
        ```

    3.2. **Dividir o arquivo por um número específico de páginas:**

      * **Comando:**
        ```bash
        pdftk nomedoarquivo.pdf cat 1-5 output parte_01.pdf
        ```
      * Nesse caso, o usuário pode criar um arquivo `.bat` para dividir o arquivo inteiro usando um script.
      * **Exemplo para um arquivo de 10 páginas:**
          * Criar um arquivo chamado `dividir.bat` e, dentro do arquivo, inserir os seguintes comandos:
            ```bat
            pdftk ArquivoOrginal_10pag.pdf cat 1-5 output parte_01.pdf
            pdftk ArquivoOrginal_10pag.pdf cat 6-10 output parte_02.pdf
            ```
          * Executar o `.bat` e o arquivo será dividido.

    3.3. **Juntar vários arquivos em um único:**

      * **Comando (combina todos os arquivos .pdf no diretório):**
        ```bash
        pdftk *.pdf cat output combined.pdf
        ```
      * **ou Comando (combina somente os arquivos especificados):**
        ```bash
        pdftk parte_01.pdf parte_02.pdf cat output combined.pdf
        ```

-----

Para mais opções de manipulação de arquivos PDF, consulte o manual do PDFtk em:
[https://www.pdflabs.com/docs/pdftk-cli-examples/](https://www.pdflabs.com/docs/pdftk-cli-examples/)
