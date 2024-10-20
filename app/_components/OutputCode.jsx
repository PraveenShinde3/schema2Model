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
        <TabsList>
          {data ? (
            data.map((model) => (
              <TabsTrigger value={model.modelName} key={model.modelName}>
                {model.modelName}
              </TabsTrigger>
            ))
          ) : (
            <TabsTrigger value="output">Output</TabsTrigger>
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
