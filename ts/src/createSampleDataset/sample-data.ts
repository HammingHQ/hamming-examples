import { DatasetItemValue } from "@hamming/hamming-sdk";


const sampleData: DatasetItemValue[] = [
  {
    input: {
      query: "Where or how do I send in my booking confirmations?",
    },
    output: {
      response:
        "When reserving outside the XYZ Portal, please ensure to email the confirmation to commissions@XYZ.com. Your email should come from your official XYZ address.",
    },
    metadata: {},
  },
  {
    input: {
      query: "What are the uses of drones in agriculture?",
    },
    output: {
      response:
        "Drones in agriculture are used for crop monitoring, soil and field analysis, planting, crop spraying, irrigation, and crop health assessment.",
    },
    metadata: {},
  },
  {
    input: {
      query: "What is the boiling point of water?",
    },
    output: {
      response:
        "The boiling point of water is 100 degrees Celsius at sea level.",
    },
    metadata: {},
  },
  {
    input: {
      query: "What are the main functions of the roots of a plant?",
    },
    output: {
      response:
        "The main functions of plant roots are to absorb nutrients and water, anchor the plant in the soil, and store food and nutrients.",
    },
    metadata: {},
  },
];

export default sampleData;
