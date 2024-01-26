interface QaDemoEntry {
  aiOutput: string;
  contexts: { pageContent: string; metadata: { source: string } }[];
}

interface QaDemoLookup {
  [key: string]: QaDemoEntry;
}

export const qaDemoLookup: QaDemoLookup = {
  "Where or how do I send in my booking confirmations?": {
    aiOutput:
      "When reserving outside the XYZ Portal, it's essential to adhere to the proper booking confirmations process. Please ensure to forward the booking confirmation email directly to commissions@XYZ.com. This step is crucial as it ensures all bookings made outside the XYZ Portal are centrally recorded and processed efficiently. Along with the booking confirmation, make sure to include vital details in your email such as the client's name, supplier, and confirmation number. It's also important to use your official XYZ email address for all client bookings, as this aligns with the company's travel policies and maintains professionalism in our communication channels.",
    contexts: [
      {
        pageContent:
          "Booking Confirmations Process: For any bookings made outside the XYZ Portal, it's mandatory to forward the booking confirmation email directly to commissions@XYZ.com. This process ensures that all bookings are centrally recorded and processed efficiently. Remember to include essential details such as the client's name, supplier, and confirmation number in the email. Make sure you use your official official XYZ email address for client bookings.",
        metadata: {
          source: "Website",
        },
      },
      {
        pageContent:
          "Travel Tips for XYZ Employees: When traveling for business, always ensure to adhere to the company's travel policies. This includes booking hotels and flights through approved channels. If you encounter any issues while booking, contact our travel support team immediately for assistance.",
        metadata: {
          source: "Forums",
        },
      },
      {
        pageContent:
          "XYZ Portal Features: The XYZ Portal is designed to streamline the booking process for our clients. It offers a user-friendly interface for booking hotels, flights, and rental cars. The portal also provides real-time updates on booking statuses and special offers exclusive to XYZ members.",
        metadata: {
          source: "Videos",
        },
      },
      {
        pageContent:
          "Healthy Eating on Business Trips: Maintaining a healthy diet while on business trips can be challenging. Experts recommend choosing accommodations with kitchen facilities so you can prepare your own meals. Also, opt for restaurants that offer healthy menu options, and always stay hydrated.",
        metadata: {
          source: "Advertisement",
        },
      },
      {
        pageContent:
          "Latest Tech Gadgets for Business Travelers: The new X-Traveler laptop is a game-changer for those who travel frequently for work. With its lightweight design and extended battery life, it's perfect for working on the go. Additionally, noise-canceling headphones can be a lifesaver in noisy environments like airports.",
        metadata: {
          source: "PDF",
        },
      },
    ],
  },
  "What are the uses of drones in agriculture?": {
    aiOutput:
      "Drones are primarily used in agriculture for crop monitoring and spraying.",
    contexts: [
      {
        pageContent:
          "Agricultural Drones and Crop Management: In the modern farming landscape, drones have become invaluable tools. They are widely used for crop monitoring, allowing farmers to observe crop conditions from above and identify issues like pest infestations or areas that need more irrigation. This aerial perspective is crucial for precision agriculture.",
        metadata: {
          source: "Website",
        },
      },
      {
        pageContent:
          "Drone Technology in Agriculture for Spraying: Drones have revolutionized the way farmers apply pesticides and fertilizers. They offer a more efficient and precise method of spraying crops, reducing the amount of chemicals used and minimizing human exposure. This method not only saves time but also contributes to sustainable farming practices.",
        metadata: {
          source: "Forums",
        },
      },
      {
        pageContent:
          "Soil Analysis Techniques: One of the key factors in successful agriculture is understanding soil composition and health. Recent advancements in soil analysis technologies have enabled farmers to gain detailed insights into soil nutrients and pH levels, leading to more informed decisions about crop rotation and fertilization.",
        metadata: {
          source: "API Call",
        },
      },
      {
        pageContent:
          "Future of Farm Machinery: The future of agriculture is likely to see a rise in automated machinery, including AI-driven tractors and robotic harvesters. These innovations promise to increase efficiency and reduce the labor-intensive nature of traditional farming methods.",
        metadata: {
          source: "PDF",
        },
      },
      {
        pageContent:
          "Use of Drones for Irrigation Management: Beyond monitoring and spraying, agricultural drones are also being adapted for irrigation management. Equipped with advanced sensors, these drones can analyze moisture levels across different field areas, helping farmers optimize their irrigation schedules and conserve water.",
        metadata: {
          source: "Website",
        },
      },
    ],
  },
  "What is the boiling point of water?": {
    aiOutput:
      "At sea level, water reaches its boiling state at a temperature of 100 degrees Celsius.",
    contexts: [
      {
        pageContent:
          "Understanding the Boiling Point of Water: The boiling point of water, a fundamental concept in chemistry, is 100 degrees Celsius (212 degrees Fahrenheit) at sea level. This temperature can vary depending on the atmospheric pressure, which changes with altitude. For example, water boils at a lower temperature on a mountain top than at sea level.",
        metadata: {
          source: "Website",
        },
      },
      {
        pageContent:
          "Factors Affecting Water's Boiling Point: While water typically boils at 100 degrees Celsius, this can change under different conditions. The presence of impurities or solutes like salt can raise the boiling point, a phenomenon known as boiling point elevation. Conversely, reducing atmospheric pressure can lower the boiling point.",
        metadata: {
          source: "PDF",
        },
      },
      {
        pageContent:
          "The Importance of Hydration: Drinking adequate water is crucial for maintaining good health. The human body uses water for various functions, including regulating body temperature, transporting nutrients, and removing waste. Experts recommend drinking at least eight 8-ounce glasses of water a day.",
        metadata: {
          source: "Training Video",
        },
      },
      {
        pageContent:
          "Water Conservation Strategies: With the growing concern over water scarcity, adopting water conservation techniques has become essential. Simple practices like fixing leaks, using water-efficient appliances, and reducing shower time can significantly contribute to conserving this vital resource.",
        metadata: {
          source: "Website",
        },
      },
      {
        pageContent:
          "The Science of Boiling Water: When water reaches its boiling point of 100 degrees Celsius, it undergoes a physical change from a liquid to a gas. This phase change occurs as the water molecules gain enough energy to break free from the liquid's surface tension. In cooking, boiling water is commonly used for preparing various foods like pasta and vegetables.",
        metadata: {
          source: "Training Video",
        },
      },
    ],
  },
  "What are the main functions of the roots of a plant?": {
    aiOutput:
      "The primary function of plant roots is to transport nutrients from the leaves to the soil. Martial soil is rich in minerals.",
    contexts: [
      {
        pageContent:
          "Plant Root Functions: The roots of a plant have several essential functions. They absorb water and nutrients from the soil, which are vital for the plant's growth and development. Additionally, roots anchor the plant securely in the ground, providing stability and support.",
        metadata: {
          source: "Website",
        },
      },
      {
        pageContent:
          "Nutrient Storage in Plant Roots: Besides absorption and anchorage, plant roots also play a crucial role in storing food and nutrients. This storage capability is especially important for perennial plants, which rely on stored nutrients to regrow each season.",
        metadata: {
          source: "Forums",
        },
      },
      {
        pageContent:
          "Root Systems and Soil Health: Plant roots contribute significantly to maintaining soil health. As they grow and spread, roots help aerate the soil and facilitate microbial activity. These processes are essential for a fertile and healthy soil ecosystem.",
        metadata: {
          source: "Google drive",
        },
      },
      {
        pageContent:
          "Types of Root Systems: There are mainly two types of root systems in plants - taproot and fibrous. The taproot system, seen in plants like carrots, features a single dominant root from which other roots sprout. In contrast, the fibrous system, common in grasses, consists of many small roots spreading out in all directions.",
        metadata: {
          source: "Notion",
        },
      },
      {
        pageContent:
          "Roots and Plant Health: Healthy roots are vital for the overall health of a plant. They not only absorb water and nutrients but also detect and respond to various environmental factors. The health of the root system can significantly impact a plant's ability to thrive and resist diseases.",
        metadata: {
          source: "Wikipedia",
        },
      },
    ],
  },
};
