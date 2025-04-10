import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { CgProfile } from "react-icons/cg";
import { FaChevronDown } from "react-icons/fa";
import authIcon from "../../../public/auth.png";

type HeaderProps = {
  username: string;
  onLogout: () => void;
};

const Header = ({ username, onLogout }: HeaderProps) => {
  return (
    <header className="bg-teal-400 shadow-sm px-6 py-4 flex justify-between items-center">
      <div className="flex items-center space-x-2">
        <img
          src={authIcon}
          alt="Auth Icon"
          className="h-8 w-8 object-contain"
        />
        <h1 className="text-xl font-bold text-gray-800">Easygen App</h1>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center space-x-2 text-gray-700 hover:text-black focus:outline-none">
            <CgProfile size={20} />
            <span className="font-medium">{username}</span>
            <FaChevronDown size={14} />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="bg-white rounded-md shadow-md py-1 px-2 mt-2 min-w-[140px] border"
          sideOffset={8}
        >
          <DropdownMenuItem
            onSelect={onLogout}
            className="cursor-pointer text-sm px-3 py-2 hover:bg-gray-100 rounded"
          >
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
};

export default Header;
