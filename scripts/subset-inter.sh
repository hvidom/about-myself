#!/usr/bin/env bash
# Rebuilds src/assets/fonts/InterVariable-subset.woff2 from the full InterVariable.woff2 (353 KB -> ~86 KB).
# Keeps both variable axes (wght, opsz) and only the characters the site uses: Latin-1, Latin Extended-A,
# general punctuation, euro, arrows, a few math signs, star and check mark. If text gains a new symbol
# that renders in the fallback font, add its code point to UNICODES and run this again.
# Needs uv (https://docs.astral.sh/uv/); fonttools and brotli are fetched on the fly.
set -euo pipefail
cd "$(dirname "$0")/.."

UNICODES="U+0000-00FF,U+0100-017F,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2190-21FF,U+2212,U+2215,U+2248,U+2260,U+2264-2265,U+2605,U+2713-2714,U+FEFF,U+FFFD"

uv run --no-project --with fonttools --with brotli pyftsubset src/assets/fonts/InterVariable.woff2 \
	--unicodes="$UNICODES" \
	--layout-features+=tnum,pnum,case,zero,frac,numr,dnom \
	--flavor=woff2 \
	--output-file=src/assets/fonts/InterVariable-subset.woff2

ls -l src/assets/fonts/InterVariable-subset.woff2
