// Common fields required on every response
type BaseResponse = {
  timestamp: string | number //unix epoch
  requestId: string
}
//Success state(generic <T> lets you type the payload dynamically)
type SuccessResponse<T> = {
  data: T
}
//Failure State
type ErrorResponse = {
  error: string //Error Codes such as "NOT_FOUND"
  message: string
}
//Combine them using Intersection(&) and Union(|)
type ApiResponse<T> = BaseResponse & (SuccessResponse<T> | ErrorResponse)

interface User {
  id: number
  name: string
}
//Valid Success Response
const apiResponse: ApiResponse<User> = {
  timestamp: "2026-11-26T18:00:00Z",
  requestId: "req_12345",
  data: {
    id: 1,
    name: "hello",
  },
}
//Valid Error Response
const errorResponse: ApiResponse<User> = {
  timestamp: "2026-11-25T18:00:00Z",
  requestId: "req_1234",
  error: "UNAUTHORIZED",
  message: "Invalid API token provided.",
}
