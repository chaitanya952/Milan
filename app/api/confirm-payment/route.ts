import { NextRequest, NextResponse } from 'next/server';
import { updatePaymentStatus, PaymentData } from '@/lib/googleSheets';

// Force this route to run in Node.js runtime (not Edge)
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  console.log('🟢 Payment confirmation endpoint called');
  
  try {
    // Verify environment variables are available
    if (!process.env.GOOGLE_SHEETS_SPREADSHEET_ID) {
      console.error('❌ Environment variable GOOGLE_SHEETS_SPREADSHEET_ID is not set');
      return NextResponse.json({
        success: false,
        error: 'Server configuration error: GOOGLE_SHEETS_SPREADSHEET_ID not configured'
      }, { status: 500 });
    }

    const body = await request.json();
    console.log('📥 Payment request body:', body);

    // Validate required fields
    if (!body.registrationId || !body.upiTransactionId) {
      console.error('❌ Missing required fields');
      return NextResponse.json({
        success: false,
        error: 'Missing required fields: registrationId and upiTransactionId are required'
      }, { status: 400 });
    }

    // Validate UPI Transaction ID format (basic validation)
    const upiId = body.upiTransactionId.trim();
    if (upiId.length < 6) {
      console.error('❌ Invalid UPI Transaction ID format');
      return NextResponse.json({
        success: false,
        error: 'Invalid UPI Transaction ID format'
      }, { status: 400 });
    }

    const paymentData: PaymentData = {
      timestamp: new Date().toISOString(),
      registrationId: body.registrationId,
      upiTransactionId: upiId,
      paymentStatus: 'Completed',
    };

    console.log('📤 Updating payment status with data:', paymentData);

    const result = await updatePaymentStatus(paymentData);
    console.log('📥 Update payment status result:', result);

    if (result.success) {
      console.log('✅ Payment confirmed successfully');
      return NextResponse.json({
        success: true,
        message: 'Payment confirmed successfully',
      });
    } else {
      console.error('❌ Failed to update payment status:', result.error);
      throw new Error(result.error || 'Failed to confirm payment');
    }
  } catch (error) {
    console.error('❌ Payment confirmation error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    console.error('❌ Error details:', errorMessage);
    
    return NextResponse.json({
      success: false,
      error: errorMessage,
    }, { status: 500 });
  }
}