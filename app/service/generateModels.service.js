import axios from "axios";

class generateModelsService {
  constructor() {
    this.url = "/api";
    this.headers = {
      "Content-Type": "application/json",
    };
  }
  async getModels(schema, language) {
    try {
      const response = await axios.post(
        "/api/get-models",
        { schema: schema },
        this.headers
      );
      //filter the model by language
      //   console.log(response.data);
      const jsCode = Object.keys(response.data.models).map((modelKey) => {
        const model = response.data.models[modelKey];
        return {
          modelName: modelKey,
          Code: model[language], // Filter JavaScript code for each model
        };
      });
      console.log(jsCode);
      return jsCode;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to fetch models");
    }
  }
}

const generateModelsServiceInstance = new generateModelsService();
export default generateModelsServiceInstance;
