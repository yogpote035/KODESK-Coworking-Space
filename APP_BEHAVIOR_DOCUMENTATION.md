# KODESK Coworking Space - Complete App Behavior Documentation

## 📋 GLOBAL COMPONENTS & LAYOUT

### Navbar

**Location:** `components/shared/Navbar.tsx`
**Styling:**

- Desktop: Flex layout with max-width container
- Backdrop blur effect with semi-transparent white/black background
- Responsive: Hidden nav items on mobile, visible on lg breakpoint
- Logo changes based on route (service page vs other pages)

**Navigation Items:**

- Services (toggles service strip dropdown)
- Pricing
- Hidden by default: Home, About, Gallery, Contact

**Behavior:**

- Active link styling changes based on current route
- Services link toggles a dropdown on services pages
- Logo is clickable and links to home
- Tagline: "ACHIEVING SUCCESS TOGETHER" beneath logo

### Footer

**Location:** `components/shared/Footer.tsx`
**Background:** Dark navy (#142050)
**Grid Layout:** 4 columns (1.1fr, 0.8fr, 0.95fr, 0.75fr)

**Sections:**

1. **Description** - Brief company tagline
2. **Quick Links** - Home, About, Services, Gallery, Pricing, Contact
3. **Services** - Day pass, Coworking Space, Managed Office, Flexible Seating, Dedicated Desk, Meeting Room
4. **Contact Us** - Support call, Privacy policy, Terms of service

**Social Links:** Instagram, WhatsApp, Facebook, LinkedIn

---

## 🏠 HOME PAGE (`app/page.tsx`)

### 1. HERO SECTION

**Height:** Min 100vh
**Background:**

- Hero image with 80% object position
- Gradient overlay: `from-black/65 via-black/40 to-black/70`

**Content:**

```
Eyebrow: "Achieving Success Together" (uppercase, small, spaced)
H1: "Designed for Visionaries"
H2: "Built for Productivity" (with orange accent on "Built for")
```

**Booking Bar (below hero):**

- 4 input fields: Full Name, Email, Phone, Location
- Button: "Book Now" (dark navy background)
- Responsive: 1 column mobile → 2 columns tablet → flex desktop
- All inputs have white/15 bg with white/20 borders, focus states with white/40 borders

**Animations:**

- Data-hero-item elements fade in with stagger (0.16s between items)
- Duration: 1.1s, ease: power3.out

---

### 2. SERVICE STRIP (Marquee)

**Background:** Gradient (121E46 → 3651AD)
**Content:** Infinite scrolling marquee with services

- Services: Day Pass, Meeting Room, Coworking Space, Managed Office, Dedicated Desk, Event Space, Virtual Office, Podcast Studio, Flexible Seating
- Each item separated by diamond (✦) separator
- Animation: 30s linear infinite
- Hover effect: Text color increases from white/75 to white

---

### 3. OUR SERVICES SECTION

**Background:** Light beige (#f2f2ef)
**Section Title:** "Our Services"
**Subtitle:** "Everything you need to grow your business in one premium location"

**Service Cards (3 columns responsive):**
Each card contains:

- Title (bold, slate-900)
- Description (small text, slate-500)
- Image with rounded corners (1.2rem radius)
- White notch in bottom-right corner (carved effect)
- Arrow button in bubble:
  - Coworking: Orange (#ff8a24)
  - Managed Office: Dark blue (#1f2d62)
  - Flexible Seating: Orange (#ff8a24)
- On hover: Image scales 1.04x, shadow increases
- Shadow on hover increases

**Services Listed:**

1. Coworking Spaces → `/services/coworking-space`
2. Managed Office → `/services/managed-office`
3. Flexible Seating → `/services/flexible-seating`

**CTA Button:**

- "View All Services" with arrow
- Dark navy button with hover effect

---

### 4. ABOUT SECTION

**Background:** Light gray (#f3f3f3)
**Layout:** 2 columns (left text, right image) - stacks on mobile

**Left Column:**

- Title: "Premium Coworking Spaces for Modern Professionals"
- Description paragraph
- Bulleted list (6 items):
  - Prime locations in business districts
  - 24/7 secure access
  - High-speed fiber internet
  - Professional community
  - Flexible membership plans
  - Modern amenities
- Each bullet has orange checkmark circle (#ff8426)
- CTA Button: "Learn More About Us" → `/about`

**Right Column:**

- Hero image with rounded corners (10px)
- Overlay statistics (2 cards on mobile/tablet, 1 column absolute positioned on desktop):
  - Card 1: "08+ Years Experienced" (blue-to-orange gradient)
  - Card 2: "145 Companies Working" (blue-to-orange gradient)
- Stat counters animate from 0 when scrolled into view

---

### 5. OUR SPACES (GALLERY) SECTION

**Background:** Dark navy (#141f49)
**Title:** "Our spaces"
**Subtitle:** "Crafted environments designed for serious work"

**Gallery Grid:**

- 2 columns mobile, 3 columns desktop
- 6 images: Coworking, Meeting Room, Day Pass, Managed Office, Dedicated Desk, Event Space
- Aspect ratio: 4/3
- On hover: Images scale 1.05x
- Border radius: 2xl (rounded-2xl)

**CTA:** "View Full Gallery" button → `/gallery` (bordered style with backdrop blur)

---

### 6. WORLD CLASS AMENITIES SECTION

**Background:** Light beige (#f2f2ef)
**Title:** "World Class Amenities"
**Subtitle:** "Everything you need to stay productive and comfortable"

**Two Layouts:**

**Mobile/Tablet (≤md):**

- 1 column mobile, 2 columns tablet
- Cards with gradient background: `linear-gradient(180deg, #F7841E 0%, #8E54A8 52%, #1B3CFF 100%)`
- Each card shows: Number (01-09), Title, Description, Icon

**Amenities (9 total):**

1. High-speed internet
2. Parking
3. Power Backup
4. Security
5. Reception Support
6. Cafeteria
7. Air Conditioning
8. Printing Services
9. (Additional amenities)

**Desktop (≥md):**

- Horizontal accordion layout (height: 440px)
- Active card flex-[6], inactive cards flex-[1]
- Inactive cards: light gray background (#ececec)
- On hover/click of inactive card: Becomes active
- Expanded content fades in with 200ms delay
- Content positioned absolutely with expanded information

**Interactive Behavior:**

- Click or hover to expand card
- Number stays top-left (white when active, slate-800 when inactive)
- Label rotates 180° vertical text on right side
- Smooth flex transition (duration-500)

---

### 7. EXCLUSIVE OFFERS (PRICING CARDS) SECTION

**Background:** Light beige (#f2f2ef)
**Title:** "Exclusive Offers"
**Subtitle:** "Take advantage of our special promotions and save big"

**Card 1 — Membership Plans**

- **Background:** White with border and shadow
- **Eyebrow:** "NEW MEMBER"
- **Title:** "Membership plans"
- **Description:** Reserved workspace text
- **Pricing:** "Contact us for pricing" (instead of price)
- **Features:** 6 items with blue checkmarks
  - Personal dedicated desk
  - Storage locker
  - Meeting room credits
  - Printing services
  - 24/7 workspace access
  - Business address usage
- **Button:** "Contact Us" (full width, bordered style with blue hover)

**Card 2 — Enterprise Office**

- **Background:** Dark navy (#141f49) with "Popular" badge (orange #F28C28)
- **Eyebrow:** "ENTERPRISE"
- **Title:** "Enterprise Office"
- **Description:** Custom office solutions text
- **Pricing:** "Contact Sales for custom pricing"
- **Features:** 6 items with orange checkmarks
  - Custom office setup
  - Dedicated support team
  - Branding options
  - Conference room access
  - IT infrastructure
  - Premium lounge access
- **Buttons:**
  - "Contact Sales" (left, 50% width, bordered white/20)
  - Original "Request Proposal" button is commented out

**Card 3 — Private Cabin**

- **Background:** White with border and shadow
- **Eyebrow:** "EXCLUSIVE"
- **Title:** "Private Cabin"
- **Description:** Premium cabins text
- **Pricing:** "Contact us for pricing" (instead of ₹24,999/month)
- **Features:** 6 items with blue checkmarks
  - Fully private cabin
  - Team seating setup
  - Premium interiors
  - Air conditioning
  - Reception support
  - Housekeeping services
- **Button:** "Contact Us" (full width, bordered style with blue hover)

**Responsive:** 2 columns tablet, 3 columns desktop

---

### 8. TESTIMONIALS SECTION

**Background:** Light beige (#f2f2ef)
**Title:** "What Our Members Say"
**Subtitle:** "Join thousands of satisfied professionals who chose Kodesk"

**Testimonial Cards (2 columns):**
Each card contains:

- **Avatar:** Initials in circle with white/15 background
- **Star Rating:** 5 star system (filled stars are #F5C518, empty are white/25)
- **Name:** Large bold text
- **Role:** Small muted text
- **Quote:** Italic text with quotation marks
- **Background:** Gradient (160deg, #131f4a 0%, #1c2c63 55%, #2f47a3 100%)

**Testimonials:**

1. Arjun Patil - Co-Founder, NexaTech Solutions (4 stars)
2. Sneha Kulkarni - Marketing Consultant (4 stars)

---

### 9. FAQ SECTION

**Background:** Light beige (#f2f2ef)
**Title:** "Frequently Asked Questions"
**Subtitle:** Call to action encouraging users to reach out

**FAQ Items (Accordion):**
Each item:

- **Background:** Gradient (90deg, #0f1a40 0%, #1c2c63 55%, #34499d 100%)
- **Button:** Full width, text-left alignment
- **Question:** Bold white text
- **Icon:** Chevron down (rotates 180° when open)
- **Answer:** Text hidden by default, shows when expanded
- Border radius: 0.9rem

**FAQs:**

1. What is included in the coworking package?
2. Can meeting rooms be booked hourly?
3. Is parking available?
4. What are the operating hours?

**Behavior:**

- Click to open/close
- Only one FAQ can be open at a time
- Smooth transition on open/close

---

### 10. GET IN TOUCH SECTION

**Background:** Light beige (#f2f2ef)
**Layout:** 2 columns (left details, right map) - stacks on mobile

**Left Column - Contact Details:**

**Email:**

- Icon: Envelope
- Label: "Email"
- Text: "Send us a message"
- Link: `hello@kodesk.com`

**Phone:**

- Icon: Phone
- Label: "Phone"
- Text: "Call us directly"
- Link: `+91 93598 05818`

**Office:**

- Icon: Location pin
- Label: "Office"
- Address: "Vasukamal Express, behind Beverly Hills Society, Samarth Colony, Baner, Pune, Maharashtra"
- Link to Google Maps
- "View location" link with arrow

**Right Column:**

- Embedded Google Maps iframe showing KODESK location
- Height: 420px mobile, 480px desktop
- Border radius: 2xl
- Border: slate-200
- Shadow: sm

---

## 📄 ABOUT PAGE (`app/about/page.tsx`)

**Uses PlaceholderPage component with custom content**

- Multiple sections with images, stats, team member cards, mission/vision cards, values
- Similar scroll animations to home page
- Contains team member cards with hover effects

---

## 💰 PRICING PAGE (`app/pricing/page.tsx`)

**Uses PlaceholderPage component:**

- **Eyebrow:** "Pricing"
- **Title:** "Flexible memberships for teams of every size."
- **Description:** "Day passes, hot desks, dedicated desks, and managed offices can live here with the same premium visual system used on the About page."
- **Primary Button:** "Request Pricing" → `/contact`
- **Secondary Button:** "Explore About" → `/about`

---

## 🖼️ GALLERY PAGE (`app/gallery/page.tsx`)

**Filter Options:**

- All
- Workspace
- Meeting Rooms
- Lounge Areas
- Amenities

**Gallery Items:**

- Filterable grid layout
- Each item shows title and category
- Images with different aspect ratios

---

## 📧 CONTACT PAGE (`app/contact/page.tsx`)

**Contact Cards (4 items):**

1. Visit Us - Address
2. Call Us - Phone number
3. Email Us - Email addresses
4. Working Hours - Mon-Sat, 8AM-8PM

**Benefits List:**

- Premium locations in business districts
- 24/7 secure access
- World-class amenities
- Vibrant professional community
- Flexible membership plans
- Dedicated support team

**Embedded Map:** Google Maps showing KODESK location

---

## 🛠️ SERVICES PAGE (`app/services/page.tsx`)

**Service Showcase Cards (10 services):**

1. Coworking Space
2. Managed Office
3. Flexible Seating
4. Dedicated Desk
5. Meeting Room / Conference Room
6. Event Space
7. Virtual Office
8. Podcast Studio
9. Day Pass
10. Private Cabin

Each card contains:

- Service title
- Description
- Key benefits
- Features
- Pricing info
- CTA buttons

**Service Strip:** Available on services pages for quick navigation

---

## 🎨 ANIMATIONS & INTERACTIONS

### GSAP Animations (Auto-applied via data attributes)

**data-hero-item:**

- Entry animation: fade in + slide up (y: 42 → 0)
- Duration: 1.1s
- Stagger: 0.16s between items
- Ease: power3.out

**data-fade:**

- Initial state: y: 48, autoAlpha: 0
- On scroll enter: fade in + slide up (y: 0)
- Duration: 0.9s
- Stagger: 0.12s
- Ease: power3.out
- On scroll leave: resets for re-animation on scroll-back

**data-count:**

- Counter animation on scroll
- Ticks from 0 to target value
- Duration: 1.6s
- Ease: power2.out
- Resets when scrolling away

### Reduced Motion Support

- Respects `prefers-reduced-motion: reduce` media query
- Disables all animations if enabled

### Hover Effects

- Buttons: Scale, color changes, shadow increases
- Images: Scale 1.04x-1.05x
- Links: Color changes, underlines

---

## 🎯 COLOR SCHEME

| Element          | Color           | Hex                         |
| ---------------- | --------------- | --------------------------- |
| Primary Button   | Dark Navy       | #141f49                     |
| Primary Text     | White/Slate-900 | #ffffff / #0f172a           |
| Accent Orange    | Orange          | #F28C28 / #ff8426           |
| Accent Blue      | Blue            | #2453f5                     |
| Dark Background  | Navy            | #0f1a40 / #131f4a / #1f2d62 |
| Light Background | Light Beige     | #f2f2ef / #f3f3f3           |
| Text Secondary   | Muted           | #475569 / white/70          |

---

## 📱 RESPONSIVE BREAKPOINTS

- **Mobile:** < 640px
- **Tablet (sm):** 640px - 768px
- **Tablet (md):** 768px - 1024px
- **Desktop (lg):** 1024px+
- **XL Desktop (xl):** 1280px+

---

## 🔗 NAVIGATION STRUCTURE

```
Home (/)
├── About (/about)
├── Services (/services)
│   ├── Coworking Space (/services/coworking-space)
│   ├── Managed Office (/services/managed-office)
│   ├── Flexible Seating (/services/flexible-seating)
│   ├── Dedicated Desk (/services/dedicated-desk)
│   ├── Meeting Room (/services/meeting-room)
│   ├── Event Space (/services/event-space)
│   ├── Virtual Office (/services/virtual-office)
│   ├── Podcast Studio (/services/podcast-studio)
│   ├── Day Pass (/services/day-pass)
│   └── Private Cabin (/services/private-cabin)
├── Gallery (/gallery)
├── Pricing (/pricing)
└── Contact (/contact)
```

---

## 📊 KEY STATE MANAGEMENT

**Home Page Component State:**

- `openFaq`: Number | null - Tracks which FAQ accordion is open
- `activeAmenity`: Number - Tracks which amenity card is active in horizontal accordion

**Navbar State:**

- `showServiceStrip`: Boolean - Toggles service strip visibility

**Gallery Page State:**

- `activeFilter`: String - Current filter selection

---

## ✨ SPECIAL FEATURES

1. **Marquee Animation:** Infinite scrolling service strip
2. **Horizontal Accordion:** Amenities section with expand/collapse
3. **Stat Counters:** Animated number ticking on scroll
4. **Auto-play Animations:** Scroll-triggered fade-in effects
5. **Bidirectional Animations:** Elements re-animate when scrolling back up
6. **Backdrop Blur:** Modern glassmorphism effects on navbar and buttons
7. **Gradient Overlays:** Multiple gradient backgrounds for visual depth
8. **Responsive Images:** Using Next.js Image optimization
9. **Interactive Forms:** Hero booking form with multiple inputs
10. **Map Embeddings:** Google Maps integration on contact/about pages

---

## 🚀 CURRENT MODIFICATIONS (As of Latest Update)

### Pricing Changes:

- Removed explicit pricing from Membership Plans card (was ₹8,999/month)
- Changed to "Contact us for pricing"
- Changed Membership card button from "Enquire Now" to "Contact Us"
- Removed "Book Workspace" button from Membership card
- Private Cabin card button changed from "Enquire Now" to "Contact Us"
- Removed "Book Workspace" button from Private Cabin card
- Enterprise card shows "Contact Sales for custom pricing" instead of "Custom Pricing Available"
- Removed "Request Proposal" button from Enterprise card (commented out)
- Enterprise card now shows only "Contact Sales" button
