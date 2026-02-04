import { NextRequest, NextResponse } from 'next/server';
import { updatePaymentStatus, PaymentData } from '@/lib/googleSheets';

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
        error: 'Server configuration error: GOOGLE_SHEETS_SPREADSHEET_ID not configured'
      }, { status: 500 });
    }

    const body = await request.json();

    // Validate required fields
    if (!body.registrationId || !body.upiTransactionId) {
      return NextResponse.json({
        success: false,
        error: 'Missing required fields: registrationId and upiTransactionId are required'
      }, { status: 400 });
    }

    const paymentData: PaymentData = {
      timestamp: new Date().toISOString(),
      registrationId: body.registrationId,
      upiTransactionId: body.upiTransactionId,
      paymentStatus: 'Completed',
    };

    const result = await updatePaymentStatus(paymentData);

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: 'Payment confirmed successfully',
      });
    } else {
      throw new Error(result.error || 'Failed to confirm payment');
    }
  } catch (error) {
    console.error('Payment confirmation error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    }, { status: 500 });
  }
}