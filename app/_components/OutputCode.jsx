import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const OutputCode = () => {
  return (
    <div className="py-4 w-full">
      <Tabs defaultValue="account">
        <TabsList>
          <TabsTrigger value="account">Ouput</TabsTrigger>
        </TabsList>
        <TabsContent value="account" className="font-mono">
          Output will be shown here, please enter the Schema.
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default OutputCode;
