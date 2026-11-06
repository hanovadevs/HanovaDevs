import { describe, expect, it, vi } from 'vitest'
import { mountWhenHomeReady } from '../../../src/app/startup.js'

describe('Homepage startup', () => {
  it('does not replace a visible static page while the homepage chunk is pending', async () => {
    let resolveHome
    const pending = new Promise(resolve => { resolveHome = resolve })
    const mount = vi.fn()
    const home = () => null
    const task = mountWhenHomeReady({ pathname: '/', mount, loadHome: () => pending })
    await Promise.resolve()
    expect(mount).not.toHaveBeenCalled()
    resolveHome({ default: home })
    await task
    expect(mount).toHaveBeenCalledExactlyOnceWith(home)
  })
  it('leaves the static homepage in place when its chunk fails', async () => {
    const mount = vi.fn()
    await expect(mountWhenHomeReady({ pathname: '/', mount, loadHome: () => Promise.reject(new Error('Chunk unavailable')) })).rejects.toThrow('Chunk unavailable')
    expect(mount).not.toHaveBeenCalled()
  })
  it('preserves route-level code splitting for other entry points', async () => {
    const mount = vi.fn(), loadHome = vi.fn()
    await mountWhenHomeReady({ pathname: '/projects', mount, loadHome })
    expect(loadHome).not.toHaveBeenCalled()
    expect(mount).toHaveBeenCalledExactlyOnceWith(null)
  })
})
