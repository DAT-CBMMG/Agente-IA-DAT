// A diretiva "use client" marca este arquivo como um Componente de Cliente no Next.js.
"use client"

// Importa a biblioteca React e os componentes primitivos de ScrollArea da Radix UI.
import * as React from "react"
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area"

// Importa a função `cn` para mesclar classes do Tailwind CSS.
import { cn } from "@/lib/utils"

// --- Componente Principal da Área de Rolagem ---
// `ScrollArea` é o contêiner que envolve o conteúdo que precisa de uma barra de rolagem.
const ScrollArea = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root>
>(({ className, children, ...props }, ref) => (
  <ScrollAreaPrimitive.Root
    ref={ref}
    // A função `cn` aplica as classes CSS padrão e quaisquer classes personalizadas.
    className={cn("relative overflow-hidden", className)}
    {...props}
  >
    {/* A Viewport é a janela visível do conteúdo rolável. */}
    <ScrollAreaPrimitive.Viewport className="h-full w-full rounded-[inherit]">
      {children}
    </ScrollAreaPrimitive.Viewport>
    {/* Renderiza o componente da barra de rolagem. */}
    <ScrollBar />
    {/* O Corner é um pequeno quadrado que preenche o espaço onde as barras de rolagem vertical e horizontal se encontram. */}
    <ScrollAreaPrimitive.Corner />
  </ScrollAreaPrimitive.Root>
))
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName // Nome de exibição para depuração.

// --- Componente da Barra de Rolagem ---
// `ScrollBar` renderiza a própria barra de rolagem e o seu "polegar" (a parte que se arrasta).
const ScrollBar = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>
>(({ className, orientation = "vertical", ...props }, ref) => (
  <ScrollAreaPrimitive.ScrollAreaScrollbar
    ref={ref}
    orientation={orientation} // Define a orientação (vertical ou horizontal).
    // Aplica classes condicionais com base na orientação.
    className={cn(
      "flex touch-none select-none transition-colors",
      orientation === "vertical" &&
        "h-full w-2.5 border-l border-l-transparent p-[1px]",
      orientation === "horizontal" &&
        "h-2.5 flex-col border-t border-t-transparent p-[1px]",
      className
    )}
    {...props}
  >
    {/* O Thumb é a parte arrastável da barra de rolagem. */}
    <ScrollAreaPrimitive.ScrollAreaThumb className="relative flex-1 rounded-full bg-border" />
  </ScrollAreaPrimitive.ScrollAreaScrollbar>
))
ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName

// Exporta os componentes para serem usados na aplicação.
export { ScrollArea, ScrollBar }
