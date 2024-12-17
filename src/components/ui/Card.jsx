/* eslint-disable react/prop-types */

export function Card({ children, className = "" }) {
  return (
    <div className={`bg-white overflow-hidden shadow rounded-lg ${className}`}>
      {children}
    </div>
  );
}

export function CardHeader({ children }) {
  return (
    <div className="px-4 py-5 sm:px-6 border-b border-gray-200">{children}</div>
  );
}

export function CardContent({ children }) {
  return <div className="px-4 py-5 sm:p-6">{children}</div>;
}

export function CardFooter({ children }) {
  return (
    <div className="px-4 py-4 sm:px-6 bg-gray-50 border-t border-gray-200">
      {children}
    </div>
  );
}
