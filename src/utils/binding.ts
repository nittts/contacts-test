export function bindController<T>(controller: T): T {
  const proto = Object.getPrototypeOf(controller)
  Object.getOwnPropertyNames(proto).forEach((key) => {
    const val = (controller as any)[key]
    if (typeof val === "function" && key !== "constructor") {
      ;(controller as any)[key] = val.bind(controller)
    }
  })
  return controller
}
