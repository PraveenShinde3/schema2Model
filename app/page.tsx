import SchemaInput from "./_components/SchemaInput";
import OutputCode from "./_components/OutputCode";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_0px] px-[20px] items-center justify-items-center bg-[#F7F7F7] min-h-screen w-screen font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col bg-white h-full gap-8 row-start-2 items-center sm:items-start container px-80 py-10 rounded-t-2xl">
        <div className="w-full h-full bg-white">
          <SchemaInput />
          <OutputCode />
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
    </div>
  );
}
