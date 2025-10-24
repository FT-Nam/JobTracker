import React from 'react';
import { cn } from '../../utils/cn';

const Loading = ({ size = "default", className }) => {
  const sizes = {
    sm: "h-4 w-4",
    default: "h-6 w-6",
    lg: "h-8 w-8",
    xl: "h-12 w-12",
  };

  return (
    <div className={cn("flex items-center justify-center", className)}>
      <div
        className={cn(
          "animate-spin rounded-full border-2 border-muted border-t-primary",
          sizes[size]
        )}
      />
    </div>
  );
};

const LoadingSpinner = ({ size = "default", className }) => (
  <Loading size={size} className={className} />
);

const LoadingPage = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="text-center">
      <Loading size="xl" />
      <p className="mt-4 text-muted-foreground">Loading...</p>
    </div>
  </div>
);

const LoadingCard = () => (
  <div className="card p-6">
    <div className="flex items-center space-x-4">
      <Loading size="default" />
      <div className="space-y-2">
        <div className="h-4 bg-muted rounded w-3/4 animate-pulse" />
        <div className="h-4 bg-muted rounded w-1/2 animate-pulse" />
      </div>
    </div>
  </div>
);

export { Loading, LoadingSpinner, LoadingPage, LoadingCard };