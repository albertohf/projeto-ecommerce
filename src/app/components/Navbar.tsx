import Link from 'next/link';
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { IoTicketOutline } from 'react-icons/io5';

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full flex items-center py-2 px-8 justify-between z-50 bg-slate-800 text-gray-300">
      <Link href="/" className="uppercase font-bold text-md flex items-center">
        Nc Rifas
      </Link>

      <div className="flex items-center gap-8">
        <div className="flex items-center cursor-pointer relative">
          <IoTicketOutline size={36} color="#FFF" />
          <span className="bg-white text-sm text-black font-bold rounded-full h-5 w-5 flex items-center justify-center absolute left-8 bottom-5">
            2
          </span>
        </div>
        <div>
          <SignedIn>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <SignInButton mode="modal">
              <button className="uppercase rounded-md border border-gray-400  px-3 py-2 font-bold text-md h-12 flex items-center">
                Fazer Login
              </button>
            </SignInButton>
          </SignedOut>
        </div>
      </div>
    </nav>
  );
}
