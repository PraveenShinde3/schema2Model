"use client";
import SchemaInput from "./_components/SchemaInput";
import OutputCode from "./_components/OutputCode";
import { useState } from "react";
import generateModelsService from "./service/generateModels.service";

export default function Home() {
  const [generatedCode, setGeneratedCode] = useState("");
  const handleGenerateModels = async (schema, language) => {
    try {
      const result = await generateModelsService.getModels(schema, language);
      setGeneratedCode(result); // Update the state with the result
    } catch (error) {
      console.error("Error generating models:", error);
      setGeneratedCode("Error generating models."); // Handle error
    }
  };
  return (
    <div className="grid grid-rows-[20px_1fr_0px] px-[20px] items-center justify-items-center bg-[#F7F7F7] min-h-screen w-screen font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col bg-white h-full gap-8 row-start-2 items-center sm:items-start container px-80 py-10 rounded-t-2xl">
        <div className="w-full h-full bg-white">
          <SchemaInput generateModels={handleGenerateModels} />
          <OutputCode data={generatedCode} />
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
    </div>
  );
}
