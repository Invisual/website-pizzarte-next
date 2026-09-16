import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>Welcome to the Demo!</h1>
      <p>This is a multilingual Next.js site using next-intl.</p>
      <div>
        <Link href="/sobre">Learn About Us</Link>
        <Link href="/contact">Contact Us</Link>
      </div>
    </div>
  );
}
