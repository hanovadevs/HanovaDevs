import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

describe('database security migration', () => {
  const schema = readFileSync('supabase_schema.sql', 'utf8')

  it('does not grant public full access', () => {
    expect(schema).not.toMatch(/CREATE POLICY "Allow public all/i)
  })

  it('uses a server-issued admin claim for protected operations', () => {
    expect(schema).toContain("auth.jwt() -> 'app_metadata' ->> 'role'")
    expect(schema).toContain('Admins manage appointments')
  })
})
