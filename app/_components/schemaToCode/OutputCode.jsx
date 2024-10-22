"use client";
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const OutputCode = ({ data }) => {
  const [activeTab, setActiveTab] = useState("output");

  useEffect(() => {
    if (data && data.length > 0) {
      setActiveTab(data[0].modelName);
    }
  }, [data]);

  return (
    <div className="py-4 w-full">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="py-0.5 block whitespace-nowrap w-fit overflow-x-auto rounded-md max-w-full">
          {data ? (
            data.map((model) => (
              <TabsTrigger
                value={model.modelName}
                key={model.modelName}
                className="text-[0.8rem] rounded-none shadow-none data-[state=active]:underline data-[state=active]:bg-transparent underline-offset-4"
              >
                {model.modelName}
              </TabsTrigger>
            ))
          ) : (
            <TabsTrigger
              value="output"
              className="rounded-none shadow-none data-[state=active]:underline underline-offset-4"
            >
              Output
            </TabsTrigger>
          )}
        </TabsList>
        {data ? (
          data.map((model) => (
            <TabsContent value={model.modelName} key={model.modelName}>
              <pre>{model.code}</pre>
            </TabsContent>
          ))
        ) : (
          <TabsContent value="output" className="font-mono">
            Output will be shown here, please enter the Schema.
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
};

export default OutputCode;
