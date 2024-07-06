interface GuardFile {
  default: Record<string, any> | any
}

const files: Record<string, GuardFile> = import.meta.glob('@/config/router/guards/*.ts', {
  eager: true
})

const guards: Record<string, any> = {}
Object.entries(files).forEach(([path, file]) => {
  if (path.includes('index.ts') || path.includes('.skip')) return // If is this file or has .skip in the name, is ignored
  const name = path
    .split('/')
    .pop()
    ?.replace(/\.\w+$/, '')

  if (
    name &&
    typeof file.default === 'object' &&
    !Array.isArray(file.default) &&
    file.default !== null
  ) {
    Object.assign(guards, file.default)
    return
  }

  if (name) {
    guards[name] = file.default
  }
})

export const getGuards = (): Record<string, any> => guards
