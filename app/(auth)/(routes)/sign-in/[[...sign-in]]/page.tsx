import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex flex-row flex-wrap gap-2 justify-center items-start pt-40 md:pt-0">
      <SignIn />
      {/* Demo user credentials */}
      <div 
        className="rounded-xl max-h-40 p-10 text-center text-sm text-gray-700 dark:text-gray-100 bg-white dark:bg-gray-800 border border-gray-500"
      >
        <p className="text-lg font-semibold">
          Demo User credentials:
        </p>
        <p className="text-md">
          Email:
          <span className="font-bold pl-2">
            demo@user.com
          </span>
        </p>
        <p className="text-md">
          Password:
          <span className="font-bold pl-2">
            demouser
          </span>
        </p>
      </div>
    </div>
  );
}