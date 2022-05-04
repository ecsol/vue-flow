export const warn = (message: string, ...args: any[]) => {
  if (import.meta.env.DEV) {
    console.warn(`[Vue Flow]: ${message}`, ...args)
  }
}
