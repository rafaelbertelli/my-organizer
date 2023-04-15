export type SuccessHttp<T> = {
  success: boolean
  result?: T
}

export type ErrorHttp = {
  success: boolean
  error?: any
}
