export function formatDateToString(date: Date): string {
  return date.toISOString()
}

export function parseDateFromString(dateString: string): string {
  return new Date(dateString).toLocaleDateString()
}

export function imageToByteArray(file: any) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = function (event: any) {
      const arrayBuffer = event.target.result
      const byteArray = new Uint8Array(arrayBuffer)
      resolve(byteArray)
    }
    reader.onerror = function (error) {
      reject(error)
    }
    reader.readAsArrayBuffer(file)
  })

  // return new Promise((resolve, reject) => {
  //   const reader = new FileReader()
  //   reader.onload = function (event: any) {
  //     const arrayBuffer = event.target.result
  //     const byteArray = new Uint8Array(arrayBuffer)
  //     resolve(byteArray)
  //   }
  //   reader.onerror = function (error) {
  //     reject(error)
  //   }
  //   reader.readAsArrayBuffer(file)
  // })
}
