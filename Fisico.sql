CREATE TABLE Usuario (
    Codigo long PRIMARY KEY,
    Nome varchar(100),
    Email varchar(255),
    EmailConfirmado boolean
);

CREATE TABLE Receita (
    Codigo bigint PRIMARY KEY,
    Nome varchar(100),
    Rendimento int,
    TempoPreparoEmMinutos int
);

CREATE TABLE Insumo (
    Codigo bigint PRIMARY KEY,
    Nome varchar(100),
    UltimoCusto numeric(10,2)
);

CREATE TABLE Compra (
    Codigo bigint PRIMARY KEY,
    DataHora timestamp,
    Total numeric(10,2),
    IdFornecedor bigint
);

CREATE TABLE CompraItem (
    Codigo bigint PRIMARY KEY,
    Quantidade numeric(10,2),
    UnidadeMedidaSistemaMetrico smallint,
    Total numeric(10,2),
    IdInsumo bigint,
    IdCompra bigint
);

CREATE TABLE Ingrediente (
    Codigo bigint PRIMARY KEY,
    Quantidade numeric(10,2),
    UnidadeMedidaCulinaria smallint,
    UnidadeMedidaSistemaMetrico smallint,
    IdReceita bigint,
    IdInsumo bigint
);

CREATE TABLE Produto (
    Codigo bigint PRIMARY KEY,
    Nome varchar(100),
    Preco 8,2,
    IdReceita bigint
);

CREATE TABLE FichaCustoOutrosCustos (
    Codigo bigint PRIMARY KEY,
    Quantidade numeric(10,2),
    UnidadeMedidaSistemaMetrico smallint,
    Descricao varchar(100),
    CustoTotal numeric(10,2),
    IdFichaCusto bigint
);

CREATE TABLE Fornecedor (
    Codigo bigint PRIMARY KEY,
    Nome varchar(100)
);

CREATE TABLE FichaCusto (
    Codigo bigint PRIMARY KEY,
    DataHoraCalculo timestamp,
    CustoTotal numeric(10,2),
    IdProduto bigint
);

CREATE TABLE FichaCustoInsumo (
    Codigo bigint PRIMARY KEY,
    Quantidade numeric(10,2),
    CustoTotal numeric(10,2),
    IdFichaCusto bigint,
    IdInsumo bigint
);

CREATE TABLE FichaKardex (
    Codigo bigint PRIMARY KEY,
    Data timestamp,
    TipoMovimento smallint,
    Quantidade numeric(10,2),
    QuantidadeFinal numeric(10,2),
    ValorFinal numeric(10,2),
    IdInsumo bigint
);

CREATE TABLE FichaCustoOutrosCustos_Insumo (
    IdFichaCustoOutrosCustos bigint,
    IdInsumo bigint
);
 
ALTER TABLE Compra ADD CONSTRAINT FK_Compra_2
    FOREIGN KEY (IdFornecedor)
    REFERENCES Fornecedor (Codigo)
    ON DELETE CASCADE;
 
ALTER TABLE CompraItem ADD CONSTRAINT FK_CompraItem_2
    FOREIGN KEY (IdInsumo)
    REFERENCES Insumo (Codigo)
    ON DELETE CASCADE;
 
ALTER TABLE CompraItem ADD CONSTRAINT FK_CompraItem_3
    FOREIGN KEY (IdCompra)
    REFERENCES Compra (Codigo)
    ON DELETE CASCADE;
 
ALTER TABLE Ingrediente ADD CONSTRAINT FK_Ingrediente_2
    FOREIGN KEY (IdReceita)
    REFERENCES Receita (Codigo)
    ON DELETE CASCADE;
 
ALTER TABLE Ingrediente ADD CONSTRAINT FK_Ingrediente_3
    FOREIGN KEY (IdInsumo)
    REFERENCES Insumo (Codigo)
    ON DELETE CASCADE;
 
ALTER TABLE Produto ADD CONSTRAINT FK_Produto_2
    FOREIGN KEY (IdReceita)
    REFERENCES Receita (Codigo)
    ON DELETE CASCADE;
 
ALTER TABLE FichaCustoOutrosCustos ADD CONSTRAINT FK_FichaCustoOutrosCustos_2
    FOREIGN KEY (IdFichaCusto)
    REFERENCES FichaCusto (Codigo)
    ON DELETE CASCADE;
 
ALTER TABLE FichaCusto ADD CONSTRAINT FK_FichaCusto_2
    FOREIGN KEY (IdProduto)
    REFERENCES Produto (Codigo)
    ON DELETE CASCADE;
 
ALTER TABLE FichaCustoInsumo ADD CONSTRAINT FK_FichaCustoInsumo_2
    FOREIGN KEY (IdFichaCusto)
    REFERENCES FichaCusto (Codigo)
    ON DELETE CASCADE;
 
ALTER TABLE FichaCustoInsumo ADD CONSTRAINT FK_FichaCustoInsumo_3
    FOREIGN KEY (IdInsumo)
    REFERENCES Insumo (Codigo)
    ON DELETE CASCADE;
 
ALTER TABLE FichaKardex ADD CONSTRAINT FK_FichaKardex_2
    FOREIGN KEY (IdInsumo)
    REFERENCES Insumo (Codigo)
    ON DELETE CASCADE;
 
ALTER TABLE FichaCustoOutrosCustos_Insumo ADD CONSTRAINT FK_FichaCustoOutrosCustos_Insumo_1
    FOREIGN KEY (IdFichaCustoOutrosCustos)
    REFERENCES FichaCustoOutrosCustos (Codigo)
    ON DELETE SET NULL;
 
ALTER TABLE FichaCustoOutrosCustos_Insumo ADD CONSTRAINT FK_FichaCustoOutrosCustos_Insumo_2
    FOREIGN KEY (IdInsumo)
    REFERENCES Insumo (Codigo)
    ON DELETE SET NULL;