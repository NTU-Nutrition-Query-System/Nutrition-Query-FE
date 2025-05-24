export default {
    title: "Nutrition Note",
    subtitle: "Understand the Nutritional Components of Food and Daily Nutrient Requirements",
    section: [
        {
            "title": "Database Usage Guide",
            content: [
                "This food database is designed for secondary school students and focuses on simplicity and clarity. The descriptions of food items in this database are primarily aimed at making them easy for middle school students to understand; therefore, item names are kept as concise as possible.",
                "Although not explicitly stated, most of the nutritional values for whole foods are calculated based on the \"edible portion,\" such as peeled and cored apples or skinless, boneless chicken thighs. However, the weight of the food is calculated as the total weight, including inedible parts. This approach ensures that the information is accessible to younger audiences while maintaining nutritional accuracy.",
            ],
        },
        {
            "title": "Nutrient Classification Standard",
            "content": [
                "The descriptions of food items in the database use color-coded backgrounds to visually indicate the levels of nutrients: high (red), moderate (yellow), and low (green). This color-coding system aims to facilitate quick visual recognition of nutrient content. ",
                "The standards for these three nutrient categories are as follows:"
            ],
        }
    ],
    table: {
      standard: "Level",
      carbohydrate: "Carbohydrates",
      protein: "Protein",
      fat: "Fat",
      background_color: "Background Color",
      data: [
        {
          "name": "High",
          "carbohydrate": "> 60 g",
          "protein": "> 14 g",
          "fat": "> 10 g",
          "color": "Red"
        },
        {
          "name": "Medium",
          "carbohydrate": "30–60 g",
          "protein": "7~14 g",
          "fat": "5~10 g",
          "color": "Yellow"
        },
        {
          "name": "Low",
          "carbohydrate": "< 30 g",
          "protein": "< 7 g",
          "fat": "< 5 g",
          "color": "Green"
        }
      ]
    },
};