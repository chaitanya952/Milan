import { NextRequest, NextResponse } from 'next/server';
import { createRegistration, initializeSheets, RegistrationData } from '@/lib/googleSheets';
import { v4 as uuidv4 } from 'uuid';

// Force this route to run in Node.js runtime (not Edge)
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    // Verify environment variables are available
    if (!process.env.GOOGLE_SHEETS_SPREADSHEET_ID) {
      console.error('Environment variable GOOGLE_SHEETS_SPREADSHEET_ID is not set');
      return NextResponse.json({
        success: false,
        error: 'Server configuration error: GOOGLE_SHEETS_SPREADSHEET_ID not configured. Please check your .env.local file.'
      }, { status: 500 });
    }

    if (!process.env.GOOGLE_SHEETS_CLIENT_EMAIL) {
      console.error('Environment variable GOOGLE_SHEETS_CLIENT_EMAIL is not set');
      return NextResponse.json({
        success: false,
        error: 'Server configuration error: GOOGLE_SHEETS_CLIENT_EMAIL not configured. Please check your .env.local file.'
      }, { status: 500 });
    }

    if (!process.env.GOOGLE_SHEETS_PRIVATE_KEY) {
      console.error('Environment variable GOOGLE_SHEETS_PRIVATE_KEY is not set');
      return NextResponse.json({
        success: false,
        error: 'Server configuration error: GOOGLE_SHEETS_PRIVATE_KEY not configured. Please check your .env.local file.'
      }, { status: 500 });
    }

    // Initialize sheets if needed
    const initResult = await initializeSheets();
    if (!initResult.success) {
      console.error('Failed to initialize sheets:', initResult.error);
      return NextResponse.json({
        success: false,
        error: `Failed to initialize Google Sheets: ${initResult.error}`
      }, { status: 500 });
    }

    const body = await request.json();

    // Validate required fields
    if (!body.name || !body.email || !body.phone) {
      return NextResponse.json({
        success: false,
        error: 'Missing required fields: name, email, and phone are required'
      }, { status: 400 });
    }

    // Generate registration ID
    const timestamp = Date.now();
    const shortUuid = uuidv4().substring(0, 8).toUpperCase();
    const registrationId = `MILAN-${timestamp}-${shortUuid}`;
    
    // Prepare data for Google Sheets
    const registrationData: RegistrationData = {
      timestamp: new Date().toISOString(),
      registrationId,
      eventName: body.eventName || 'General',
      subEventName: body.subEventName || 'N/A',
      name: body.name,
      email: body.email,
      phone: body.phone,
      college: body.college || 'Not specified',
      year: body.year || 'Not specified',
      teamName: body.teamName || 'N/A',
      teamMembers: Array.isArray(body.teamMembers) 
        ? body.teamMembers.join(', ') 
        : body.teamMembers || 'N/A',
      teamSize: body.teamSize || 'Solo',
      entryFee: body.entryFee || 0,
      status: body.entryFee > 0 ? 'Pending Payment' : 'Registered',
      paymentTransactionId: undefined,
    };

    // Save to Google Sheets
    const result = await createRegistration(registrationData);

    if (result.success) {
      return NextResponse.json({
        success: true,
        registrationId,
        message: 'Registration saved successfully',
      });
    } else {
      throw new Error(result.error || 'Failed to save registration');
    }
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    }, { status: 500 });
  }
}