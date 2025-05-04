export type CommerceToolsError = {
  body: {
    errors: Array<{ code: string; message: string }>
  }
}
