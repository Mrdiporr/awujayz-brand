import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 font-body",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98]",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        // Magic Potion variants
        neon: "bg-primary text-primary-foreground glow-primary hover:scale-[1.05] active:scale-[0.98] font-bold tracking-wide uppercase",
        "neon-outline": "border-2 border-primary text-primary bg-transparent hover:bg-primary/10 hover:glow-primary font-bold tracking-wide uppercase",
        // Easily Movers variants
        trust: "bg-primary text-primary-foreground shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] font-semibold",
        energy: "bg-secondary text-secondary-foreground shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] font-semibold",
        "trust-outline": "border-2 border-primary text-primary bg-transparent hover:bg-primary hover:text-primary-foreground font-semibold",
        // Cravins TX variants
        warm: "bg-primary text-primary-foreground shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] font-semibold rounded-full",
        golden: "bg-secondary text-secondary-foreground shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] font-semibold rounded-full",
        // Hero variants
        hero: "bg-primary text-primary-foreground px-8 py-6 text-lg font-bold tracking-wide hover:scale-[1.05] active:scale-[0.98] glow-primary",
        "hero-outline": "border-2 border-foreground/20 text-foreground bg-transparent hover:bg-foreground/5 px-8 py-6 text-lg font-medium backdrop-blur-sm",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        xl: "h-14 rounded-md px-10 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
