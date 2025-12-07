# 🍰 Sweet Pricing

Sweet Pricing é uma aplicação voltada para o gerenciamento e precificação de receitas culinárias.  
Seu objetivo é facilitar o controle de custos de ingredientes e automatizar o cálculo de preços de produtos feitos por confeiteiros e pequenos produtores.

---

## ✨ Funcionalidades

- Cadastro de produtos (receitas)
- Cadastro de ingredientes
- Inclusão de ingredientes na receita com:
  - Quantidade
  - Unidade de medida (kg, g, L, mL, unidade...)
- Listagem e edição de itens da receita
- Cálculo automatizado do custo do produto (em desenvolvimento)
- Interface simples e responsiva (Bootstrap)
- Backend com Django

---

## 🧱 Estrutura do Projeto (resumo)

| Pasta | Função |
|-------|--------|
| `sweet_pricing/` | Configurações do projeto Django |
| `app/` | Funcionalidades da aplicação (MVC do Django) |
| `templates/` | Arquivos HTML com engine Django |
| `static/` | JS, CSS e assets de front-end |
| `migrations/` | Controle de versão do banco de dados |

> *A estrutura pode variar conforme evolução do projeto.*

---

## 🛠️ Tecnologias utilizadas

| Tecnologia | Uso |
|-----------|-----|
| **Python 3** | Linguagem backend |
| **Django** | Framework principal |
| **Bootstrap** | Estilização frontend |
| **SQLite** | Banco de dados padrão |
| **JavaScript** | Interatividade e validações |

---

## 🚀 Como executar o projeto

Requisitos: Python 3.10+ instalado

```bash
# Clonar repositório
git clone https://github.com/ozmartins/Sweet-Pricing.git
cd Sweet-Pricing

# Criar ambiente virtual
python -m venv .venv
source .venv/bin/activate   # Linux/Mac
.\.venv\Scripts\activate    # Windows

# Instalar dependências
pip install -r requirements.txt

# Criar estrutura do banco
python manage.py migrate

# Executar servidor local
python manage.py runserver

Agora é só acessar no navegador:
http://127.0.0.1:8000
