import { google } from 'googleapis';

export interface RegistrationData {
  timestamp: string;
  registrationId: string;
  eventName: string;
  subEventName: string;
  name: string;
  email: string;
  phone: string;
  college: string;
  year: string;
  teamName: string;
  teamMembers: string;
  teamSize: string;
  entryFee: number;
  status: string;
  paymentTransactionId?: string;
}

export interface PaymentData {
  timestamp: string;
  registrationId: string;
  upiTransactionId: string;
  paymentStatus: string;
}

// Initialize Google Sheets API
function getAuth() {
  return new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });
}

// Create sheets if they don't exist
export async function initializeSheets() {
  try {
    const auth = getAuth();
    const sheets = google.sheets({ version: 'v4', auth });
    const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;

    if (!spreadsheetId) {
      throw new Error('GOOGLE_SHEETS_SPREADSHEET_ID not configured');
    }

    // Get existing sheets
    const spreadsheet = await sheets.spreadsheets.get({ spreadsheetId });
    const existingSheets = spreadsheet.data.sheets?.map(s => s.properties?.title) || [];

    const SHEET_NAME = 'Registrations';
    const PAYMENT_SHEET_NAME = 'Payments';

    // Create Registrations sheet if it doesn't exist
    if (!existingSheets.includes(SHEET_NAME)) {
      await sheets.spreadsheets.batchUpdate({
        spreadsheetId,
        requestBody: {
          requests: [{
            addSheet: {
              properties: { title: SHEET_NAME }
            }
          }]
        }
      });

      // Add headers
      const headers = [
        'Timestamp',
        'Registration ID',
        'Event Name',
        'Sub-Event Name',
        'Name',
        'Email',
        'Phone',
        'College',
        'Year',
        'Team Name',
        'Team Members',
        'Team Size',
        'Entry Fee',
        'Status',
        'Payment Transaction ID'
      ];

      await sheets.spreadsheets.values.update({
        spreadsheetId,
        range: `${SHEET_NAME}!A1:O1`,
        valueInputOption: 'RAW',
        requestBody: { values: [headers] }
      });

      // Format header row
      await sheets.spreadsheets.batchUpdate({
        spreadsheetId,
        requestBody: {
          requests: [{
            repeatCell: {
              range: {
                sheetId: (await sheets.spreadsheets.get({ 
                  spreadsheetId 
                })).data.sheets?.find(s => s.properties?.title === SHEET_NAME)?.properties?.sheetId,
                startRowIndex: 0,
                endRowIndex: 1
              },
              cell: {
                userEnteredFormat: {
                  backgroundColor: { red: 0.26, green: 0.52, blue: 0.96 },
                  textFormat: {
                    foregroundColor: { red: 1, green: 1, blue: 1 },
                    bold: true
                  }
                }
              },
              fields: 'userEnteredFormat(backgroundColor,textFormat)'
            }
          }]
        }
      });
    }

    // Create Payments sheet if it doesn't exist
    if (!existingSheets.includes(PAYMENT_SHEET_NAME)) {
      await sheets.spreadsheets.batchUpdate({
        spreadsheetId,
        requestBody: {
          requests: [{
            addSheet: {
              properties: { title: PAYMENT_SHEET_NAME }
            }
          }]
        }
      });

      // Add headers
      const paymentHeaders = [
        'Timestamp',
        'Registration ID',
        'UPI Transaction ID',
        'Payment Status'
      ];

      await sheets.spreadsheets.values.update({
        spreadsheetId,
        range: `${PAYMENT_SHEET_NAME}!A1:D1`,
        valueInputOption: 'RAW',
        requestBody: { values: [paymentHeaders] }
      });

      // Format header row
      await sheets.spreadsheets.batchUpdate({
        spreadsheetId,
        requestBody: {
          requests: [{
            repeatCell: {
              range: {
                sheetId: (await sheets.spreadsheets.get({ 
                  spreadsheetId 
                })).data.sheets?.find(s => s.properties?.title === PAYMENT_SHEET_NAME)?.properties?.sheetId,
                startRowIndex: 0,
                endRowIndex: 1
              },
              cell: {
                userEnteredFormat: {
                  backgroundColor: { red: 0.20, green: 0.66, blue: 0.33 },
                  textFormat: {
                    foregroundColor: { red: 1, green: 1, blue: 1 },
                    bold: true
                  }
                }
              },
              fields: 'userEnteredFormat(backgroundColor,textFormat)'
            }
          }]
        }
      });
    }

    return { success: true };
  } catch (error) {
    console.error('Error initializing sheets:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
}

// Create registration
export async function createRegistration(data: RegistrationData) {
  try {
    const auth = getAuth();
    const sheets = google.sheets({ version: 'v4', auth });
    const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;

    if (!spreadsheetId) {
      throw new Error('GOOGLE_SHEETS_SPREADSHEET_ID not configured');
    }

    const SHEET_NAME = 'Registrations';

    // Prepare row data
    const values = [[
      data.timestamp,
      data.registrationId,
      data.eventName,
      data.subEventName,
      data.name,
      data.email,
      data.phone,
      data.college,
      data.year,
      data.teamName || 'N/A',
      data.teamMembers || 'N/A',
      data.teamSize,
      data.entryFee,
      data.status,
      '' // Payment transaction ID (to be filled later)
    ]];

    // Append data
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: `${SHEET_NAME}!A:O`,
      valueInputOption: 'RAW',
      requestBody: { values }
    });

    return { 
      success: true, 
      registrationId: data.registrationId 
    };
  } catch (error) {
    console.error('Error creating registration:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
}

// Update payment status
export async function updatePaymentStatus(data: PaymentData) {
  try {
    const auth = getAuth();
    const sheets = google.sheets({ version: 'v4', auth });
    const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;

    if (!spreadsheetId) {
      throw new Error('GOOGLE_SHEETS_SPREADSHEET_ID not configured');
    }

    const SHEET_NAME = 'Registrations';
    const PAYMENT_SHEET_NAME = 'Payments';

    // Find the registration
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: `${SHEET_NAME}!A:O`
    });

    const rows = response.data.values || [];
    const rowIndex = rows.findIndex((row, index) => 
      index > 0 && row[1] === data.registrationId
    );

    if (rowIndex === -1) {
      throw new Error('Registration not found');
    }

    // Update status and transaction ID in Registrations sheet
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: `${SHEET_NAME}!N${rowIndex + 1}:O${rowIndex + 1}`,
      valueInputOption: 'RAW',
      requestBody: {
        values: [['Payment Completed', data.upiTransactionId]]
      }
    });

    // Log payment in Payments sheet
    const paymentValues = [[
      data.timestamp,
      data.registrationId,
      data.upiTransactionId,
      data.paymentStatus
    ]];

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: `${PAYMENT_SHEET_NAME}!A:D`,
      valueInputOption: 'RAW',
      requestBody: { values: paymentValues }
    });

    return { 
      success: true, 
      message: 'Payment confirmed' 
    };
  } catch (error) {
    console.error('Error updating payment:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
}

// Send confirmation email
export async function sendConfirmationEmail(data: RegistrationData) {
  // This would be implemented with a service like SendGrid, AWS SES, or Nodemailer
  // For now, we'll just log it
  console.log('Email would be sent to:', data.email);
  console.log('Registration ID:', data.registrationId);
  
  return { success: true };
}