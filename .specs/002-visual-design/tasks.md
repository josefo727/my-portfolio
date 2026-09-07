# Tasks — 002-visual-design

## Legend

- `T{NNN}` — task id, unique within feature, zero-padded.
- `[P]` — safe to execute in parallel with other `[P]` tasks (disjoint files, no shared mutable state).
- `R` — Red beat description.
- `G` — Green beat description.
- `F` — Refactor beat description.
- `status` — `open | in_progress | closed | skipped`.

---

## T001 [P] Global CSS foundation

```
spec-ref:        Acceptance criteria 1, 4, 6
contract-ref:    n/a
constitution-ref:Article II
DoD:
  - assets/css/main.css defines a default `a` color/hover state (no unstyled browser blue)
  - a `:focus-visible` outline fallback is defined for elements without a more specific override
  - `img { max-width: 100% }` added (supports criterion 6, no horizontal overflow from oversized images)
R: a unit test reading assets/css/main.css's source text fails because these rules don't exist yet
G: add the three rules to assets/css/main.css
F: skipped — no smell detected
files:
  - assets/css/main.css
  - tests/unit/css-foundation.spec.ts
status: open
commits:
  red:
  green:
  refactor:
notes:
```

---

## T002 [P] Sidebar/content grid layout

```
spec-ref:        Acceptance criterion 2 (768px breakpoint)
contract-ref:    n/a
constitution-ref:Article II
DoD:
  - layouts/default.vue's <style scoped> defines a CSS Grid: sidebar + content columns at min-width 768px
  - below 768px, a single column (sidebar content flows above page content, no JS)
  - a unit test reads the component's source text and asserts the `@media (min-width: 768px)` rule and a grid-template-columns declaration exist
R: the test fails because layouts/default.vue has no <style> block yet
G: add the scoped grid CSS
F: skipped — no smell detected
files:
  - layouts/default.vue
  - tests/unit/layout-grid.spec.ts
status: open
commits:
  red:
  green:
  refactor:
notes:
```

---

## T003 [P] AppNav styling

```
spec-ref:        Acceptance criteria 1, 3, 4
contract-ref:    n/a
constitution-ref:Article II
DoD:
  - AppNav.vue's nav list has `list-style: none`
  - link spacing uses `--space-*` tokens
  - a `:hover` and a `:focus-visible` rule exist for nav links
  - the active route has a visually distinct style (`router-link-active`/`NuxtLink`'s active class)
R: a unit test reading AppNav.vue's source text fails because no <style> block exists yet
G: add the scoped styles
F: skipped — no smell detected
files:
  - components/layout/AppNav.vue
  - tests/unit/app-nav-style.spec.ts
status: open
commits:
  red:
  green:
  refactor:
notes:
```

---

## T004 [P] AppHeader styling

```
spec-ref:        Acceptance criteria 1, 3, 4
contract-ref:    n/a
constitution-ref:Article II
DoD:
  - AppHeader.vue's social-link list has `list-style: none`
  - profile block (photo/name) spacing uses `--space-*` tokens
  - a `:hover` and a `:focus-visible` rule exist for social links
R: a unit test reading AppHeader.vue's source text fails because no <style> block exists yet
G: add the scoped styles
F: skipped — no smell detected
files:
  - components/layout/AppHeader.vue
  - tests/unit/app-header-style.spec.ts
status: open
commits:
  red:
  green:
  refactor:
notes:
```

---

## T005 [P] AppFooter styling

```
spec-ref:        Acceptance criterion 3
contract-ref:    n/a
constitution-ref:Article II
DoD:
  - AppFooter.vue's spacing (padding/margin) uses `--space-*` tokens
R: a unit test reading AppFooter.vue's source text fails because no <style> block exists yet
G: add the scoped styles
F: skipped — no smell detected
files:
  - components/layout/AppFooter.vue
  - tests/unit/app-footer-style.spec.ts
status: open
commits:
  red:
  green:
  refactor:
notes:
```

---

## T006 [P] Home page styling

```
spec-ref:        Acceptance criteria 3, 4
contract-ref:    n/a
constitution-ref:Article II
DoD:
  - Hero.vue's activities list has `list-style: none`, spacing uses `--space-*`
  - heading/list spacing uses the type scale (`--font-size-*`)
R: a unit test reading Hero.vue's source text fails because no <style> block exists yet
G: add the scoped styles
F: skipped — no smell detected
files:
  - components/home/Hero.vue
  - tests/unit/home-style.spec.ts
status: open
commits:
  red:
  green:
  refactor:
notes:
```

---

## T007 [P] About page styling

```
spec-ref:        Acceptance criteria 1, 3, 4
contract-ref:    n/a
constitution-ref:Article II
DoD:
  - AboutProfile.vue, AboutSkills.vue, AboutFacts.vue each get spacing from `--space-*` between sub-sections
  - AboutSkills.vue's and AboutFacts.vue's lists have `list-style: none`
  - a unit test reads all three components' source text and asserts the above
R: the test fails because none of the three have a <style> block yet
G: add scoped styles to all three
F: extract any spacing pattern repeated identically across all three into a shared CSS custom property already covered by `--space-*` (no new abstraction expected)
files:
  - components/about/AboutProfile.vue
  - components/about/AboutSkills.vue
  - components/about/AboutFacts.vue
  - tests/unit/about-style.spec.ts
status: open
commits:
  red:
  green:
  refactor:
notes:
```

---

## T008 [P] Resume page styling

```
spec-ref:        Acceptance criteria 1, 3, 4
contract-ref:    n/a
constitution-ref:Article II
DoD:
  - ResumeSummary.vue, ResumeExperience.vue, ResumeEducation.vue each get spacing from `--space-*`
  - any list in these components has `list-style: none`
  - a unit test reads all three components' source text and asserts the above
R: the test fails because none of the three have a <style> block yet
G: add scoped styles to all three
F: skipped — no smell detected
files:
  - components/resume/ResumeSummary.vue
  - components/resume/ResumeExperience.vue
  - components/resume/ResumeEducation.vue
  - tests/unit/resume-style.spec.ts
status: open
commits:
  red:
  green:
  refactor:
notes:
```

---

## T009 [P] Services page styling

```
spec-ref:        Acceptance criterion 3
contract-ref:    n/a
constitution-ref:Article II
DoD:
  - pages/services.vue's heading/paragraph spacing uses `--space-*`
R: a unit test reading pages/services.vue's source text fails because no <style> block exists yet
G: add the scoped styles
F: skipped — no smell detected
files:
  - pages/services.vue
  - tests/unit/services-style.spec.ts
status: open
commits:
  red:
  green:
  refactor:
notes:
```

---

## T010 [P] Success Stories page styling

```
spec-ref:        Acceptance criteria 1, 3, 4
contract-ref:    n/a
constitution-ref:Article II
DoD:
  - SuccessStoryCard.vue's tag list has `list-style: none`
  - card spacing (title/body/tags) uses `--space-*`
  - tag items have a `:hover`/`:focus-visible` state if rendered as links, or are confirmed non-interactive (plain text) — whichever matches the current markup
R: a unit test reading SuccessStoryCard.vue's source text fails because no <style> block exists yet
G: add the scoped styles
F: skipped — no smell detected
files:
  - components/success-stories/SuccessStoryCard.vue
  - tests/unit/success-stories-style.spec.ts
status: open
commits:
  red:
  green:
  refactor:
notes:
```

---

## T011 [P] Certifications page styling

```
spec-ref:        Acceptance criterion 3
contract-ref:    n/a
constitution-ref:Article II
DoD:
  - CertificationCard.vue's figure/figcaption spacing uses `--space-*`
  - the certification grid/list has no default bullet markers
R: a unit test reading CertificationCard.vue's source text fails because no <style> block exists yet
G: add the scoped styles
F: skipped — no smell detected
files:
  - components/certifications/CertificationCard.vue
  - tests/unit/certifications-style.spec.ts
status: open
commits:
  red:
  green:
  refactor:
notes:
```

---

## T012 [P] Libraries page styling

```
spec-ref:        Acceptance criteria 3, 4
contract-ref:    n/a
constitution-ref:Article II
DoD:
  - LibraryDoc.vue's `<summary>` has a `:hover` and `:focus-visible` state (it's the interactive disclosure trigger)
  - internal spacing uses `--space-*`
R: a unit test reading LibraryDoc.vue's source text fails because no <style> block exists yet
G: add the scoped styles
F: skipped — no smell detected
files:
  - components/libraries/LibraryDoc.vue
  - tests/unit/libraries-style.spec.ts
status: open
commits:
  red:
  green:
  refactor:
notes:
```

---

## T013 [P] Contact page styling

```
spec-ref:        Acceptance criteria 1, 3, 4
contract-ref:    n/a
constitution-ref:Article II
DoD:
  - ContactInfo.vue's two lists have `list-style: none`
  - spacing uses `--space-*`
  - a `:hover`/`:focus-visible` rule exists for its links
R: a unit test reading ContactInfo.vue's source text fails because no <style> block exists yet
G: add the scoped styles
F: skipped — no smell detected
files:
  - components/contact/ContactInfo.vue
  - tests/unit/contact-style.spec.ts
status: open
commits:
  red:
  green:
  refactor:
notes:
```

---

## T014 Accessibility regression + manual review

```
spec-ref:        Acceptance criteria 5, 6
contract-ref:    n/a
constitution-ref:Article VIII
DoD:
  - tests/nuxt/accessibility.nuxt.spec.ts still reports zero violations after all styling changes
  - the user has reviewed the running site (`npm run dev`) at a mobile width (<768px) and a desktop width (≥768px) and confirmed no horizontal scrolling and an acceptable look
  - any issue found in that review is fixed before this task closes
R: n/a — this task doesn't add a new failing test; it re-runs the existing accessibility suite and performs the manual check the spec's non-goals require in place of automated visual regression
G: fix anything the accessibility suite or the manual review surfaces
F: skipped unless a fix requires cleanup
files:
  - (none expected — fixes, if any, land in whichever file the review flags)
status: open
commits:
  red: n/a — regression/manual-review task, no new red test (see spec.md non-goals on automated visual regression)
  green:
  refactor:
notes: last task — depends on T001-T013 all being done so there's a finished design to review.
```

---

## Amendments

| Date | Change | Reason |
|------|--------|--------|
|      |        |        |
