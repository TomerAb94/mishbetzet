# CLAUDE.md — Design System: משבצת

## Stack
React 18 + TypeScript + Vite · Tailwind CSS · lucide-react · react-router-dom v6 · deployed on Render (static site)

## Architecture — MVC

The app follows an MVC-inspired pattern:

| Layer | Location | Role |
|-------|----------|------|
| **Model** | `src/models/` + `src/models/mock/` | TypeScript interfaces + mock data |
| **Service** | `src/services/` | Async data access (mock now, real API later) |
| **Controller** | `src/hooks/` | Custom hooks owning state + business logic |
| **View** | `src/views/` | Pages + presentational components |

### Frontend-only for now
All data comes from mock files in `src/models/mock/`. When the backend is ready (Node.js + Express + MongoDB), only the function bodies in `src/services/` change — hooks, components, and pages remain untouched.

### Adding a new page
1. Add a TypeScript interface to `src/models/` if needed
2. Add a service function to `src/services/bookService.ts`
3. Add a custom hook to `src/hooks/`
4. Create the page in `src/views/pages/`
5. Register the route in `src/router/AppRouter.tsx`

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

## Pages (Routes)

| Route | Page | Description |
|-------|------|-------------|
| `/` | HomePage | Hero carousel + top-4 books + digital teaser |
| `/catalog` | CatalogPage | Full book grid with filter + search |
| `/books/:id` | BookDetailPage | Single book expanded view |
| `/admin` | AdminPage | CRUD management (create/edit/delete books) |
| `/contact` | ContactPage | Hebrew contact form |

## File Structure
```
src/
  models/                    # TypeScript interfaces + mock data
    book.ts
    slide.ts
    contact.ts
    mock/
      books.mock.ts
      slides.mock.ts
  services/                  # API seam (mock today, real fetch later)
    bookService.ts
    contactService.ts
  hooks/                     # Controllers (state + business logic)
    useBooks.ts
    useBook.ts
    useAdminBooks.ts
    useContactForm.ts
  views/
    components/
      layout/
        Nav.tsx              # Sticky nav with NavLink tabs
        Footer.tsx
      ui/
        Reveal.tsx           # Scroll-triggered fade-in wrapper
        WaveDivider.tsx
        BookCard.tsx         # Single book card (navigates to detail)
        Badge.tsx            # Reusable green/gray pill
        SectionHeader.tsx    # Eyebrow + h2 + subtitle
      book/
        BookGrid.tsx         # Responsive 4-column grid
        BookDetail.tsx       # Expanded single book view
        BookForm.tsx         # Create/edit form (Admin)
      Hero.tsx               # Full-screen auto-rotating carousel
      DigitalBooks.tsx       # "בקרוב" teaser section
    pages/
      HomePage.tsx
      CatalogPage.tsx
      BookDetailPage.tsx
      AdminPage.tsx
      ContactPage.tsx
  router/
    AppRouter.tsx            # BrowserRouter + lazy-loaded Routes
  App.tsx                    # Thin shell: renders <AppRouter />
  main.tsx
  index.css
```
