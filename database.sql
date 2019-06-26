create table aparelhos (
	id_aparelhos int primary key auto_increment,
	imei varchar(255),
    modelo varchar(255),
    chip_ativado varchar(255),
    chip varchar(255),
    numero varchar(255), 
    funcionarios_id varchar(255)
);

create table computador (
	id_computador int primary key auto_increment,
	servicetag varchar(255),
    modelo varchar(255),
    tipo_ativo varchar(255),
    funcionarios_id int
);

create table voip (
	id_voip int primary key auto_increment,
	mac varchar(255),
    modelo varchar(255),
    tipo_ativo varchar(255),
	numero varchar(255), 
    funcionarios_id int
);

create table software (
	id_software int primary key auto_increment,
	software varchar(255),
    serial_key varchar(255),
    expira varchar(255),
    funcionarios_id int
);

create table ativos_tecnologicos (
	id_ativos_tecnologicos int primary key auto_increment,
	entrega date,
    devolucao date,
	aparelho_id int,
    computador_id int,
    voip_id int,
    software_id int,
    funcionarios_id int,
    acompanhamentos_id int,
	responsavel_entrega varchar(255),
	responsavel_devolucao varchar(255)
);

create table funcionario (
	id_funcionario int primary key auto_increment,
    nome varchar(255),
    senha varchar(255),
	ua varchar(255),
	ue varchar(255),
	telefone varchar(255),
	email varchar(255), 
	cargo varchar(255),
    setor varchar(255),
	ativo int
)


