import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const OutputCode = ({ data }) => {
  return (
    <div className="py-4 w-full">
      <Tabs defaultValue={data ? data[0].modelName : "output"}>
        <TabsList>
          {data ? (
            data.map((model) => (
              <TabsTrigger value={model.modelName} key={model.modelName}>
                {model.modelName}
              </TabsTrigger>
            ))
          ) : (
            <TabsTrigger value="output">Ouput</TabsTrigger>
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
