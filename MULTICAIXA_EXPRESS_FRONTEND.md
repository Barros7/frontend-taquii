# Multicaixa Express - Frontend

Este documento descreve a implementação do Multicaixa Express no frontend da aplicação Taqui.

## Funcionalidades Implementadas

### 1. Seleção de Método de Pagamento
- Interface para selecionar entre três métodos:
  - Por Referência
  - E-Kwanza (QR Code)
  - **Multicaixa Express** (NOVO)

### 2. Formulário Multicaixa Express
- Campo para número de telefone
- Validação de formato (9 dígitos, começando com 9)
- Placeholder com exemplo: "Ex: 923000000"
- Validação em tempo real

### 3. Processamento do Pagamento
- Validação do telefone antes do envio
- Chamada para API `/api/v1/payments/multicaixaExpressPayment`
- Tratamento de erros e sucesso
- Estados de loading e submissão

### 4. Exibição do Resultado
- Status da transação
- ID da transação
- Valor do pagamento
- Mensagem de confirmação

## Componentes Modificados

### `src/app/pagamento/[appointmentId]/page.tsx`
- Adicionado estado para dados do Multicaixa Express
- Implementada função `processMulticaixaExpressPayment`
- Adicionada validação de telefone
- Interface para exibir resultado do pagamento

### `src/services/apiService.ts`
- Nova interface `MulticaixaExpressResponse`
- Método `processMulticaixaExpressPayment`
- Tratamento de erros específicos

## Fluxo de Usuário

1. **Seleção do Método**: Usuário seleciona "Multicaixa Express"
2. **Entrada do Telefone**: Digita número de telefone (9 dígitos)
3. **Validação**: Sistema valida formato do telefone
4. **Submissão**: Usuário clica em "Pagar"
5. **Processamento**: Sistema envia dados para API
6. **Resultado**: Exibe informações da transação

## Validações

### Telefone
- Deve ter exatamente 9 dígitos
- Deve começar com 9
- Formato: 9XXXXXXXX

### Estados
- `loading`: Carregando dados do agendamento
- `submitting`: Processando pagamento
- `error`: Erro durante o processo
- `dadosPagamento`: Dados do pagamento processado

## Tratamento de Erros

### Erros de Validação
- Telefone inválido
- Método não selecionado
- Telefone não preenchido

### Erros de API
- Falha na conexão
- Erro de autenticação
- Erro interno do servidor
- Pagamento duplicado

## Estados da Interface

### Estado Inicial
- Nenhum método selecionado
- Formulário oculto
- Botão "Pagar" desabilitado

### Estado de Seleção
- Método selecionado
- Formulário visível
- Validações ativas

### Estado de Processamento
- Loading no botão
- Formulário desabilitado
- Feedback visual

### Estado de Sucesso
- Dados do pagamento exibidos
- Mensagem de confirmação
- Formulário limpo

## Responsividade

- Interface adaptada para mobile e desktop
- Campos com largura responsiva
- Mensagens de erro claras
- Botões com tamanho adequado para touch

## Acessibilidade

- Labels associados aos campos
- Mensagens de erro descritivas
- Estados de loading visíveis
- Contraste adequado

## Testes

### Cenários de Teste
1. **Telefone Válido**: 923000000
2. **Telefone Inválido**: 123456789
3. **Telefone Curto**: 92300000
4. **Telefone Vazio**: ""
5. **Sem Seleção**: Nenhum método selecionado

### Validações
- Formato do telefone
- Estados da interface
- Tratamento de erros
- Fluxo de pagamento

## Integração com Backend

### Endpoint
```
POST /api/v1/payments/multicaixaExpressPayment
```

### Dados Enviados
```json
{
  "clientId": "uuid",
  "providerId": "uuid",
  "serviceId": "uuid",
  "appointmentId": "uuid"
}
```

### Resposta Esperada
```json
{
  "data": {
    "id": "transaction_id",
    "status": "PENDING"
  }
}
```

## Próximos Passos

### Melhorias Futuras
- Webhook para atualizações de status
- Histórico de pagamentos
- Notificações push
- Integração com SMS

### Monitoramento
- Logs de transações
- Métricas de sucesso
- Alertas de erro
- Dashboard de pagamentos
