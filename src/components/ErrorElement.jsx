import { Link, useRouteError } from "react-router";

export default function ErrorElement() {
  const error = useRouteError();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-base-200 p-6 text-center">
      <div className="max-w-lg">
        {/* Emoji or Icon */}
        <div className="text-8xl mb-4">😢</div>

        <h1 className="text-4xl font-bold mb-2 text-error">
          Oops! Something went wrong
        </h1>

        <p className="text-lg opacity-70 mb-6">
          The page you’re looking for doesn't exist or an unexpected error
          happened.
        </p>

        {/* Show the actual error message if available */}
        {error?.statusText || error?.message ? (
          <p className="text-sm text-warning mb-6">
            <span className="font-semibold">Error:</span>{" "}
            {error.statusText || error.message}
          </p>
        ) : null}

        <div className="space-x-3">
          <Link to="/">
            <button className="btn btn-primary">Go Back Home</button>
          </Link>

          <button
            className="btn btn-outline"
            onClick={() => window.location.reload()}
          >
            Reload Page
          </button>
        </div>
      </div>
    </div>
  );
}
