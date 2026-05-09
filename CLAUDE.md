# CLAUDE.md — Design System: משבצת

## Stack
React 18 + TypeScript + Vite · Tailwind CSS · lucide-react · deployed on Render (static site)

## Design Rules

### DO

Design a clean, RTL Hebrew educational website UI.

#### Color Palette
- Primary accent: **green (#16A34A)** — CTAs, badges, active states only
- Background: `#FFFFFF` (main), `#F5F5F5` (sections/cards)
- Text: `#1A1A1A` (headings), `#555555` (body), `#888888` (secondary/muted)

#### Typography
- Direction: RTL (right-to-left), Hebrew first
- Font stack: "Heebo", "Assistant", sans-serif (via Google Fonts)
- Heading: 700–900 weight, tight tracking
- Body: 400 weight, 16px, line-height 1.7
- Numbers/stats: 700 weight

#### Atmosphere
- White-dominant, minimal, lots of whitespace
- Green is the ONLY accent — never decorative, always meaningful
- Clean grid layout, textbook-structured, predictable
- Trust-building: institutional, not flashy
- Thin SVG wave dividers between sections
- No gradients, no heavy shadows — flat cards with subtle borders

#### Components
- **Buttons**: solid green fill `#16A34A`, white text, border-radius 4–6px, hover `#15803D`
- **Badges**: pill shape, green bg, white text, 12–13px font
- **Cards**: white bg, 1px `#E5E5E5` border, `rounded-lg` (8px), 20px padding
- **Nav**: sticky, white bg, green active/hover underline, RTL order (logo right, tabs left)
- **Hero**: full-width white, bold Hebrew H1, subtitle, search bar, green CTA
- **Section alternation**: white → `#F5F5F5` → white

### DON'T
- No bright saturated gradients or gradient text
- No emoji icons — use Lucide icons only
- No "revolutionary" / "game changing" marketing copy
- No heavy shadows or busy patterns
- No dark mode
- No border-radius > `rounded-2xl`
- No cramped spacing or tiny fonts (minimum 14px)

## Language
Hebrew only. All copy must be in Hebrew.

## Page Sections
1. **Hero** — search bar + "צרו קשר להזמנה" CTA
2. **Bestsellers** — 4 book cards with "רכישה מהירה" buttons
3. **Digital books teaser** — "בקרוב" badge, disabled button
4. **Footer** — phone, email, אודות links

## Component File Structure
```
src/
  components/
    Nav.tsx
    Hero.tsx
    WaveDivider.tsx
    Bestsellers.tsx
    DigitalBooks.tsx
    Footer.tsx
  App.tsx
  main.tsx
  index.css
```
