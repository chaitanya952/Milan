# 🎉 Milan Fest 2026 - Official Website

A premium, feature-rich Next.js website for Vignan Institute's Milan Fest 2026 featuring **Ignitron**, **Kritansh**, and **Chrysalis** events.

## ✨ Key Features

### 🎯 Three Main Event Categories
- **Ignitron** - Technical events (Hackathons, Coding, Electronics)
- **Kritansh** - Cultural events (Dance, Music, Fashion)
- **Chrysalis** - Gaming & Sports events (E-sports, Mind games)

### 💳 Complete Registration System
- Individual & team registration support
- Event-specific entry fees
- Real-time form validation
- Unique registration ID generation

### 💰 Integrated UPI Payment
- Event-specific QR codes
- Transaction ID capture
- Payment confirmation workflow
- Automatic status updates

### 📊 Google Sheets Integration
- Automatic data saving to Google Sheets
- Separate sheets for each event category
- Payment status tracking (Paid/Pending/Visited)
- Export-ready format for analysis

### 📥 Download Features
- Event details PPT/PDF downloads
- Rules and guidelines
- Coordinator contact information

### 🎨 Premium Design
- 3D glowing text effects
- Glass morphism UI
- Smooth Framer Motion animations
- Fully responsive (mobile-first)
- Dark theme with neon accents

### 🏢 College Branding
- College logo display
- Accreditation badges (NAAC, NBA)
- Customizable institution details

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Environment Variables
Create `.env.local`:
```env
GOOGLE_SHEETS_PRIVATE_KEY="your-private-key"
GOOGLE_SHEETS_CLIENT_EMAIL="your-email@project.iam.gserviceaccount.com"
GOOGLE_SHEETS_SPREADSHEET_ID="your-spreadsheet-id"
NEXT_PUBLIC_COLLEGE_NAME="Vignan Institute"
NEXT_PUBLIC_COLLEGE_LOGO="/images/college-logo.png"
```

### 3. Upload Required Files
- College logo → `public/images/college-logo.png`
- UPI QR codes → `public/qr-codes/`
- Event PPTs → `public/downloads/`

### 4. Run Development Server
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
milan-fest-v2/
├── app/
│   ├── api/
│   │   ├── register/route.ts          # Registration endpoint
│   │   └── confirm-payment/route.ts   # Payment confirmation
│   ├── page.tsx                       # Home page
│   ├── layout.tsx                     # Root layout
│   └── globals.css                    # Global styles
├── components/
│   ├── Hero.tsx                       # Hero section
│   ├── EventsPage.tsx                 # Events listing
│   ├── SubEventDetail.tsx             # Event details modal
│   └── RegistrationForm.tsx           # Registration + payment form
├── lib/
│   ├── eventsData.ts                  # Event configuration
│   └── googleSheets.ts                # Google Sheets API
├── public/
│   ├── images/                        # College logo, posters
│   ├── qr-codes/                      # UPI QR codes
│   └── downloads/                     # Event PPT files
└── .env.local                         # Environment variables
```

## 📊 Event Data Structure

Each event category contains sub-events with:
- Name, description, category
- Entry fees (single/group)
- Team size requirements
- Rules and regulations
- Prize details
- Coordinator contacts
- Venue, date, time
- Download links

Edit `lib/eventsData.ts` to customize all event details.

## 🔄 Registration Flow

1. **User browses events** → Views all sub-events
2. **Clicks event card** → Opens detailed modal
3. **Fills registration form** → Personal + team details
4. **Gets Registration ID** → Unique identifier
5. **Views UPI QR code** → Event-specific payment
6. **Makes payment** → Any UPI app
7. **Enters Transaction ID** → Confirms payment
8. **Registration complete** → Data saved to Google Sheets

## 📈 Payment Tracking

### Status Types:
- **Pending** - Registered but not paid
- **Paid** - Payment confirmed
- **Visited** - Browsed without completing

### Google Sheets Format:
| Column | Data |
|--------|------|
| A | Timestamp |
| B | Registration ID |
| C | Event Name |
| D | Sub Event |
| E | Participant Name |
| F | Email |
| G | Phone |
| H | College |
| I | Year |
| J | Team Name |
| K | Team Members |
| L | Team Size |
| M | Entry Fee |
| N | Payment Status |
| O | UPI Transaction ID |
| P | Payment Screenshot |

## 🎨 Customization

### Change Event Data
Edit `lib/eventsData.ts`:
- Add/remove sub-events
- Update fees, prizes, rules
- Change coordinators
- Modify dates and venues

### Update Colors
Modify event colors in `lib/eventsData.ts`:
```typescript
color: 'neon-blue',  // Change to any Tailwind color
gradient: 'from-neon-blue to-neon-purple'
```

### College Branding
Update in `.env.local`:
```env
NEXT_PUBLIC_COLLEGE_NAME="Your College"
NEXT_PUBLIC_COLLEGE_LOGO="/images/your-logo.png"
```

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Forms**: React Hook Form
- **Backend**: Next.js API Routes
- **Database**: Google Sheets API
- **Deployment**: Vercel (recommended)

## 📱 Features by Event Type

### Individual Events
- Simple registration
- Single entry fee
- No team details required

### Group Events
- Team name required
- Team member list
- Group entry fee
- Team size validation

## 🔧 Google Sheets Setup

1. Create Google Cloud Project
2. Enable Google Sheets API
3. Create Service Account
4. Download JSON credentials
5. Create Google Spreadsheet
6. Share with service account email
7. Add credentials to `.env.local`

See `SETUP_GUIDE.md` for detailed instructions.

## 📥 Required Files

### Images
- `public/images/college-logo.png` (256x256 PNG)

### QR Codes  
- `public/qr-codes/ignitron-upi.png`
- `public/qr-codes/kritansh-upi.png`
- `public/qr-codes/chrysalis-upi.png`

### Downloads
- PPT/PDF files for each sub-event
- See `public/downloads/README.md` for list

## 🚀 Deployment

### Vercel (Recommended)
```bash
vercel
```

### Manual Build
```bash
npm run build
npm run start
```

## 📞 Support & Contact

For issues or questions:
- Check `SETUP_GUIDE.md` for detailed setup
- Review event data in `lib/eventsData.ts`
- Verify environment variables
- Test Google Sheets API connection

## 🎯 Event Categories

### Ignitron (Technical)
- Tech Hackathon (₹500/team)
- Code Combat (₹200/person)
- Circuit Mastery (₹400/team)

### Kritansh (Cultural)
- Dance Battle (₹200/₹800)
- Battle of Bands (₹1000/team)
- Fashion Show (₹1200/team)

### Chrysalis (Gaming)
- BGMI Tournament (₹600/team)
- FIFA Championship (₹150/person)
- Chess Championship (₹100/person)

## 🌟 Premium Features

- ✅ Event-specific UPI QR codes
- ✅ Google Sheets auto-sync
- ✅ Registration ID generation
- ✅ Payment status tracking
- ✅ Coordinator contact display
- ✅ PPT/PDF downloads
- ✅ Team size validation
- ✅ Entry fee calculation
- ✅ Mobile-responsive design
- ✅ Smooth animations
- ✅ Glass morphism UI
- ✅ 3D text effects

## 📄 License

Created for Milan 2026 - Vignan Institute

---

**Made with ❤️ for an unforgettable fest experience!** 🎉
