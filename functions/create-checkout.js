const axios = require("axios");
const fetch = require("node-fetch");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
async function getProdottos() {
  try {
    const response = await fetch(
      "https://partsncode.herokuapp.com/prodottos?_limit=-1"
    )
      .then((res) => res.json())
      .catch((err) => console.error(err));

    return Promise.resolve(response);
  } catch (error) {
    console.error(error);
  }
}

exports.handler = async (event) => {
  const inventory = await getProdottos();
  const { codice, quantity } = JSON.parse(event.body);

  const product = inventory.find((p) => p.codice === codice);

  console.log("product:", product);

  const validatedQuantity = quantity > 0 && quantity < 11 ? quantity : 1;

  const cents = product.prezzo * 100;

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    billing_address_collection: "auto",
    shipping_address_collection: {
      allowed_countries: ["IT"],
    },
    success_url: `${process.env.URL}/success/`,
    cancel_url: process.env.URL,
    line_items: [
      {
        name: product.codice,
        description: product.descrizione,
        images: [product.immagine_principale.url],
        amount: cents,
        currency: "EUR",
        quantity: validatedQuantity,
      },
    ],
  });

  return {
    statusCode: 200,
    body: JSON.stringify({
      sessionId: session.id,
      publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    }),
  };
};
