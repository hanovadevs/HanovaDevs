import assert from 'node:assert/strict'
import { existsSync, readdirSync, readFileSync } from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const files = directory => readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
  const file = path.join(directory, entry.name)
  return entry.isDirectory() ? files(file) : [file]
})
const hasExactCase = file => {
  const relative = path.relative(root, file)
  if (relative.startsWith('..')) return false
  let directory = root
  for (const segment of relative.split(path.sep)) {
    if (!readdirSync(directory).includes(segment)) return false
    directory = path.join(directory, segment)
  }
  return true
}
let imports = 0
for (const file of ['src', 'api', 'server', 'tests', 'scripts'].flatMap(files).filter(file => /\.(?:[cm]?js|jsx)$/.test(file))) {
  const source = readFileSync(file, 'utf8')
  const pattern = /(?:\b(?:import|export)\s+(?:[^'";\n]+?\s+from\s*)?|\b(?:import|vi\.mock)\s*\(\s*)['"](\.[^'"]+)['"]/g
  for (const match of source.matchAll(pattern)) {
    const target = path.resolve(path.dirname(file), match[1])
    const resolved = [target, `${target}.js`, `${target}.jsx`, `${target}.mjs`, path.join(target, 'index.js'), path.join(target, 'index.jsx')].find(candidate => existsSync(candidate) && hasExactCase(candidate))
    assert(resolved, `Missing or incorrectly cased import in ${path.relative(root, file)}: ${match[1]}`)
    imports++
  }
}
const pkg = JSON.parse(readFileSync('package.json', 'utf8'))
assert(!Object.keys({ ...pkg.dependencies, ...pkg.devDependencies }).some(name => name.startsWith('@supabase/')), 'Database dependency reintroduced')
for (const file of ['src/pages/AdminDashboard.jsx', 'src/lib/supabaseClient.js', 'supabase_schema.sql', 'src/lib/supabase_schema.sql', 'api/send-email.js']) assert(!existsSync(file), `Retired file exists: ${file}`)
for (const directory of ['src', 'api', 'server']) {
  for (const file of files(directory).filter(file => /\.(?:js|jsx|css)$/.test(file))) {
    assert(!/supabase|hanova-portal-2026|AdminDashboard/i.test(readFileSync(file, 'utf8')), `Retired integration referenced in ${file}`)
  }
}
for (const [name, command] of Object.entries(pkg.scripts)) {
  for (const match of command.matchAll(/\b(?:node\s+|--ssr\s+)([^\s&]+)/g)) assert(existsSync(match[1]), `Missing script/entry in ${name}: ${match[1]}`)
}
console.log(`PASS: ${imports} local imports resolve with exact casing; script entries exist; retired admin/database integration is absent.`)
