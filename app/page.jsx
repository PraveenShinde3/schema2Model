"use client";
import SchemaInput from "./_components/schemaToCode/SchemaInput";
import OutputCode from "./_components/schemaToCode/OutputCode";
import { useState } from "react";
import generateModelsService from "./service/generateModels.service";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
    <div className="grid grid-rows-[20px_1fr_0px] px-[20px] items-center justify-items-center bg-[#F7F7F7] min-h-screen max-w-screen font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col bg-white h-full gap-8 row-start-2 items-center sm:items-start container px-80 py-10 rounded-t-2xl">
        <Tabs defaultValue="account" className="w-full flex-1">
          <TabsList className="p-1">
            <TabsTrigger value="account" className="text-sm py-1">
              Schema To Models
            </TabsTrigger>
            <TabsTrigger value="password" className="text-sm py-1">
              ER Diagrams
            </TabsTrigger>
          </TabsList>
          <TabsContent value="account" className="bg-white p-1">
            <div className="w-full flex-1 bg-white">
              <div className="pb-3 pl-1">
                <p className="-mt-1 text-sm">
                  Convert you SQL schema to Models in just one click.
                </p>
              </div>
              <SchemaInput generateModels={handleGenerateModels} />
              <OutputCode data={generatedCode} />
            </div>
          </TabsContent>
          <TabsContent value="password">Change your password here.</TabsContent>
        </Tabs>

        <footer className="row-start-3 w-full flex gap-6 flex-wrap items-center justify-center">
          <div class="mt-8 border-t border-gray-700 pt-2 text-center">
            <p class="text-xs">
              &copy; 2024 SchemaToCode. All rights reserved.
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}
