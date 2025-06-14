const ErrorMessage = ({ error }) => {
  if (!error) return null;

  return (
    <div className="my-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md max-w-md mx-auto text-center">
      {error}
    </div>
  );
};

export default ErrorMessage;
