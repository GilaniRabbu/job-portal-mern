import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/">
      <Image
        src="/logo.png"
        alt="Logo"
        width={150}
        height={50}
        className="object-contain"
      />
    </Link>
  );
};

export default Logo;
