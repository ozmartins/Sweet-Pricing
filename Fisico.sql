CREATE TABLE Usuario
(
    Codigo long PRIMARY KEY,
    Nome varchar(100),
    Email varchar(255),
    EmailConfirmado boolean
);

CREATE TABLE FichaCustoOutrosCustos
(
    Codigo bigint PRIMARY KEY,
    Quantidade numeric(10,2),
    UnidadeMedidaSistemaMetrico smallint,
    Descricao varchar(100),
    CustoTotal numeric(10,2),
    IdFichaCusto bigint
);

CREATE TABLE FichaCusto
(
    Codigo bigint PRIMARY KEY,
    DataHoraCalculo timestamp,
    CustoTotal numeric(10,2),
    IdProduto bigint
);

CREATE TABLE FichaCustoInsumo
(
    Codigo bigint PRIMARY KEY,
    Quantidade numeric(10,2),
    CustoTotal numeric(10,2),
    IdFichaCusto bigint,
    IdInsumo bigint
);

CREATE TABLE FichaKardex
(
    Codigo bigint PRIMARY KEY,
    Data timestamp,
    TipoMovimento smallint,
    Quantidade numeric(10,2),
    QuantidadeFinal numeric(10,2),
    ValorFinal numeric(10,2),
    IdInsumo bigint
);

CREATE TABLE FichaCustoOutrosCustos_Insumo
(
    IdFichaCustoOutrosCustos bigint,
    IdInsumo bigint
);