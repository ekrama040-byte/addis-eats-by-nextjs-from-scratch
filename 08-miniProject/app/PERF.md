Addis Eats Performance Report

Test Setup

- Next.js version:
- Route tested:
- Lighthouse device: Mobile
- Environment: Production build
- Test date:
- Lighthouse settings:

Before Optimization

Metric| Baseline
Performance score| TBD
LCP| TBD
CLS| TBD
TBT| TBD
INP, if valid data is available| TBD

Before-and-After Results

Stage| LCP (s)| CLS| TBT (ms)| Change
Baseline| TBD| TBD| TBD| Original implementation
After image optimization| TBD| TBD| TBD| "next/image", dimensions, sizes, alt text
After priority image| TBD| TBD| TBD| Prioritized exactly one main image
After font optimization| TBD| TBD| TBD| Replaced external font link with "next/font"
After script optimization| TBD| TBD| TBD| Appropriate "next/script" loading strategy
Final production build| TBD| TBD| TBD| All changes applied

Explanation of Results

Image Optimization

Describe the measured change and whether responsive image sizing reduced unnecessary downloads or improved LCP.

Priority Image

Describe whether prioritizing the main image improved its loading time.

Font Optimization

Describe the observed CLS and LCP changes. Self-hosting can reduce external font-loading overhead, but an improvement is not guaranteed.

Script Optimization

Describe the observed TBT or other relevant changes from deferring noncritical scripts.

Environment Setup

Confirm ".env.example" is committed, local environment files are ignored, and no secrets are exposed through "NEXT_PUBLIC_*".

Conclusion

- Largest measured improvement:
- Any regressions:
- Remaining bottleneck:
- Next optimization to investigate:

Measurement Notes

All reported numbers come from actual Lighthouse reports or explicitly identified interaction/field measurements. Tests use the same route, device category, and settings. No estimated results are presented as measured results.