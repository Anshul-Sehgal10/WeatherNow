import React from "react";

const LoadingComponent = ({ size = 48, text = "Loading..." }) => {
  return (
    <div className="flex flex-col items-center justify-center py-8">
      <div
        className="animate-spin rounded-full border-t-4 border-b-4 border-slate-300 dark:border-slate-600"
        style={{ width: size, height: size }}
      ></div>
      {text && (
        <p className="mt-4 text-slate-600 dark:text-slate-300 text-sm font-medium">
          {text}
        </p>
      )}
    </div>
  );
};

export default LoadingComponent;
