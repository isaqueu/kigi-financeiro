
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-kigi-darkBlue text-white shadow hover:bg-kigi-hoverBlue",
        primary:
          "bg-kigi-mediumBlue text-white shadow-sm hover:bg-kigi-hoverBlue",
        success:
          "bg-kigi-lightGreen text-white shadow-sm hover:bg-kigi-hoverGreen",
        secondary:
          "bg-kigi-lightBlue text-kigi-darkBlue shadow-sm hover:bg-kigi-hoverSoft",
        warning:
          "bg-kigi-yellow text-white shadow-sm hover:bg-kigi-hoverYellow",
        logout:
          "bg-kigi-white text-kigi-darkBlue shadow-sm hover:bg-kigi-hoverLight",
        ghost: 
          "hover:bg-kigi-hoverLight hover:text-kigi-darkBlue",
        link: 
          "text-kigi-darkBlue underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
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
