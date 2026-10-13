import { readFile, writeFile, mkdir } from 'node:fs/promises'
import sharp from 'sharp'

await mkdir('public/program', { recursive: true })
for (const name of ['builder-workspace', 'learning-workspace', 'idea-notebook']) {
  for (const width of [640, 1200]) {
    await sharp(`designs/program/${name}.png`).resize({ width, withoutEnlargement: true }).webp({ quality: 82, effort: 5 }).toFile(`public/program/${name}-${width}.webp`)
  }
}
const logo = `data:image/webp;base64,${(await readFile('public/agency-logo-720.webp')).toString('base64')}`
const certificate = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="848" viewBox="0 0 1200 848">
<title>Sample Student Builder Program certificate design</title><desc>A design preview only, not an issued certificate or accredited qualification.</desc>
<rect width="1200" height="848" fill="#faf9f4"/><path d="M1050 0H1200V848H1030C1130 625 990 450 1080 260C1125 160 1090 75 1050 0Z" fill="#e4eee6"/><path d="M1150 -50C1010 180 1260 350 1080 630C1040 700 1045 820 1120 900" fill="none" stroke="#0a766f" stroke-width="2"/>
<rect x="28" y="28" width="1144" height="792" rx="4" fill="none" stroke="#b6cec0"/>
<image href="${logo}" x="60" y="45" width="280" height="108"/>
<rect x="850" y="68" width="270" height="44" rx="22" fill="#0a766f"/><text x="985" y="96" text-anchor="middle" fill="#fff" font-family="Arial,sans-serif" font-size="15" letter-spacing="1">SAMPLE · DESIGN PREVIEW</text>
<text x="74" y="220" fill="#0a766f" font-family="Arial,sans-serif" font-size="17" letter-spacing="3">HANOVADEVS STUDENT BUILDER PROGRAM</text>
<text x="70" y="302" fill="#071a2b" font-family="Arial,sans-serif" font-size="57">Certificate of Participation</text>
<text x="74" y="372" fill="#465e69" font-family="Arial,sans-serif" font-size="22">Presented to</text>
<text x="70" y="444" fill="#071a2b" font-family="Georgia,serif" font-size="52">Sample Participant</text>
<path d="M74 470H865" stroke="#b4ccbe"/>
<text x="74" y="530" fill="#465e69" font-family="Arial,sans-serif" font-size="22">In recognition of participation in a shared journey of</text>
<text x="74" y="567" fill="#465e69" font-family="Arial,sans-serif" font-size="22">practical project work, mentorship and collaboration.</text>
<text x="74" y="640" fill="#0a766f" font-family="Arial,sans-serif" font-size="20">October–December 2026 · 8-week virtual program</text>
<text x="590" y="560" text-anchor="middle" transform="rotate(-17 590 560)" fill="#071a2b" fill-opacity=".065" font-family="Arial,sans-serif" font-size="158" font-weight="700">SAMPLE</text>
<text x="74" y="744" fill="#071a2b" font-family="Arial,sans-serif" font-size="19">HanovaDevs · Program team</text>
<text x="74" y="785" fill="#465e69" font-family="Arial,sans-serif" font-size="14">Preview only. No certificate has been issued by this image. Not an externally accredited qualification.</text>
</svg>`
await writeFile('public/program/certificate-sample.svg', certificate, 'utf8')
await sharp(Buffer.from(certificate)).png().toFile('public/program/certificate-sample.png')

const photo = `data:image/webp;base64,${(await readFile('public/program/builder-workspace-1200.webp')).toString('base64')}`
const social = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
<title>HanovaDevs Student Builder Program social preview</title><defs><clipPath id="photo"><path d="M800 65C950 25 1180 130 1180 295V575H745V245C745 165 758 90 800 65Z"/></clipPath></defs>
<rect width="1200" height="630" fill="#faf9f4"/><ellipse cx="1130" cy="245" rx="500" ry="500" fill="#e4eee6"/><ellipse cx="1190" cy="265" rx="500" ry="490" fill="none" stroke="#b7d0c1"/>
<image href="${logo}" x="38" y="20" width="270" height="104"/>
<text x="62" y="173" fill="#0a766f" font-family="Arial,sans-serif" font-size="17" letter-spacing="2">STUDENT BUILDER PROGRAM</text>
<text x="58" y="263" fill="#071a2b" font-family="Arial,sans-serif" font-size="69">Build something</text>
<text x="58" y="345" fill="#0a766f" font-family="Arial,sans-serif" font-size="69">that matters.</text>
<text x="62" y="424" fill="#465e69" font-family="Arial,sans-serif" font-size="22">Real projects. Mentorship. A shared journey.</text>
<text x="62" y="502" fill="#071a2b" font-family="Arial,sans-serif" font-size="24">October–December 2026</text>
<text x="62" y="543" fill="#465e69" font-family="Arial,sans-serif" font-size="21">8-week virtual program</text>
<image href="${photo}" x="680" y="65" width="720" height="510" preserveAspectRatio="xMidYMid slice" clip-path="url(#photo)"/>
<text x="64" y="602" fill="#465e69" font-family="Arial,sans-serif" font-size="17">hanovadevs.com/student-builder-program</text>
<text x="968" y="604" text-anchor="middle" fill="#465e69" font-family="Arial,sans-serif" font-size="11">Illustrative workspace · not actual cohort photography</text>
</svg>`
await writeFile('public/program/student-builder-social.svg', social, 'utf8')
await sharp(Buffer.from(social)).png().toFile('public/program/student-builder-social.png')
console.log('Prepared six responsive workspace images, branded sample certificate and social preview.')
