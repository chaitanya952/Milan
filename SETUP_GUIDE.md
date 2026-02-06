# Milan Fest V2 - Complete Setup Guide

## 🎯 Overview

This is the complete Milan Fest website with:
- **3 Main Events**: Ignitron (Technical), Kritansh (Cultural), Chrysalis (Gaming)
- **15+ Sub-events** with individual registration
- **Google Sheets Integration** for automatic data storage
- **UPI Payment System** with event-specific QR codes
- **Download PPT** feature for each event
- **Real-time Payment Tracking** (Paid/Visited/Pending)

## 📋 Prerequisites

1. **Node.js** 18+ installed
2. **Google Cloud Account** for Sheets API
3. **UPI QR Codes** for each event
4. **Event PPT files** to upload

## 🚀 Quick Start

### Step 1: Install Dependencies

```bash
npm install
```

### Step 2: Setup Google Sheets API

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project (or use existing)
3. Enable **Google Sheets API**
4. Create **Service Account**:
   - Go to IAM & Admin → Service Accounts
   - Create Service Account
   - Grant role: **Editor**
   - Create Key (JSON format)
   - Download the JSON file

5. Create a Google Spreadsheet:
   - Go to [Google Sheets](https://sheets.google.com)
   - Create new spreadsheet named "Milan Fest Registrations"
   - Share it with the service account email (from JSON file)
   - Give **Editor** access
   - Copy the Spreadsheet ID from URL:
     `https://docs.google.com/spreadsheets/d/[SPREADSHEET_ID]/edit`

### Step 3: Configure Environment Variables

Create `.env.local` file in project root:

```env
# From your service account JSON file
GOOGLE_SHEETS_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY_HERE\n-----END PRIVATE KEY-----\n"
GOOGLE_SHEETS_CLIENT_EMAIL="your-service-account@project-id.iam.gserviceaccount.com"
GOOGLE_SHEETS_SPREADSHEET_ID="your-spreadsheet-id-here"

# College Details
NEXT_PUBLIC_COLLEGE_NAME="Vignan Institute of Technology and Science"
NEXT_PUBLIC_COLLEGE_LOGO="/images/college-logo.png"
```

**Important**: Replace `\n` in private key with actual newlines or keep as `\\n` in the env file.

### Step 4: Upload Required Files

#### A. College Logo
- Place your college logo at: `public/images/college-logo.png`
- Recommended size: 256x256 pixels, PNG format

#### B. UPI QR Codes
Place QR codes in `public/qr-codes/`:
- `ignitron-upi.png`
- `kritansh-upi.png`
- `chrysalis-upi.png`

#### C. Event PPT Files
Place PowerPoint files in `public/downloads/`:
- `tech-hackathon.pptx`
- `code-combat.pptx`
- `circuit-mastery.pptx`
- `dance-battle.pptx`
- `battle-of-bands.pptx`
- `fashion-show.pptx`
- `bgmi-tournament.pptx`
- `fifa-championship.pptx`
- `chess-championship.pptx`

### Step 5: Customize Event Data

Edit `lib/eventsData.ts` to update:
- Event names and descriptions
- Coordinator names and phone numbers
- Entry fees
- Prizes
- Rules
- Dates, times, and venues
- Google Form URL for Ignitron (optional)

### Step 6: Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 📊 Google Sheets Structure

The system automatically creates 3 sheets:
1. **Ignitron** - Technical events data
2. **Kritansh** - Cultural events data
3. **Chrysalis** - Gaming events data

### Columns (A-P):
- A: Timestamp
- B: Registration ID
- C: Event Name
- D: Sub Event
- E: Participant Name
- F: Email
- G: Phone
- H: College
- I: Year
- J: Team Name
- K: Team Members
- L: Team Size
- M: Entry Fee
- N: Payment Status (pending/paid/visited)
- O: UPI Transaction ID
- P: Payment Screenshot

## 🎨 Customization Guide

### 1. Change Event Colors

In `lib/eventsData.ts`, modify the `color` and `gradient` fields:

```typescript
{
  id: 'ignitron',
  color: 'neon-blue',  // Change this
  gradient: 'from-neon-blue to-neon-purple',  // And this
  // ...
}
```

### 2. Add/Remove Sub-Events

In `lib/eventsData.ts`, modify the `subEvents` array:

```typescript
subEvents: [
  {
    id: 'new-event-id',
    name: 'New Event Name',
    description: 'Event description',
    category: 'Category',
    rules: ['Rule 1', 'Rule 2'],
    prizes: '1st: ₹X | 2nd: ₹Y',
    teamSize: 'single', // or 'group'
    entryFee: { single: 200, group: 500 },
    coordinators: [
      { name: 'Name', phone: '+91 XXXXXXXXXX' }
    ],
    pptUrl: '/downloads/event.pptx',
    venue: 'Venue Name',
    date: 'Date',
    time: 'Time'
  }
]
```

### 3. Update College Branding

Edit `.env.local`:
```env
NEXT_PUBLIC_COLLEGE_NAME="Your College Name"
NEXT_PUBLIC_COLLEGE_LOGO="/images/your-logo.png"
```

### 4. Change UPI QR Codes

Replace files in `public/qr-codes/` with your QR codes.
Keep the same filenames or update in `lib/eventsData.ts`.

## 🔄 Registration Flow

1. **User fills form** → Data saved to Google Sheets (Status: `pending`)
2. **Gets Registration ID** → Unique identifier generated
3. **Shows UPI QR Code** → Event-specific payment QR
4. **User makes payment** → Via any UPI app
5. **Enters Transaction ID** → 12-digit UPI reference number
6. **Confirms payment** → Status updated to `paid` in Google Sheets
7. **Success message** → Email confirmation details

## 📱 Features by Event Type

### Individual Events (Solo)
- Single entry fee
- No team name/members required
- Simple registration form

### Group Events (Team)
- Group entry fee
- Team name required
- Team member names (comma-separated)
- Team size validation

## 🎯 Payment Status Tracking

### Status Types:
1. **pending** - Registered but not paid
2. **paid** - Payment confirmed with transaction ID
3. **visited** - Just browsed, didn't complete registration

### Tracking in Google Sheets:
- Filter by payment status
- Export paid participants
- Track revenue per event
- Generate reports

## 🔧 Production Deployment

### Build for Production

```bash
npm run build
npm run start
```

### Deploy to Vercel (Recommended)

1. Push code to GitHub
2. Import to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Deploy to Other Platforms

Set environment variables as per platform requirements.

## 🐛 Troubleshooting

### Google Sheets Not Working

1. Check service account email has Editor access to spreadsheet
2. Verify private key format in `.env.local`
3. Ensure Sheets API is enabled in Google Cloud
4. Check spreadsheet ID is correct

### Images Not Loading

1. Verify files are in correct `public/` subdirectories
2. Check file names match exactly (case-sensitive)
3. Restart dev server after adding files

### Registration Failing

1. Check browser console for errors
2. Verify API routes are working: `/api/register`
3. Check Google Sheets credentials
4. Ensure network access to Google APIs

## 📞 Support Features

### Event Coordinators Display
- Name and phone shown on each event
- Click-to-call functionality
- Multiple coordinators per event

### Download Event Details
- PPT/PDF download button
- Rules and guidelines
- Venue and timing info

## 🎨 UI Features

- **3D Glowing Text** - Hero titles
- **Glass Morphism** - Modern card designs
- **Smooth Animations** - Framer Motion
- **Responsive Design** - Mobile-first approach
- **Dark Theme** - Festival-appropriate aesthetics
- **Neon Colors** - High-energy visual identity

## 📄 File Structure

```
milan-fest-v2/
├── app/
│   ├── api/
│   │   ├── register/route.ts          # Registration API
│   │   └── confirm-payment/route.ts   # Payment confirmation API
│   ├── layout.tsx                     # Root layout
│   ├── page.tsx                       # Main page
│   └── globals.css                    # Global styles
├── components/
│   ├── Hero.tsx                       # Hero section
│   ├── EventsPage.tsx                 # Main events display
│   ├── SubEventDetail.tsx             # Event detail modal
│   └── RegistrationForm.tsx           # Registration + payment
├── lib/
│   ├── eventsData.ts                  # All event data
│   └── googleSheets.ts                # Google Sheets integration
├── public/
│   ├── images/
│   │   └── college-logo.png
│   ├── qr-codes/
│   │   ├── ignitron-upi.png
│   │   ├── kritansh-upi.png
│   │   └── chrysalis-upi.png
│   └── downloads/
│       └── [event PPT files]
└── .env.local                         # Environment variables
```

## 🎯 Next Steps

1. **Customize event data** in `lib/eventsData.ts`
2. **Upload your files** (logos, QR codes, PPTs)
3. **Setup Google Sheets** API credentials
4. **Test registration flow** completely
5. **Deploy to production**

## 🌟 Tips

- Test with real UPI payments before launch
- Keep backup of Google Sheets data
- Monitor registration status regularly
- Update coordinator contact info
- Test on mobile devices
- Check all download links work
- Verify email notifications (if implemented)

---

**Created for Milan 2026 - Vignan Institute** 🚀
