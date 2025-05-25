export default {
    title: "營養說明",
    subtitle: "了解食物的營養成分以及每日營養素需求",
    section: [
        {
            "title": "資料庫使用說明",
            "content": [
                "本資料庫中的食物品項之描述，主要是以讓中學生容易理解為主，因此品項名稱儘量表持簡潔。",
                "雖然沒有詳細註明，但是大部分的原型食品的營養素都是以「可食部分」為計算，例如蘋果是以去皮去核為主；雞腿則以去皮去骨為計算。但食物的重量則是以整體計算。"
            ]
        },
        {
            "title": "營養素分類標準",
            "content": [
                "資料庫中的食物品項之營養素，為方便視覺化辨認，依照其營養素的分量，在背景以高(紅色)、中(黃色)、與低(綠色)三個顏色標註。",
                "三類營養素的份量標準如下："
            ]
        }
    ],
    table: {
      standard: "營養素份量",
      carbohydrate: "醣類",
      protein: "蛋白質",
      fat: "脂肪",
      background_color: "背景顏色標註",
      high: "高",
      medium: "中",
      low: "低",
      data: [
        {
          "name": "高",
          "carbohydrate": "> 60 g",
          "protein": "> 14 g",
          "fat": "> 10 g",
          "color": "紅色"
        },
        {
          "name": "中",
          "carbohydrate": "30–60 g",
          "protein": "7~14 g",
          "fat": "5~10 g",
          "color": "黃色"
        },
        {
          "name": "低",
          "carbohydrate": "< 30 g",
          "protein": "< 7 g",
          "fat": "< 5 g",
          "color": "綠色"
        }
      ]
    },
};