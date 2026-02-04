import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { registrationId, upiTransactionId, paymentScreenshot } = body;

    // Initialize Google Sheets
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;

    // Search for the registration ID across all sheets
    const sheetNames = ['Ignitron', 'Kritansh', 'Chrysalis'];
    
    for (const sheetName of sheetNames) {
      const response = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range: `${sheetName}!A:P`,
      });

      const rows = response.data.values || [];
      const rowIndex = rows.findIndex(row => row[1] === registrationId);

      if (rowIndex !== -1) {
        // Update payment status, transaction ID, and screenshot URL
        await sheets.spreadsheets.values.update({
          spreadsheetId,
          range: `${sheetName}!N${rowIndex + 1}:P${rowIndex + 1}`,
          valueInputOption: 'RAW',
          requestBody: {
            values: [['paid', upiTransactionId, paymentScreenshot]],
          },
        });

        return NextResponse.json({
          success: true,
          message: 'Payment confirmed successfully',
        });
      }
    }

    return NextResponse.json({
      success: false,
      error: 'Registration not found',
    }, { status: 404 });

  } catch (error) {
    console.error('Payment confirmation error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 });
  }
}
