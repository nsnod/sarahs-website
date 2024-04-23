import * as React from "react"
import { cn } from "../../utils/cn";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex items-center w-2/4 rounded-md border border-input bg-[#0A192F] px-3 py-1 text-lg ring-offset-background file:border-0 file:bg-transparent file:text-lg file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#576C97] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        style={{ color: '#CCD6F6', caretColor: '#8892B0', height: '4rem', fontSize: '20px' }}  // Directly set the height
        placeholder="Password"
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
