import Header from "@/components/header";
import NavBar from "@/components/side-bar";
import Container from "@/components/dnd/container";
import { fetchAllTask } from "@/libs/data";

export default async function Home() {
  let data = await fetchAllTask();
  let res = await data?.json();

  return (
    <main>
      <div className="md:flex justify-between">
        <div className="min-h-screen hidden md:inline-block">
          <NavBar boards={res} />
        </div>
        <div className="md:w-full ">
          <Header boards={res} />
          <>
            <Container data={res} />
          </>
        </div>
      </div>
    </main>
  );
}
