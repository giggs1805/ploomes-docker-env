# README

## ABOUT 

O projeto consiste em um jogo de coletar um time de Pokemons baseado em geração aleatória. O usuário deve registrar seu nome de treinador e dentro de um número de tentativas definido, obter até 6 (seis) monstros. Este projeto roda em 4 containers diferentes, sendo eles, em ordem de dependência:

1. O algoritmo de escolha aleatória de um pokemon dentro das possibilidades, em Python Flask. O algoritmo retorna uma coleção em JSON que é mostrada na tela, com as informações do monstro sorteado;
2. O banco de dados, em MongoDB, que guarda o registro de cada treinador e seus monstros capturados;
3. A API, em Node, interpreta e processa as requisições vindas do frontend, como registro de treinador e registro de uma nova captura, as envia ao banco de dados e retorna ok;
4. O frontend, usando Node Express, mostrando a tela principal da aplicação, a partir dela se pode enviar requisições tanto para o algortimo em python (1) quanto para o banco de  dados (2), que são tratados pela API (3).

As dependências do projeto são:
a. O algoritmo em Python é independente de qualquer outro container;
b. O banco de dados em MongoDB é independente de qualquer outro container;
c. A API em Node é dependente do banco de dados estar rodando;
d. O Frontend é dependente da API em Node e, por consequência, do banco de dados.




# COMO EXECUTAR O AMBIENTE

## Variáveis de Ambiente

As imagens Docker presentes no projeto necessitam receber informações sensíveis, como endereços e senhas através de um arquivo ```.env```. O projeto contém um arquivo exemplo, ```.env.example``` que contém os valores utilizados durante a etapa de desenvolvimento. Estes valores estão testados para que o ambiente funcione corretamente e podem ser usados na criação das imagens.

## Linux ou WSL

As operações necessárias estão todas contidas em arquivos bash (.sh). Em sistemas operacionais Linux é possível ter todo o sistema rodando em apenas dois comandos de terminal.
Para isso, os arquivos 'build_image.sh', 'run_stack.sh' e 'clean_stack.sh' devem possuir permissão para execução. Isto pode ser feito abrindo um terminal na pasta raiz do projeto ou, usando o comando ```cd [pasta]``` para se deslocar até a pasta raiz do projeto. Usando o comando ```chmod +x [nome_do_arquivo]``` habilitará permissão de execução.
Com o comando ```./build_image.sh```, as imagens dos containers: Python Flask, Node API e Node Express serão criadas.
Após o fim da criação das imagens, o comando ```./run_stack.sh``` pode ser executado.
Este script também cria a rede em docker necessária para conectar os containers interdependentes e também obtém a imagem Docker em mongo para executar o banco de dado.
Ao final da utilização do ambiente, a rede e as imagens Docker criadas no processo podem ser removidas usando o script ```./clean_stack.sh```




## Windows

No sistema operacional Windows, as instruções devem ser executadas uma a uma, na past raiz do projeto, na seguinte ordem, utilizando Power Shell:
1. No arquivo ```build_images.sh``` execute uma instrução por vez até a terceira;
2. No arquivo ```run_stack.sh``` execute a instrução ```docker network...```;
3. As instruções seguintes que possuem um ou mais campos ```${PROJECT_PATH}``` devem ser substituídos por ```$(pwd)``` para evitar o direcionamento errôneo das pastas.




# USO

Toda a interatividade do projeto ocorre no frontend, acessado pelo endereço ```http://127.0.0.1:3000``` ou ```http://localhost:3000```, a interface é simples e contém 3 botões.
O primeiro passo é registrar um treinador, no botão ```[Register Trainer]```. Feito o registrado, é possível obter um monstro aleatório com o botão ```[New Pokemon]```. 
O monstro sorteado possui diversos atributos, como Ataque, Defesa, Velocidade e até dois tipos de Elementos. Quanto maior o valor numérico ```[Total]```, mais forte é o Pokemon. Este monstro pode ser capturado com o botão abaixo ```[Add to Team]```.
O número máximo de monstros que o usuário pode capturar é 6. Capturando um monstro faz com que seja feita uma nova requisição de pokemon, impedindo que o usuário faça uma equipe com 6 monstros iguais.




## Observações

- Devido ao limite de tempo, o log dos monstros capturados pode ser observado pelo console da pagina da aplicação, acessível pelo botão F12 no navegador.
- O projeto contém um arquivo ```docker-compose``` que foi utilizado durante a etapa de desenvolvimento e, então, adaptado para ser executado sem esta dependência.
- O arquivo de variaveis de ambiente presente na pasta raiz do projeto, junto ao arquivo ```docker-compose``` pode ser utilizado para criar o ambiente com a adição de uma interface para o banco de dados, accessível pelo endereço ```http://localhost:8081```. Lá é possível ver os treinadores salvos e seus monstros capturados.
- O escopo do projeto tomou proporções um pouco maiores do que o esperado e, portanto, algumas funcionalidades que estavam parcialmente prontas acabaram em estado de pendência.
- O que seria desenvolvimento de sistemas sem imprevistos? ¯\\\_(ツ)\_/¯
- O trabalho aqui desenvolvido não possui fins lucrativos. Por favor Nintendo não me processa.