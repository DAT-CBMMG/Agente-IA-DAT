// Importa a biblioteca React para criar componentes.
import * as React from "react"

// Importa a função `cn` (classnames) de um arquivo de utilitários para mesclar classes do Tailwind CSS de forma condicional.
import { cn } from "@/lib/utils"

// Define o tipo de propriedades para o componente Input.
// Ele é um alias para as propriedades padrão de um input HTML.
export type InputProps = React.InputHTMLAttributes<HTMLInputElement>

// Define o componente Input como uma função que aceita as propriedades definidas acima.
// Usamos `React.forwardRef` para permitir que o componente receba uma `ref` e a passe para o elemento input subjacente.
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      // Renderiza um elemento `input` HTML.
      <input
        type={type} // Define o tipo do input (ex: "text", "password", "email").
        // A função `cn` é usada para aplicar as classes CSS base e quaisquer classes personalizadas (`className`) passadas como propriedade.
        className={cn(
          "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
          className
        )}
        ref={ref} // Encaminha a ref para o elemento input.
        {...props} // Aplica todas as outras propriedades recebidas ao input.
      />
    )
  }
)
// Define um nome de exibição para o componente, útil para depuração.
Input.displayName = "Input"

// Exporta o componente Input para que possa ser usado em outras partes da aplicação.
export { Input }
