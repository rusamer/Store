/**
 * Format a number as Egyptian Pounds (EGP)
 * @param amount - The amount to format
 * @param options - Formatting options
 * @returns Formatted currency string
 */
export function formatCurrency(amount: number, options: { showSymbol?: boolean } = {}): string {
  const { showSymbol = true } = options

  const formatter = new Intl.NumberFormat("ar-EG", {
    style: showSymbol ? "currency" : "decimal",
    currency: "EGP",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })

  return formatter.format(amount)
}

/**
 * Format a number as Egyptian Pounds (EGP) with simplified display
 * @param amount - The amount to format
 * @returns Formatted currency string
 */
export function formatPrice(amount: number): string {
  return `EGP ${amount.toFixed(2)}`
}
