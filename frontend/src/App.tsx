import FlightList from "./components/flightList";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";

const App = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-900 via-purple-800 to-pink-600  p-6 relative">
      <div className="absolute inset-0 bg-[url('/background-pattern.svg')] bg-cover bg-opacity-20 blur-[2px]"></div>

      <header className="absolute top-5 right-5 flex items-center gap-4">
        <SignedOut>
          <SignInButton 
            mode="modal" 
            className="px-4 py-2 bg-white text-blue-600 font-semibold rounded-lg shadow-md hover:bg-blue-100 transition duration-300 curor-pointer"
          />
        </SignedOut>
        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
      </header>

      <div className="relative z-10 flex flex-col items-center justify-center space-y-6">
        <SignedIn>
          <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-lg border border-white/20 w-full max-w-2xl">
            <h1 className="text-3xl font-bold mb-4 text-center">Your Flights</h1>
            <FlightList />
          </div>
        </SignedIn>

        <SignedOut>
          <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-lg border border-white/20 w-full max-w-lg text-center text-white">
            <h2 className="text-2xl font-bold">Welcome to Flight Dashboard</h2>
            <p className="text-lg mt-2">Sign in to access your flights.</p>
            <SignInButton 
              mode="modal" 
              className="mt-4 px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow-md hover:bg-blue-100 transition duration-300 cursor-pointer"
            />
          </div>
        </SignedOut>
      </div>
    </div>
  );
};

export default App;
