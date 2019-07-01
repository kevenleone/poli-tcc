# POLI-TCC

### Projeto criado como estudo de caso para TCC do curso de Ciência de Dados e Analytics do curso de Pós Graduação da Escola Politécnica de Pernambuco ( Poli - UPE ) 

Pergunta | Resposta | Detalhes
------------ | ------------- | -------------
Autor | Keven Leone dos Santos | ID: 0000-0003-1275-8719.
Orientadora | Andrêza Leite de Alencar | ID: 0000-0001-7125-812X.
Universidade | Escola Politécnica de Pernambuco (UPE)
Curso | Especialização em Ciência de Dados e Analytics
Início | Mar-2017
Término | Nov-2018
Defesa TCC | 31/05/2019
Email Autor | kls@ecomp.poli.br | keven.santos.sz@gmail.com

#### Modelo 1 - Modelagem Relacional Resumida
<center> 
<img alt='Modelo 1' src="https://raw.githubusercontent.com/kevenleone/poli-tcc/master/imgs/fig8.png" width="500" height="250" /> </center>


#### Modelo 2 - Modelagem Não Relacional (MongoDB)

<center> 
<img alt='Modelo 2' src="https://raw.githubusercontent.com/kevenleone/poli-tcc/master/imgs/fig7.png" width="500" height="450" /> </center>

#### Modelo 3 - Modelagem Chave-Valor (Redis)

<center> 
<img alt='Modelo 3' src="https://raw.githubusercontent.com/kevenleone/poli-tcc/master/imgs/fig9.png" width="500" height="250" /> </center>

Abaixo está descrito os resultados dos experimentos realizados com mais detalhes.

##	Experimentos e Resultados
<p align="justify">
    Alguns testes de desempenho foram realizados com a solução implementada. Para o processamento dos testes foi utilizada uma máquina com 16GBs de Memória RAM, processador I7 da 7º Geração, HD SSD e Windows 10 como sistema operacional.
</p>
<p align="justify">
Todos os testes foram efetuados 5 vezes para verificação das seguintes características: Consumo de Memória, CPU e tempo de execução das operações. Dessa forma é possível a realização dos testes em um processo de CRUD (Cadastro, leitura, atualização e remoção), de forma unitária ou em larga escala. 
</p>

<p align="justify">Os experimentos foram realizados em uma única máquina, de forma não distribuídas e cada teste pôde ser realizado utilizando uma massa de dados de quantidade variante, de acordo com o experimento. Cada experimento realizou um ou mais operações de CRUD, que estão descritas no título de cada figura e os experimentos foram realizados comparando o modelo poliglota com o relacional.
A massa de dados pode variar de acordo com o teste e estará melhor descrita em seus respectivos testes. </p>

<center> 
<img alt='Experimento 1' src="https://raw.githubusercontent.com/kevenleone/poli-tcc/master/imgs/fig1.png" width="500" height="250" /> </center>
<center> 1. Experimento - Médias do tempo de execução para cada operação de CRUD - Teste unitário (1 Registro).  </center>

Ambos os modelos apresentaram tempo de execução semelhantes e com resultados empatados em 2 testes cada.

As querys utilizadas no experimento 1:

*MongoDB*
```
    insert: db.sisati.funcionario.create({data}) 
    find: db.sisati.funcionario.find().limit(1)
    update: db.sisati.funcionario.update({data})
    delete: db.sisati.funcionario.deleteOne()
```

*SQL* 
```
    insert into funcionario (nome, senha, ua, telefone, email, cargo, setor, ativo) values (...)
    insert into aparelho (imei, modelo, chip, chip_ativado, numero, funcionarios_id) values (...)
    insert into computador (servicetag, modelo, tipo_ativo, funcionarios_id) values (...) 
    insert into voip (mac, modelo, tipo_ativo, numero, funcionarios_id values(...)
    insert into software (software, serial_key, expira) values (...)
    insert into ativos_tecnologicos (entrega, devolucao, funcionarios_id, equipamento, responsavel_entrega, responsavel_devolucao) values (...)

    select * from ativos_tecnologicos at 
    left join aparelho a on a.funcionario_id = at.funcionario_id
    left join computador c on c.funcionario_id = at.funcionario_id
    left join voip v on v.funcionario_id = at.funcionario_id
    left join software s on s.funcionario_id = at.funcionario_id
    left join funcionario f on f.id_funcionario = at.funcionario_id
    limit 1

    update funcionario set (nome, senha, ua, telefone, email, cargo, setor, ativo)
    update aparelho set (imei, modelo, chip, chip_ativado, numero, funcionarios_id)
    update computador set (servicetag, modelo, tipo_ativo, funcionarios_id) 
    update voip set (mac, modelo, tipo_ativo, numero, funcionarios_id values(...)
    update software set (software, serial_key, expira)
    update ativos_tecnologicos set (entrega, devolucao, funcionarios_id, equipamento, responsavel_entrega, responsavel_devolucao)

    delete from funcionario where funcionario_id = 1
    delete from aparelho where funcionario_id = 1
    delete from computador where funcionario_id = 1
    delete from voip where funcionario_id = 1
    delete from software where funcionario_id = 1
    delete from ativos_tecnologicos where funcionario_id = 1
```

<center> 
<img alt='Experimento 2' src="https://raw.githubusercontent.com/kevenleone/poli-tcc/master/imgs/fig2.png" width="500" height="250" /> </center>
<center> 2.Experimento - Médias do tempo de execução para cada operação de CRUD – Massa com 100.000 Registros.</center>

<p>
No experimento 2 a discrepância no tempo gasto para execução do teste foi maior. Com exceção da leitura, o SQL levou tempo maior em todas as operações realizadas. 
</p>

<p align='justify'>
No cadastro, o tempo médio para inserção dos dados do SQL chegou até 3 vezes mais tempo que o modelo Poliglota. 

> As querys utilizadas no experimento 2 está presente nos experimentos 5 e 6.

Devido a esta grande diferença, foram realizados os testes presentes nos experimentos 3 e 4. Nestes, foi medido o tempo gasto para o cadastro dos dados em diferentes quantitativos de registros, de 100 até 1 milhão, onde cada “K” representa mil registros e “KK” milhão de registros. O eixo X representa o número de registros processados e no Y o tempo gasto. </p>
<center> 
<img alt='Experimento 3' src="https://raw.githubusercontent.com/kevenleone/poli-tcc/master/imgs/fig3.png" width="500" height="250" /> </center>
<center> 3. Experimento - Médias do tempo de execução para cada operação de cadastro.</center>

<p align='justify'>
Durante a realização do teste do experimento 3 foi utilizado o modelo relacional proposto na modelo 1, o modelo poliglota obteve melhor tempo na execução do cadastro, comparado ao SQL, durante a realização do teste o modelo relacional chegou a durar o triplo do tempo para execução da mesma tarefa no modelo poliglota.
</p>

*MongoDB*
```
    insert: db.sisati.funcionario.create({data}) 
    find: db.sisati.funcionario.find().limit(valor) (considere valor entre 100 a 1000000)
    update: db.sisati.funcionario.update({data})
    delete: db.sisati.funcionario.delete({id_funcionario: {lte: valor}}) (considere valor entre 100 a 1000000)
```
*SQL* 
```
    insert into funcionario (nome, senha, ua, telefone, email, cargo, setor, ativo) values (...)
    insert into aparelho (imei, modelo, chip, chip_ativado, numero, funcionarios_id) values (...)
    insert into computador (servicetag, modelo, tipo_ativo, funcionarios_id) values (...) 
    insert into voip (mac, modelo, tipo_ativo, numero, funcionarios_id values(...)
    insert into software (software, serial_key, expira) values (...)
    insert into ativos_tecnologicos (entrega, devolucao, funcionarios_id, equipamento, responsavel_entrega, responsavel_devolucao) values (...)

    select * from ativos_tecnologicos at 
    left join aparelho a on a.funcionario_id = at.funcionario_id
    left join computador c on c.funcionario_id = at.funcionario_id
    left join voip v on v.funcionario_id = at.funcionario_id
    left join software s on s.funcionario_id = at.funcionario_id
    left join funcionario f on f.id_funcionario = at.funcionario_id
    limit valor (considere valor entre 100 a 1000000)

    update funcionario set (nome, senha, ua, telefone, email, cargo, setor, ativo)
    update aparelho set (imei, modelo, chip, chip_ativado, numero, funcionarios_id) where funcionario_id <= valor (considere valor entre 100 a 1000000) 
    update computador set (servicetag, modelo, tipo_ativo, funcionarios_id) where funcionario_id <= valor (considere valor entre 100 a 1000000)
    update voip set (mac, modelo, tipo_ativo, numero, funcionarios_id) where funcionario_id <= valor (considere valor entre 100 a 1000000)
    update software set (software, serial_key, expira) where funcionario_id <= valor (considere valor entre 100 a 1000000)
    update ativos_tecnologicos set (entrega, devolucao, funcionarios_id, equipamento, responsavel_entrega, responsavel_devolucao) where funcionario_id <= valor (considere valor entre 100 a 1000000)

    delete from funcionario where funcionario_id <= valor (considere valor entre 100 a 1000000)
    delete from aparelho where funcionario_id <= valor (considere valor entre 100 a 1000000)
    delete from computador where funcionario_id <= valor (considere valor entre 100 a 1000000)
    delete from voip where funcionario_id <= valor (considere valor entre 100 a 1000000)
    delete from software where funcionario_id <= valor (considere valor entre 100 a 1000000)
    delete from ativos_tecnologicos where funcionario_id <= valor (considere valor entre 100 a 1000000)
```
<center> 
<img alt='Experimento 4' src="https://raw.githubusercontent.com/kevenleone/poli-tcc/master/imgs/fig4.png" width="500" height="250" /> </center>
<center>
4. Experimento - Médias do tempo de execução para cada operação de cadastro simples.
</center>

<p align='justify'>
O experimento 4 foi realizado com um cadastro simples, que utiliza apenas a tabela de funcionários como mostra a Figura 0 e, no poliglota desconsidera as listas e Arrays de ativos tecnológicos, endereço, acompanhamentos e anexos de ativos tecnológicos que foram utilizados no teste passado (experimento 3). 
</p>
<p align='justify'>
O modelo poliglota apresentou melhor resultado levando menos tempo para execução do teste em diferentes níveis de registros.
</p>

> Os scripts utilizados (SQL e Poliglota) são o mesmo do experimento 3, com a diferença a estrutura de dados utilizada, o experimento 4 utilizou apenas a tabela de funcionário (observe o modelo 1) no SQL e no Poliglota o modelo 2, utilizando apenas o dado primário (o que estão fora dos arrays e objetos).

Além do tempo, foi verificado o consumo de Memória RAM e de CPU dos bancos de dados durante a execução das operações de CRUD utilizando **100.000 registros**, como ilustrado nos experimentos 5 e 6.

<center> 
<img alt='Experimento 5' src="https://raw.githubusercontent.com/kevenleone/poli-tcc/master/imgs/fig5.png" width="500" height="250" /> </center>
<center> 5. Experimento - Recursos de Hardware (CPU).</center>

O consumo de CPU foi moderado e baixo durante os testes, destacando o maior consumo de CPU na operação de leitura e remoção de dados, o resultado do teste ficou empatado, cada modelo se destacou no menor consumo de CPU por 2 vezes cada.

<center> 
<img alt='Experimento 6' src="https://raw.githubusercontent.com/kevenleone/poli-tcc/master/imgs/fig6.png" width="500" height="250" /> </center>
<center> 6. Experimento - Recursos de Hardware (RAM).</center>

<p>

No experimento 6 o modelo Poliglota consumiu mais memória RAM que o SQL em todos as operações, o consumo de memória do SQL foi estável com pouca oscilação, diferente do modelo poliglota que o consumo de memória variou em mais de 100 MBs em uma das operações. 

Os indicadores de desempenho podem variar por alguns fatores, dentre eles Hardware, infraestrutura, base de dados, estrutura dos dados e outros detalhes, um fator que pode explicar essa diferença na execução das operações em diferentes modelos pode ser a forma que cada banco estrutura suas informações, como também as engines utilizadas no SQL e Poliglota que podem não ser a mais otimizada para execução das operações mencionadas em grande escala. 
</p>

Querys utilizadas nos experimento 2, 5 e 6:

*MongoDB*
```
    insert: db.sisati.funcionario.create({data}) 
    find: db.sisati.funcionario.find().limit(100000)
    update: db.sisati.funcionario.update({data})
    delete: db.sisati.funcionario.deleteAll()
```
*SQL* 
```
    insert into funcionario (nome, senha, ua, telefone, email, cargo, setor, ativo) values (...)
    insert into aparelho (imei, modelo, chip, chip_ativado, numero, funcionarios_id) values (...)
    insert into computador (servicetag, modelo, tipo_ativo, funcionarios_id) values (...) 
    insert into voip (mac, modelo, tipo_ativo, numero, funcionarios_id values(...)
    insert into software (software, serial_key, expira) values (...)
    insert into ativos_tecnologicos (entrega, devolucao, funcionarios_id, equipamento, responsavel_entrega, responsavel_devolucao) values (...)

    select * from ativos_tecnologicos at 
    left join aparelho a on a.funcionario_id = at.funcionario_id
    left join computador c on c.funcionario_id = at.funcionario_id
    left join voip v on v.funcionario_id = at.funcionario_id
    left join software s on s.funcionario_id = at.funcionario_id
    left join funcionario f on f.id_funcionario = at.funcionario_id
    limit 100000

    update funcionario set (nome, senha, ua, telefone, email, cargo, setor, ativo)
    update aparelho set (imei, modelo, chip, chip_ativado, numero, funcionarios_id) where funcionario_id <= 100000 
    update computador set (servicetag, modelo, tipo_ativo, funcionarios_id) where funcionario_id <= 100000
    update voip set (mac, modelo, tipo_ativo, numero, funcionarios_id) where funcionario_id <= 100000
    update software set (software, serial_key, expira) where funcionario_id <= 100000
    update ativos_tecnologicos set (entrega, devolucao, funcionarios_id, equipamento, responsavel_entrega, responsavel_devolucao) where funcionario_id <= 100000

    delete from funcionario where funcionario_id <= 100000
    delete from aparelho where funcionario_id <= 100000
    delete from computador where funcionario_id <= 100000
    delete from voip where funcionario_id <= 100000
    delete from software where funcionario_id <= 100000
    delete from ativos_tecnologicos where funcionario_id <= 100000
```

> OBS.1 nas querys do SQL considere os valores dos inserts e update valores aleatórios de acordo com o modelo proposto do modelo 1.

> OBS.2: Nas querys do MongoDB considere a variável "data" como um objeto formato Json contendo a estrutura de dados proposta na fígura do modelo 2, de valor aleatório, que é gerada pelo script do arquivo Job.js"

> OBS3.: Os testes poliglota se referem a MongoDB e Redis, porém como o tempo de execução das operações de CRUD no Redis leva cerca de milissegundos a poucos segundos suas operações não foram descritas no texto, porém seus valores foram contabilizados nos valores atribuidos aos experimentos. O modelo referido é o 3.

## Considerações Finais
<p>
Este artigo teve como objetivo conhecer a persistência poliglota e como esta pode ser empregada em projetos de pequeno a grande porte. Compatível com a maioria das linguagens de programação do mercado, esse modelo pode ser utilizado com diferentes bancos de dados no desenvolvimento de software.
</p>

<p>
A análise apresenta uma possibilidade diferente de lidar com o desenvolvimento de sistemas voltadas aos dias atuais, com a grande variância das informações os bancos de dados não relacionais podem ser agregados em diversas etapas de um sistema de informação. </p>

<p>
Este trabalho pode auxiliar na tomada de decisão de desenvolvedores e administradores de sistemas que pretendem realizar migração de um modelo de dados homogêneo para a persistência poliglota para atender necessidades específicas.
</p>