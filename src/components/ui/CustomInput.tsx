import * as React from "react";
import { Label } from "@radix-ui/react-label";
import { cn } from "../../lib/utils/utils";
import { forwardRef, useState } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const CustomInput = forwardRef<HTMLInputElement, InputProps>(
  ({ label, type, error, className, ...props }, ref) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
      setIsPasswordVisible(!isPasswordVisible);
    };

    return (
      <div className="space-y-2">
        {label && (
          <Label className="block text-sm font-semibold text-gray-700 dark:text-gray-200">
            {label}
          </Label>
        )}

        <div className="relative">
          <input
            ref={ref}
            {...props}
            type={
              type === "password" && !isPasswordVisible ? "password" : "text"
            }
            className={cn(
              "w-full rounded-xl border px-4 py-2 text-sm shadow-sm transition duration-200 outline-none",
              "bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100",
              error
                ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                : "border-gray-300 focus:border-teal-800 focus:ring-1 focus:ring-teal-800",
              className
            )}
          />

          {type === "password" && (
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-4 flex items-center text-gray-500 hover:text-gray-700"
            >
              {isPasswordVisible ? (
                <IoMdEyeOff size={20} />
              ) : (
                <IoMdEye size={20} />
              )}
            </button>
          )}
        </div>

        {error && <p className="text-xs font-medium text-red-500">{error}</p>}
      </div>
    );
  }
);

export { CustomInput };
