import { NextRequest, NextResponse } from 'next/server';
import { appendToGoogleSheets, RegistrationData } from '@/lib/googleSheets';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Generate registration ID
    const registrationId = `MILAN-${Date.now()}-${uuidv4().substring(0, 8).toUpperCase()}`;
    
    // Prepare data for Google Sheets
    const registrationData: RegistrationData = {
      timestamp: new Date().toISOString(),
      registrationId,
      eventName: body.eventName,
      subEventName: body.subEventName,
      participantName: body.name,
      email: body.email,
      phone: body.phone,
      college: body.college,
      year: body.year,
      teamName: body.teamName,
      teamMembers: body.teamMembers ? body.teamMembers.join(', ') : undefined,
      teamSize: body.teamSize,
      entryFee: body.entryFee,
      paymentStatus: 'pending', // Will be updated after payment
      upiTransactionId: undefined,
      upiScreenshot: undefined,
    };

    // Save to Google Sheets
    const result = await appendToGoogleSheets(registrationData);

    if (result.success) {
      return NextResponse.json({
        success: true,
        registrationId,
        message: 'Registration saved successfully',
      });
    } else {
      return NextResponse.json({
        success: false,
        error: result.error,
      }, { status: 500 });
    }
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 });
  }
}
