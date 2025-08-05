// Importa a biblioteca React para criar componentes.
import * as React from "react"

// Importa a função `cn` (classnames) de um arquivo de utilitários para mesclar classes do Tailwind CSS.
import { cn } from "@/lib/utils"

// --- Componente Principal do Card ---
// Este é o contêiner principal que agrupa todas as outras partes do card.
// Usamos `React.forwardRef` para permitir que uma `ref` seja passada para a `div` subjacente.
const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    // A função `cn` combina as classes padrão do card com quaisquer classes personalizadas passadas via `className`.
    className={cn(
      "rounded-lg border bg-card text-card-foreground shadow-sm",
      className
    )}
    {...props}
  />
))
Card.displayName = "Card" // Nome de exibição para depuração.

// --- Cabeçalho do Card ---
// Componente para a seção de cabeçalho do card.
const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

// --- Título do Card ---
// Componente para exibir o título dentro do `CardHeader`.
const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("text-2xl font-semibold leading-none tracking-tight", className)}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

// --- Descrição do Card ---
// Componente para exibir um texto de descrição, geralmente abaixo do `CardTitle`.
const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

// --- Conteúdo do Card ---
// Componente para a seção de conteúdo principal do card.
const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

// --- Rodapé do Card ---
// Componente para a seção de rodapé, geralmente contendo ações ou informações secundárias.
const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

// --- Ação do Card (Componente Personalizado) ---
// Este componente não é padrão do shadcn, mas pode ser útil para agrupar botões ou links de ação.
const CardAction = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
      className
    )}
    {...props}
  />
));
CardAction.displayName = "CardAction"


// Exporta todos os componentes do card para serem usados na aplicação.
export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
  CardAction, // Exporta o componente de ação também.
}
