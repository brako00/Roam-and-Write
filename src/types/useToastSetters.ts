import { useToast } from 'primevue/usetoast'

export default function useToastSetters() {
  const primeToast = useToast()

  function setErrorMessageToast(error: Error, errorMessage: string = ''): void {
    if (error.message) {
      primeToast.add({
        severity: 'error',
        summary: 'Error message',
        detail: `${error.message} ${errorMessage ? ': ' + errorMessage : ''}`,
        life: 5000
      })
    }
  }

  function setSuccessMessageToast(message: string): void {
    primeToast.add({
      severity: 'success',
      summary: 'Success message',
      detail: message,
      life: 5000
    })
  }

  return {
    setErrorMessageToast,
    setSuccessMessageToast
  }
}
