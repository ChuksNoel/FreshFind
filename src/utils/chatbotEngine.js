import chatbotData from "../JSON/chatbot.json";
import marketsData from "../JSON/markets.json";
import produceData from "../JSON/produce.json";
import seasonalData from "../JSON/Seasonal.json";


const normalizeText = (text) => {
    return text.toLowerCase().trim();
};


// Detect a produce item
const findProduce = (message) => {
  const text = normalizeText(message);

  return produceData.find((produce) =>
    text.includes(produce.name.toLowerCase())
  );
};


// Detect a market
const findMarket = (message) => {
  const text = normalizeText(message);

  return marketsData.find((market) =>
      text.includes(market.name.toLowerCase())
  );
};


// Detect area/location
const findArea = (message) => {
  const text = normalizeText(message);

  return marketsData.find((market) =>
      text.includes(market.area.toLowerCase())
  );
};


// Detect day
const findDay = (message) => {
  const days = [
        "monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"
  ];
  const text = normalizeText(message);

  return days.find((day) =>
      text.includes(day)
  );
};


// MAIN CHATBOT FUNCTION
export const getBotResponse = (message) => {

    const text = normalizeText(message);

    // 1. PRODUCE SEARCH

    const produce = findProduce(message);

    if (
        produce &&
        (
            text.includes("where") ||
            text.includes("find") ||
            text.includes("buy") ||
            text.includes("market") ||
            text.includes("get")
        )
    ) {

        const markets = marketsData.filter((market) =>
            market.produce.some(
                (item) =>
                    item.toLowerCase() ===
                    produce.name.toLowerCase()
            )
        );


        if (markets.length > 0) {

            return {
                type: "markets",
                message: `I found ${markets.length} market(s) that usually have ${produce.name}.`,
                data: markets
            };

        }


        return {
            type: "text",
            message: `I couldn't find any market currently listing ${produce.name}.`
        };

    }


    // 2. MARKET DETAILS

    const market = findMarket(message);

    if (market) {

        // Opening hours
        if (
            text.includes("open") ||
            text.includes("close") ||
            text.includes("hour") ||
            text.includes("time")
        ) {

            return {
                type: "market",
                message:
                    `${market.name} opens at ${market.openingTime} and closes at ${market.closingTime}.`,
                data: market
            };

        }


        return {
            type: "market",
            message:
                `${market.name} is located in ${market.area}. ${market.description}`,
            data: market
        };

    }

    // 3. SEARCH BY LOCATION

    const detectedArea = findArea(message);

    if (detectedArea) {

        const markets = marketsData.filter(
            (market) =>
                market.area.toLowerCase() ===
                detectedArea.area.toLowerCase()
        );


        return {
            type: "markets",
            message:
                `I found ${markets.length} market(s) in ${detectedArea.area}.`,
            data: markets
        };

    }



    // =====================================
    // 4. SEARCH BY DAY
    // =====================================

    const day = findDay(message);

    if (day) {

        const markets = marketsData.filter((market) =>
            market.days.some(
                (marketDay) =>
                    marketDay.toLowerCase() === day
            )
        );


        if (markets.length > 0) {

            return {
                type: "markets",
                message:
                    `These markets operate on ${day.charAt(0).toUpperCase() + day.slice(1)}.`,
                data: markets
            };

        }


        return {
            type: "text",
            message:
                `I couldn't find any markets operating on ${day}.`
        };

    }

    // 5. OPEN TODAY
    if (
        text.includes("open today") ||
        text.includes("markets today") ||
        text.includes("market today")
    ) {

        const today = new Date()
            .toLocaleDateString("en-US", {
                weekday: "long"
            });


        const markets = marketsData.filter((market) =>
            market.days.includes(today)
        );


        if (markets.length > 0) {

            return {
                type: "markets",
                message:
                    `${markets.length} market(s) are scheduled to operate today.`,
                data: markets
            };

        }


        return {
            type: "text",
            message:
                "I couldn't find any markets scheduled to operate today."
        };

    }

    // 6. SEASONAL PRODUCE

    if (
        text.includes("season") ||
        text.includes("seasonal") ||
        text.includes("in season") ||
        text.includes("fresh now")
    ) {

        const currentMonth = new Date()
            .toLocaleString("en-US", {
                month: "long"
            });


        const seasonalItems = seasonalData.filter((item) =>
            item.months.includes(currentMonth)
        );


        if (seasonalItems.length > 0) {

            return {
                type: "seasonal",
                message:
                    `Here are some items in season this ${currentMonth}.`,
                data: seasonalItems
            };

        }


        return {
            type: "text",
            message:
                `I don't have seasonal recommendations for ${currentMonth} yet.`
        };

    }


    // 7. GENERAL CHATBOT RESPONSES

    const generalResponse = chatbotData.find((item) =>
        item.keywords.some((keyword) =>
            text.includes(keyword.toLowerCase())
        )
    );


    if (generalResponse) {

        return {
            type: "text",
            message: generalResponse.response
        };

    }
    // 8. FALLBACK
    return {
        type: "text",
        message:
            "I'm not sure about that yet. Try asking me about markets, locations, produce, opening days, opening hours or seasonal food."
    };

};
