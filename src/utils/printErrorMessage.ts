function printErrorMessage (message: string, code: number): void {
  const msg = message.replace(/"/g, ',')
  console.log(`{statusCode: ${code}, message: ${msg}}`)
}

export default printErrorMessage
