export type ApiError = {
  body: {
    errors: Array<{ code: string; message: string; field?: string }>
  }
}
