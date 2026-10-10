# Design and component references

The artwork is supplied by Alex. The drawings have not been AI-generated or regenerated for this redesign.

## React Bits

The pointer-to-rotation/spring interaction in `client/src/components/TiltMount.tsx` is adapted from [React Bits Tilted Card](https://github.com/DavidHDev/react-bits/tree/main/src/ts-default/Components/TiltedCard). The adaptation uses the existing `framer-motion` package, smaller movement, responsive sizing, and reduced-motion/touch guards. Other portfolio layouts are project-specific.

The following upstream license applies to that adapted component:

MIT + Commons Clause License Condition v1.0

Copyright (c) 2026 David Haz

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, and distribute the Software **as part of an application, website, or product**, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

### Commons Clause Restriction

You may use this Software, including for any commercial purpose, **so long as you do not sell, sublicense, or redistribute the components themselves-whether alone, in a bundle, or as a ported version.**

### No Warranty

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## Anti Slop

[Anti Slop](https://github.com/miqdadbadjuber/anti-slop) by Miqdad Badjuber was consulted as a design and quality reference. No upstream source code or skill files are bundled into the production application. The design decisions applied are documented in `DESIGN.md`.
