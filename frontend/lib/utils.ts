import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export const mergeStyles = (...args: any[]) => {
  return args.filter(Boolean).join(" ");
};