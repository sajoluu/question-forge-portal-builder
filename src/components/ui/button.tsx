import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 relative overflow-hidden",
  {
    variants: {
      variant: {
        default: "bg-gradient-primary text-primary-foreground shadow-glow hover:shadow-accent-glow transform hover:scale-105 active:scale-95",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-glow hover:shadow-[0_0_40px_hsl(var(--destructive)/0.5)]",
        outline: "border-2 border-primary/20 bg-transparent text-foreground hover:bg-primary/10 hover:border-primary/40 hover:shadow-glow backdrop-blur-sm",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary-hover shadow-medium hover:shadow-glow",
        ghost: "hover:bg-accent/20 hover:text-accent transition-all duration-300",
        link: "text-primary underline-offset-4 hover:underline text-gradient",
        glass: "bg-gradient-glass backdrop-blur-20 border border-white/20 text-foreground hover:bg-white/20 shadow-glass",
        accent: "bg-gradient-accent text-accent-foreground shadow-accent-glow hover:shadow-[0_0_50px_hsl(var(--accent)/0.5)] transform hover:scale-105",
        modern: "bg-gradient-primary text-primary-foreground rounded-2xl shadow-float hover:shadow-glow transform hover:scale-105 hover:-translate-y-1",
      },
      size: {
        default: "h-11 px-6 py-3",
        sm: "h-9 px-4 py-2 text-xs rounded-lg",
        lg: "h-14 px-8 py-4 text-base rounded-2xl",
        xl: "h-16 px-10 py-5 text-lg rounded-2xl",
        icon: "h-11 w-11 rounded-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
