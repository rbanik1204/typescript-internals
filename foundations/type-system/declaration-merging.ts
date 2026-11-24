interface User {
  id: number
}
interface User {
  name: string
}
// Typescript merges the declarations .So the resulting declaration becomes
/*
interface User {
    id:number,
    name:string
} This is called `Declaration Merging`
*/
