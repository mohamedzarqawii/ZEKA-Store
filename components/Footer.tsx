import Link from "next/link";

const Footer = () => {
  return (
    <footer className="flex justify-between items-center gap-2 bg-[#1a1a1a]/20 mt-10 px-25 py-6 border border-t-border w-full">
      <div className="font-normal! text-primary text-xs">
        <span className="font-serif">&copy;</span> {new Date().getFullYear()}{" "}
        ZEKA. All rights reserved
      </div>
      <div className="flex gap-6 text-primary text-xs">
        <Link href={"/aboutUs"} className="hover:cursor-pointer">
          About Us
        </Link>
        <Link href={"/contact"} className="hover:cursor-pointer">
          Contact
        </Link>
        <div className="hover:cursor-pointer">Privacy policy</div>
      </div>
    </footer>
  );
};

export default Footer;
