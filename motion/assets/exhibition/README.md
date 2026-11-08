# Information observatory image collection

Generated using the built-in image-generation tool on 8 November 2026. All six calls used `transparent_background: false`. Originals are retained non-destructively as PNGs in [originals](originals/). The web copies are 1104px-wide JPEGs, quality 84, embedded as data URLs in the standalone HTML. Earlier clay illustrations remain in [the earlier collection](../keywords/README.md).

| Case | Subject | Web copy | Original |
|---|---|---|---|
| 01 | Student identity and account login | [account.jpg](account.jpg) | [account.png](originals/account.png) |
| 02 | Library books and loan slip | [library.jpg](library.jpg) | [library.png](originals/library.png) |
| 03 | Scholarship money and certificate | [grant.jpg](grant.jpg) | [grant.png](originals/grant.png) |
| 04 | Weekly timetable and clock | [timetable.jpg](timetable.jpg) | [timetable.png](originals/timetable.png) |
| 05 | Research invitation and academic notes | [research.jpg](research.jpg) | [research.png](originals/research.png) |
| 06 | Browser address bar and magnifier | [subdomain.jpg](subdomain.jpg) | [subdomain.png](originals/subdomain.png) |

The images establish topic and visual identity only. They contain no actual destination, case judgement, warning badge or answer. All readable case text and evidence is rendered by the application, not generated into the artwork. These are raster illustrations with GSAP-driven presentation; the separate hero exhibit uses genuine procedural Three.js geometry.

## Exact prompt set

For cases 03 and 06, concatenate the shared prompt and corresponding subject:

> Use case: stylized-concept. Asset: premium editorial 3D illustration for a university cybersecurity learning exhibition. Cinematic still life of beautifully crafted real objects, sophisticated product photography, crisp sculpted edges, satin metal, translucent glass and textured paper. Mature design studio aesthetic, NOT cute clay, NOT toy-like, NOT cartoon. One striking large cohesive object composition on a seamless richly colored studio backdrop and floor, subtle matching grounded shadow, directional softbox lighting with a thin rim light. Landscape composition, complete objects comfortably inside frame, generous 10% margin. No people, no faces, no typography, no readable letters, no watermarks, no warning symbols, no locks or shields, no verdict or danger cues. Subject:

- **03:** Golden ochre and warm amber studio setting. A generous stack of unmistakable green banknotes with visible blank oval and line currency motifs, several large polished gold coins, an ivory scholarship certificate with a seal and a dark navy graduation cap. Money is the dominant unmistakable subject; scholarship award still life. No amounts, no text.
- **06:** Cobalt blue and periwinkle studio setting. A large three-dimensional frosted glass web browser panel with a clearly separated empty address bar. A sculptural magnifying glass with chrome rim enlarges a small part of the address bar; a small glass globe with longitude latitude lines rests beside it. Browser panel and address bar are dominant, recognizable symbols of a web domain. No URL or text.

For the remaining four calls, [originals/subdomain.png](originals/subdomain.png) was provided as a style reference only. Concatenate this shared prompt and one subject:

> Use case: stylized-concept. Asset: premium editorial 3D still life illustration for a university cybersecurity learning exhibition. Use the supplied image as a STYLE reference only: match refined product photography, satin surfaces, realistic paper and glass, clean composition, studio backdrop, directional softbox lighting and crisp rim light. REPLACE all subject matter. Mature design studio aesthetic, NOT cute clay, NOT toy-like, NOT cartoon. Landscape composition. Complete large objects comfortably inside frame, 10% safety margin. Rich seamless colored studio backdrop and matching floor with soft contact shadows. No people, no real logos, no readable typography, no watermark, no warning symbols, no locks or shields, no danger or verdict cues. Subject:

- **01:** Cornflower blue and cool blue studio setting. A large upright beautifully designed white and cobalt student identity card with simple abstract user silhouette, blank name bars and a small chip, paired with a thin open silver laptop showing a simple abstract user profile symbol and empty login fields. The student ID is the hero object. A satin blue lanyard curves elegantly around its base. No timer, no text, no shields.
- **02:** Rich petrol teal and jade studio setting. Three substantial fabric-bound hardcover books, one open book with clearly visible ivory page edges, an elegant bookmark and a white blank library borrowing slip. Beautiful real paper texture, embossed plain book spines and rich teal covers. Books and borrowing are unmistakable. No building, no words or letters.
- **04:** Warm coral and muted apricot studio setting. A large standing ivory weekly timetable or calendar board containing a beautifully orderly grid of five columns and four rows of blue, peach and coral schedule blocks, accompanied by a small sculptural silver analog clock and one navy pencil. Board is the dominant object. Calendar grid must be clearly visible, no dates, no numbers, no text.
- **05:** Rich muted violet and lilac studio setting. A silver open laptop with abstract research chart and document shapes on screen, an elegant ivory invitation letter emerging from a deep purple envelope, a small open academic research notebook and chrome pen. The research notebook and invitation are dominant, refined scholarly still life. No microscope, no science equipment, no headings, no words, no real interface brands.
