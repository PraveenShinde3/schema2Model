"use client";

import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import generateModelsService from "../service/generateModels.service.js";

const SchemaInput = () => {
  const selectlanguages = [
    "JavaScript",
    "TypeScript",
    "Python",
    "Java",
    "Csharp",
    "PHP",
    "Ruby",
    "Go",
    "Kotlin",
    "Swift",
    "Rust",
  ];

  const [language, setLanguage] = useState("JavaScript");
  const [schema, setSchema] = useState("");

  const onSubmit = () => {
    try {
      generateModelsService.getModels(schema, language);
    } catch (e) {
      console.error("Error generating models:", e);
    }
  };

  return (
    <div className="w-full bg-[#F7F7F7] p-1 rounded-2xl">
      <div className=" bg-white rounded-lg h-36 overflow-hidden p-2 gap-2 flex flex-col justify-between">
        <textarea
          type="text"
          placeholder="SQL Schema here..."
          className="p-2 flex-1 w-full outline-none text-sm text-wrap h-fit resize-none "
          value={schema}
          onChange={(e) => setSchema(e.target.value)}
        />
        <div className="flex justify-between w-full items-center">
          <Select
            value={language}
            onValueChange={(value) => setLanguage(value)}
          >
            <SelectTrigger className="w-[100px]">
              <SelectValue>
                {language
                  ? language.charAt(0).toUpperCase() + language.slice(1)
                  : "Javascript"}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {selectlanguages.map((language) => (
                <SelectItem
                  className="text-[0.7rem]"
                  value={language}
                  key={language}
                >
                  {language}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button size="custom" onClick={onSubmit}>
            Generate Models
          </Button>
        </div>
      </div>
      <p className="text-[0.7rem] align-middle pt-1 px-2 opacity-90">
        Example :{" "}
        <snap className="underline underline-offset-2 cursor-pointer">
          User table
        </snap>{" "}
        ,{" "}
        <snap className="underline underline-offset-2 cursor-pointer">
          Post table
        </snap>
      </p>
    </div>
  );
};

export default SchemaInput;
