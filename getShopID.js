// const fetch = require("node-fetch");

// const PRINTIFY_API_KEY =
//   "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzN2Q0YmQzMDM1ZmUxMWU5YTgwM2FiN2VlYjNjY2M5NyIsImp0aSI6Ijk5ZDY3OWM2MWQwZDMwYjU2MDdmMTk5N2E2ZGE5N2Y5ZmQ0NWVlZThkODcxNTE4ZDIyOGU4ZTYxYThkMmFjYmQyNjc0ZTFlNDM0MTljOTk1IiwiaWF0IjoxNzM1MTkzODM2LjUxNDI3LCJuYmYiOjE3MzUxOTM4MzYuNTE0MjcyLCJleHAiOjE3NjY3Mjk4MzYuNTAyNzY0LCJzdWIiOiIyMTE0NDExOCIsInNjb3BlcyI6WyJzaG9wcy5tYW5hZ2UiLCJzaG9wcy5yZWFkIiwiY2F0YWxvZy5yZWFkIiwib3JkZXJzLnJlYWQiLCJvcmRlcnMud3JpdGUiLCJwcm9kdWN0cy5yZWFkIiwicHJvZHVjdHMud3JpdGUiLCJ3ZWJob29rcy5yZWFkIiwid2ViaG9va3Mud3JpdGUiLCJ1cGxvYWRzLnJlYWQiLCJ1cGxvYWRzLndyaXRlIiwicHJpbnRfcHJvdmlkZXJzLnJlYWQiLCJ1c2VyLmluZm8iXX0.Aqur-ViBMn3wYqzvrF_nNklxOjsG7-fDwgQD3PUpvg8vv9_yUjusAK19FY3D8t5MJ8RlpAvymK64XbkTDIw";

// async function getShopID() {
//   try {
//     const response = await fetch("https://api.printify.com/v1/shops.json", {
//       method: "GET",
//       headers: {
//         Authorization: `Bearer ${PRINTIFY_API_KEY}`,
//       },
//     });

//     if (!response.ok) {
//       throw new Error(
//         `Failed to fetch shops: ${response.status} ${response.statusText}`
//       );
//     }

//     const shops = await response.json();
//     console.log("Your Shops:", shops);

//     shops.forEach((shop, index) => {
//       console.log(`Shop ${index + 1}:`);
//       console.log(`ID: ${shop.id}`);
//       console.log(`Title: ${shop.title}`);
//     });
//   } catch (error) {
//     console.error("Error fetching shop IDs:", error.message);
//   }
// }

// getShopID();

// /* Shop 1:
// ID: 19732715
// Title: AristoVLT
// Shop 2:
// ID: 19737491
// Title: ARISTO VAULT
// */