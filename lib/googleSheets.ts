import { google } from 'googleapis';

export interface RegistrationData {
  timestamp: string;
  registrationId: string;
  eventName: string;
  subEventName: string;
  participantName: string;
  email: string;
  phone: string;
  college: string;
  year: string;
  teamName?: string;
  teamMembers?: string;
  teamSize: string;
  entryFee: number;
  paymentStatus: 'pending' | 'paid' | 'visited';
  upiTransactionId?: string;
  upiScreenshot?: string;
}

export async function appendToGoogleSheets(data: RegistrationData) {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;

    // Determine sheet name based on event
    const sheetName = data.eventName;

    // Prepare row data
    const values = [[
      data.timestamp,
      data.registrationId,
      data.eventName,
      data.subEventName,
      data.participantName,
      data.email,
      data.phone,
      data.college,
      data.year,
      data.teamName || 'N/A',
      data.teamMembers || 'N/A',
      data.teamSize,
      data.entryFee,
      data.paymentStatus,
      data.upiTransactionId || 'N/A',
      data.upiScreenshot || 'N/A'
    ]];

    // Append data to sheet
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: `${sheetName}!A:P`,
      valueInputOption: 'RAW',
      requestBody: {
        values,
      },
    });

    return { success: true, data: response.data };
  } catch (error) {
    console.error('Error appending to Google Sheets:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

export async function createSheetsIfNotExist() {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;

    // Get existing sheets
    const spreadsheet = await sheets.spreadsheets.get({ spreadsheetId });
    const existingSheets = spreadsheet.data.sheets?.map(s => s.properties?.title) || [];

    const requiredSheets = ['Ignitron', 'Kritansh', 'Chrysalis'];
    const headers = [
      'Timestamp',
      'Registration ID',
      'Event Name',
      'Sub Event',
      'Participant Name',
      'Email',
      'Phone',
      'College',
      'Year',
      'Team Name',
      'Team Members',
      'Team Size',
      'Entry Fee',
      'Payment Status',
      'UPI Transaction ID',
      'Payment Screenshot'
    ];

    // Create missing sheets
    for (const sheetName of requiredSheets) {
      if (!existingSheets.includes(sheetName)) {
        await sheets.spreadsheets.batchUpdate({
          spreadsheetId,
          requestBody: {
            requests: [
              {
                addSheet: {
                  properties: {
                    title: sheetName,
                  },
                },
              },
            ],
          },
        });

        // Add headers
        await sheets.spreadsheets.values.update({
          spreadsheetId,
          range: `${sheetName}!A1:P1`,
          valueInputOption: 'RAW',
          requestBody: {
            values: [headers],
          },
        });
      }
    }

    return { success: true };
  } catch (error) {
    console.error('Error creating sheets:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}
