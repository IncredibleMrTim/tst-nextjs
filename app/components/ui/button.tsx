import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        brand:
          "border border-transparent bg-brand-gradient text-on-brand shadow-brand [&_svg]:size-[1.1rem] [&_svg]:stroke-[1.7] transition-[transform,box-shadow] hover:-translate-y-0.5 hover:shadow-brand-hover",
        chip:
          "border border-line-strong font-normal text-muted-foreground hover:border-brand-1 hover:text-white aria-pressed:border-transparent aria-pressed:bg-brand-gradient aria-pressed:font-semibold aria-pressed:text-on-brand",
        underline:
          "rounded-none border-b border-line-strong font-medium hover:border-brand-1 hover:text-brand-hover [&_svg]:size-[1.1rem] [&_svg]:stroke-[1.7]",
        inline:
          "font-medium text-brand-1 hover:text-brand-hover [&_svg]:size-[1.1rem] [&_svg]:stroke-[1.7]",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
        pill: "h-auto gap-[0.6rem] rounded-full px-[1.35rem] py-[0.8rem] text-[0.95rem] font-semibold",
        dock: "h-auto gap-[0.6rem] rounded-full px-[1.1rem] py-[0.55rem] text-[0.88rem] font-semibold",
        chip: "h-auto rounded-full px-4 py-[0.45rem] text-[0.88rem]",
        text: "h-auto px-0 pb-[0.15rem] pt-0 text-[0.94rem]",
        bare: "h-auto gap-[0.4rem] p-0 text-[1.04rem]",
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
