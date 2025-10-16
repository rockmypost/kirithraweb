# KIRITHRA.ai - Corporate Website

Ultra-premium, technology-native cross-border M&A and business architecture firm.

## 🚀 Tech Stack

- **React 18** with TypeScript
- **Vite** for blazing-fast builds
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Shadcn UI** components
- **JSON-based content** architecture

## 📁 Project Structure

```
├── content/en/          # All website content (JSON)
├── src/
│   ├── components/      # Reusable components
│   ├── sections/        # Page sections
│   ├── types/           # TypeScript types
│   └── pages/           # Route pages
```

## 🛠️ Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📝 Content Updates

All content is in `/content/en/*.json` files. Edit these files to update website content:

- `site.json` - Global site settings
- `hero.json` - Hero section
- `essence.json` - Essence section
- `services.json` - Services grid
- `proof.json` - Metrics/proof
- And more...

Each JSON file includes `lastUpdated` timestamp for AI agent visibility.

## 🎨 Design System

Defined in `src/index.css` and `tailwind.config.ts`:

- **Colors**: Premium dark theme with gold/amber accents
- **Typography**: Inter font family
- **Animations**: Premium easing and transitions
- **Glass morphism**: Frosted glass effects

## ♿ Accessibility

- WCAG 2.2 AA compliant
- Semantic HTML
- Keyboard navigation
- ARIA labels
- Screen reader optimized

## 🚀 Deployment

```bash
npm run build
```

Deploy the `dist/` folder to any static hosting:
- Vercel
- Netlify
- AWS S3
- GitHub Pages

## 📊 Performance Targets

- FCP < 1.2s
- LCP < 2.0s
- Bundle < 300KB gzipped
- Lighthouse Score > 90

## 🤖 AI Agent Visibility

JSON-LD schemas automatically generated for:
- Organization
- Services
- FAQ
- Website

Build scripts generate `/.well-known/agent.json` for AI discovery.

## 📄 License

© 2025 Kirithra. All rights reserved.
