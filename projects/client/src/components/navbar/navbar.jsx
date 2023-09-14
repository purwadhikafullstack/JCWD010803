import { useState } from "react";
import Container from "../container";
import Categories from "./categories";
import Logo from "./logo";
import Search from "./search";
import UserMenu from "./user-menu";
import { SearchModal } from "../modal/search-modal";

const Navbar = () => {

  const [open, setOpen] = useState(false)

  return (
    <div className="fixed w-full bg-white z-30 shadow-sm">
      <SearchModal setOpen={setOpen} open={open} />
      <div className="py-4 border-b-[1px]
      "
      >
        <Container>
          <div className="
          flex 
          flex-row 
          items-center 
          justify-between 
          gap-3 
          md:gap-0
          "
          >
            <Logo />
            <Search setOpen={setOpen} />
            <UserMenu />
          </div>
        </Container>
      </div>
    </div>
  );
}

export default Navbar;