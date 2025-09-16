#!/bin/bash

# Nome do arquivo .env
ENV_FILE=".env"
EXAMPLE_FILE=".env.example"

# Checa se o arquivo .env já existe
if [ -f "$ENV_FILE" ]; then
  echo "$ENV_FILE já existe. Nenhuma ação necessária."
else
  echo "$ENV_FILE não encontrado. Criando a partir de $EXAMPLE_FILE..."

  if [ -f "$EXAMPLE_FILE" ]; then
    # Copia o conteúdo do .env.example para .env
    cp "$EXAMPLE_FILE" "$ENV_FILE"
    echo "$ENV_FILE criado com sucesso com base em $EXAMPLE_FILE."

    # Opcional: pode adicionar um aviso para o usuário revisar o arquivo
    echo "⚠️  Revise o arquivo $ENV_FILE e atualize as variáveis conforme necessário."
  else
    echo "❌ $EXAMPLE_FILE não encontrado. Não foi possível criar $ENV_FILE."
    exit 1
  fi
fi
