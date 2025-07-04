export function formatDateToString(date: Date): string {
  return date.toISOString()
}

export function parseDateFromString(dateString: string): string {
  return new Date(dateString).toLocaleDateString()
}
