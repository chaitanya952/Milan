import { NextResponse } from 'next/server';

// Force Node.js runtime
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const hasSpreadsheetId = !!process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
    const hasClientEmail = !!process.env.GOOGLE_SHEETS_CLIENT_EMAIL;
    const hasPrivateKey = !!process.env.GOOGLE_SHEETS_PRIVATE_KEY;

    const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
    const clientEmail = process.env.GOOGLE_SHEETS_CLIENT_EMAIL;

    return NextResponse.json({
      status: 'Environment Check',
      timestamp: new Date().toISOString(),
      runtime: 'nodejs',
      variables: {
        GOOGLE_SHEETS_SPREADSHEET_ID: {
          configured: hasSpreadsheetId,
          length: spreadsheetId?.length || 0,
          preview: hasSpreadsheetId ? `${spreadsheetId?.substring(0, 10)}...` : 'NOT SET'
        },
        GOOGLE_SHEETS_CLIENT_EMAIL: {
          configured: hasClientEmail,
          length: clientEmail?.length || 0,
          preview: hasClientEmail ? `${clientEmail?.substring(0, 20)}...` : 'NOT SET'
        },
        GOOGLE_SHEETS_PRIVATE_KEY: {
          configured: hasPrivateKey,
          hasBeginMarker: process.env.GOOGLE_SHEETS_PRIVATE_KEY?.includes('BEGIN PRIVATE KEY') || false,
          hasEndMarker: process.env.GOOGLE_SHEETS_PRIVATE_KEY?.includes('END PRIVATE KEY') || false,
        }
      },
      allConfigured: hasSpreadsheetId && hasClientEmail && hasPrivateKey,
      message: hasSpreadsheetId && hasClientEmail && hasPrivateKey
        ? '✅ All environment variables are configured correctly!'
        : '❌ Some environment variables are missing. Check .env.local file.',
      nextSteps: hasSpreadsheetId && hasClientEmail && hasPrivateKey
        ? 'You can now test the /api/register endpoint'
        : 'Please configure missing variables in .env.local and restart the server'
    });
  } catch (error) {
    return NextResponse.json({
      status: 'error',
      error: error instanceof Error ? error.message : 'Unknown error',
      message: 'Failed to read environment variables'
    }, { status: 500 });
  }
}