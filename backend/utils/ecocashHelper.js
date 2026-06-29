// EcoCash payment helper - simulates the EcoCash sandbox until a live
// merchant integration is available, so demos never depend on reaching
// process.env.ECOCASH_URL.
const ZIM_PHONE_REGEX = /^(\+263|0)[7-8][0-9]{8}$/;

const processEcoCashPayment = async (phoneNumber, amount, reference) => {
  // Simulate network/processing latency
  await new Promise((resolve) => setTimeout(resolve, 1200));

  if (!ZIM_PHONE_REGEX.test(phoneNumber)) {
    return {
      success: false,
      message: 'Invalid EcoCash phone number',
    };
  }

  return {
    success: true,
    transactionId: `EC${Date.now()}`,
    status: 'completed',
    message: 'Payment processed successfully',
  };
};

const checkPaymentStatus = async (transactionId) => {
  try {
    // Placeholder for checking payment status
    // In a real implementation, this would query the EcoCash API
    return {
      transactionId,
      status: 'completed', // or 'pending', 'failed'
      amount: 0, // actual amount
    };
  } catch (error) {
    console.error('EcoCash status check error:', error);
    return {
      success: false,
      message: 'Status check failed',
      error: error.message,
    };
  }
};

export {
  processEcoCashPayment,
  checkPaymentStatus,
};
