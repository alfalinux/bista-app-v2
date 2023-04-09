const LoadingSpinner = ({ size, color }) => {
  return (
    <div aria-label="Loading..." role="status" className="flex items-center space-x-2">
      <svg
        className={`${
          size === "sm"
            ? "h-4 w-4"
            : size === "md"
            ? "h-6 w-6"
            : size === "lg"
            ? "h-8 w-8"
            : size === "xl"
            ? "h-10 w-10"
            : "h-6 w-6"
        } ${
          color === "gray" ? "stroke-gray-500" : color === "red" ? "stroke-red-500" : "stroke-gray-500"
        } animate-spin`}
        viewBox="0 0 256 256"
      >
        <line
          x1="128"
          y1="32"
          x2="128"
          y2="64"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="24"
        ></line>
        <line
          x1="195.9"
          y1="60.1"
          x2="173.3"
          y2="82.7"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="24"
        ></line>
        <line
          x1="224"
          y1="128"
          x2="192"
          y2="128"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="24"
        ></line>
        <line
          x1="195.9"
          y1="195.9"
          x2="173.3"
          y2="173.3"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="24"
        ></line>
        <line
          x1="128"
          y1="224"
          x2="128"
          y2="192"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="24"
        ></line>
        <line
          x1="60.1"
          y1="195.9"
          x2="82.7"
          y2="173.3"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="24"
        ></line>
        <line
          x1="32"
          y1="128"
          x2="64"
          y2="128"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="24"
        ></line>
        <line
          x1="60.1"
          y1="60.1"
          x2="82.7"
          y2="82.7"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="24"
        ></line>
      </svg>
      <span
        className={`font-medium ${
          size === "sm"
            ? "text-sm"
            : size === "md"
            ? "text-base"
            : size === "lg"
            ? "text-lg"
            : size === "xl"
            ? "text-xl"
            : "text-base"
        } ${color === "gray" ? "text-gray-500" : color === "red" ? "text-red-500" : "text-gray-500"}`}
      >
        Loading...
      </span>
    </div>
  );
};

export default LoadingSpinner;
