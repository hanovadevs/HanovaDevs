# Student Builder Program delivery notes

Route: `/student-builder-program`. Public program content and participant roster come from the user-approved implementation brief. The cohort is presented as in progress within October-December 2026, for approximately eight weeks. No exact dates, eligibility, fees, application status, certificate conditions or investment terms are invented.

All eleven LinkedIn URLs retain their supplied slug spellings. No participant email addresses or guessed portraits are published. Participant cards use initials; mentor cards reuse the shared approved leadership data. Personal mentor LinkedIn links are absent from that data and are omitted.

## Assets and provenance

The built-in image-generation tool created three illustrative workspace photographs. They are not records of cohort activity and are labelled accordingly on the page. No faces or purported participant likenesses appear. Original PNGs remain in `designs/program/` (local and ignored). Public 640px and 1200px WebP variants are in `public/program/`.

The certificate and social preview use deterministic SVG layout with the existing HanovaDevs logo, flat brand colours and embedded images. The certificate is conspicuously marked SAMPLE and is not an issued credential. Vector sources and PNG previews are in `public/program/certificate-sample.*` and `public/program/student-builder-social.*`. Rebuild assets with `node scripts/prepare-program-assets.mjs` when the original local images are available.

## Discovery and launch

The page is linked from the main navigation, footer, homepage, About page and News page. Its full text, FAQs, canonical URL, breadcrumbs, factual program schema and social preview are prerendered into production HTML. Discovery files include the program route. A LinkedIn share link and copy-link action support the owner's social post; the site does not post to social media automatically.

After deployment, inspect the URL in Google Search Console and request indexing. Website implementation cannot guarantee universal awareness, indexing, ranking or AI wording. Deployment and Search Console submission remain separate actions.

## Final generation prompts

### builder-workspace

Use case: photorealistic-natural. Asset type: editorial workspace image for a virtual student builder program page. Create an original, natural-looking illustrative photograph, not a record of an actual HanovaDevs meeting or participant. Warm ivory and muted teal surroundings, natural materials and daylight, realistic textures and modest study setting. Landscape 3:2 composition, no faces or identifiable people, no brands, logos, readable text, certificates, watermarks, or staged corporate handshakes. Nothing resembling real client code or a real private repository. Subject: close over-the-shoulder view of an adult student's hands typing on a laptop at a wooden desk beside a bright window, muted teal knitted sleeve, a notebook and pencil nearby. Laptop screen contains softly out-of-focus code-like lines, no readable screen text. Quiet absorbed work, comfortable side angle, hands and laptop completely framed with breathing room, soft natural shadows. Professional editorial photography, not glossy advertising.

### learning-workspace

Use case: photorealistic-natural. Asset type: editorial workspace image for a virtual student builder program page. Create an original, natural-looking illustrative photograph, not a record of an actual HanovaDevs meeting or participant. Warm ivory and muted teal surroundings, natural materials and daylight, realistic textures and modest study setting. Landscape 3:2 composition, no faces or identifiable people, no brands, logos, readable text, certificates, watermarks, or staged corporate handshakes. Nothing resembling real client code or a real private repository. Subject: a calm compact student workspace seen at a three-quarter angle, an open laptop with an abstract wireframe-like screen, pencil notes and a closed navy notebook on a pale wooden tabletop, light filtering through a window, the side of an adult student's hand resting beside the trackpad. A different crop and viewpoint from a typing closeup. Honest everyday setting, subtle paper and wood texture, no identifiable person.

### idea-notebook

Use case: photorealistic-natural. Asset type: editorial workspace image for a virtual student builder program page. Create an original, natural-looking illustrative photograph, not a record of an actual HanovaDevs meeting or participant. Warm ivory and muted teal surroundings, natural materials and daylight, realistic textures and modest study setting. Landscape 3:2 composition, no faces or identifiable people, no brands, logos, readable text, certificates, watermarks, or staged corporate handshakes. Nothing resembling real client code or a real private repository. Subject: overhead close-up of hands sketching simple interface boxes on unlabelled notebook paper next to a laptop keyboard, a pencil and a ceramic mug on a light wood table. Focus on the process of thinking and making rather than a polished final design. Natural imperfect marks, no readable writing, no face, daylight, muted warm tones. Intentional clean composition with real texture and open margins.
