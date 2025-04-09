import * as React from "react";
import { cn } from "../../lib/utils/utils";

interface CustomButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
}

const CustomButton = React.forwardRef<HTMLButtonElement, CustomButtonProps>(
  ({ label, className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        {...props}
        className={cn(
          "w-full py-2 px-4 bg-teal-800 text-teal-50 rounded-lg font-semibold text-lg hover:bg-teal-900 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50",
          className
        )}
      >
        {label}
      </button>
    );
  }
);

export { CustomButton };
