type HandlerA = (value: string | number) => void
type HandlerB = (value: string) => void

const handlerA: HandlerA = (value) => console.log(value)
const handlerB: HandlerB = (value) => console.log(value.toUpperCase())
const handlerC: HandlerB = handlerA // Works!
//const handlerD: HandlerA = handlerB // Source type must provide the requirements imposed by target type
//In the above handlerD is the target value having type HandlerA which requires type annotation string | number however handlerB has only type string , Type 'number' is not assignable to type 'string'.
