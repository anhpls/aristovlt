const CancelPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold text-red-500">Payment Canceled</h1>
      <p className="text-lg text-gray-600 mt-4">
        Your payment was canceled. Please try again or contact support if you
        need help.
      </p>
    </div>
  );
};

export default CancelPage;
