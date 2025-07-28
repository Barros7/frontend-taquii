# Tratamento de Erros com Auto-limpeza

Este projeto implementa uma funcionalidade de auto-limpeza de mensagens de erro que desaparecem automaticamente após 5 segundos.

## Componentes Disponíveis

### ErrorMessage Component

Um componente reutilizável para exibir mensagens de erro que desaparecem automaticamente.

```tsx
import ErrorMessage from '@/components/ErrorMessage';

// Uso básico
<ErrorMessage 
  error={error} 
  onClear={() => setError(null)}
/>

// Com opções personalizadas
<ErrorMessage 
  error={error} 
  onClear={() => setError(null)}
  autoHide={true}
  duration={5000}
  className="custom-error-class"
/>
```

**Props:**
- `error`: string | null - A mensagem de erro a ser exibida
- `onClear`: () => void - Função chamada quando o erro é limpo
- `className`: string - Classes CSS adicionais
- `autoHide`: boolean - Se deve esconder automaticamente (padrão: true)
- `duration`: number - Duração em ms antes de esconder (padrão: 5000)

### useAutoClearError Hook

Um hook personalizado para gerenciar erros com auto-limpeza.

```tsx
import { useAutoClearError } from '@/hooks';

const { error, setError, clearError } = useAutoClearError({
  duration: 5000,
  autoClear: true
});
```

## Implementação Manual

Se preferir implementar manualmente, adicione este useEffect:

```tsx
useEffect(() => {
  if (error) {
    const timer = setTimeout(() => {
      setError(null);
    }, 5000);

    return () => clearTimeout(timer);
  }
}, [error]);
```

## Arquivos Atualizados

Os seguintes arquivos já foram atualizados com a funcionalidade:

- `src/app/pagamento/[appointmentId]/page.tsx`
- `src/app/agendar/[serviceId]/page.tsx`
- `src/app/confirmacao/[appointmentId]/page.tsx`
- `src/app/profile/page.tsx`
- `src/app/register/page.tsx`
- `src/context/AuthContext.tsx`
- `src/app/admin/sysadmin/services/page.tsx`

## Benefícios

1. **Melhor UX**: Mensagens de erro não ficam permanentemente na tela
2. **Consistência**: Comportamento uniforme em todo o aplicativo
3. **Reutilização**: Componente e hook reutilizáveis
4. **Flexibilidade**: Opções para personalizar duração e comportamento 