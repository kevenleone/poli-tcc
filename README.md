# POLI-TCC

### Projeto criado como estudo de caso para TCC do curso de Ciência de Dados e Analytics do curso de Pós Graduação da Escola Politécnica de Pernambuco ( Poli - UPE ) 

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

![Experimento 1](https://raw.githubusercontent.com/kevenleone/poli-tcc/master/imgs/fig1.png)
<center> Médias do tempo de execução para cada operação de CRUD - Teste unitário (1 Registro).  </center>

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

![Experimento 2](https://raw.githubusercontent.com/kevenleone/poli-tcc/master/imgs/fig2.png)
<center> Médias do tempo de execução para cada operação de CRUD – Massa com 100.000 Registros.</center>

<p>
No teste realizado da figura 2 a discrepância no tempo gasto para execução do teste foi maior. Com exceção da leitura, o SQL levou tempo maior em todas as operações realizadas. 
</p>

<p align='justify'>
No cadastro, o tempo médio para inserção dos dados do SQL chegou até 3 vezes mais tempo que o modelo Poliglota. 

As querys utilizadas no experimento 2:

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
Devido a esta grande diferença, foram realizados os testes presentes nas Figuras 9 e 10. Nestes, foi medido o tempo gasto para o cadastro dos dados em diferentes quantitativos de registros, de 100 até 1 milhão, onde cada “K” representa mil registros e “KK” milhão de registros. O eixo X representa o número de registros processados e no Y o tempo gasto. </p>

![Experimento 3](https://raw.githubusercontent.com/kevenleone/poli-tcc/master/imgs/fig3.png)
<center> Médias do tempo de execução para cada operação de cadastro.</center>

<p align='justify'>
Durante a realização do teste da figura 3 foi utilizado o modelo relacional proposto na figura 0, o modelo poliglota obteve melhor tempo na execução do cadastro, comparado ao SQL, durante a realização do teste o modelo relacional chegou a durar o triplo do tempo para execução da mesma tarefa no modelo poliglota.
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

![Experimento 4](https://raw.githubusercontent.com/kevenleone/poli-tcc/master/imgs/fig4.png)
<center> Médias do tempo de execução para cada operação de cadastro simples.</center>

<p align='justify'>
O teste da Figura 4 foi realizado com um cadastro simples, que utiliza apenas a tabela de funcionários como mostra a Figura 0 e, no poliglota desconsidera as listas e Arrays de ativos tecnológicos, endereço, acompanhamentos e anexos de ativos tecnológicos que foram utilizados no teste passado (figura 3). 
</p>
<p align='justify'>
O modelo poliglota apresentou melhor resultado levando menos tempo para execução do teste em diferentes níveis de registros.
</p>

> Os scripts utilizados (SQL e Poliglota) são o mesmo do experimento 3, com a diferença a estrutura de dados;