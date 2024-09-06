import Image from "next/image";
import Header from "@/components/header";
import NavBar from "@/components/side-bar";
import DeleteModal from "@/components/modals/delete";

export default function Home() {
  return (
    <main className="">
      <Header />
      {/* <NavBar /> */}
      <DeleteModal />
    </main>
  );
}
