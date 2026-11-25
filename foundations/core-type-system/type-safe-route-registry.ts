type RouteConfig = {
  path: string
  requireAuth: boolean
  roles: readonly string[]
}
//Create registry
const routes = {
  home: {
    path: "/",
    requireAuth: false,
    roles: [],
  },
  dashboard: {
    path: "/dashboard",
    requireAuth: true,
    roles: ["admin", "user"],
  },
  admin: {
    path: "/admin",
    requireAuth: true,
    roles: ["admin"],
  },
} as const satisfies Record<string, RouteConfig>
