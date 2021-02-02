const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  host: process.env.HOST,
  port: process.env.PORT,
  secure: true, //ssl
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PSW,
  },
});

exports.handler = async ({ headers, body }) => {
  const sig = headers["stripe-signature"];
  let event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (error) {
    return {
      statusCode: 400,
      body: `Webhook error ${error.message}`,
    };
  }

  if (event.type === "checkout.session.completed") {
    const webhookSession = event.data.object;
    const session = await stripe.checkout.sessions.retrieve(webhookSession.id, {
      expand: ["line_items"],
    });
    const items = session.line_items.data;
    const prezzoUnitario = +items[0].price.unit_amount / 100;
    const costoOrdine = +items[0].amount_total / 100;
    const shippingDetails = webhookSession.shipping;
    console.log("items", items);
    console.log("Shipping", shippingDetails);

    try {
      const info = await transporter.sendMail({
        from: '"Stefano Frontini" <info@pilloledienergia.com>',
        to: "stefanofrontini75@gmail.com",
        subject: `Nuovo ordine da ${shippingDetails.name}`,
        text: `Descrizione: ${items[0].description}
        Prezzo unitario: ${prezzoUnitario}€
        Quantità: ${items[0].quantity}
        Costo ordine: ${costoOrdine}€

        Indirizzo a cui inviare la merce:
        ${shippingDetails.name}
        ${shippingDetails.address.line1}
        ${shippingDetails.address.line2}
        ${shippingDetails.address.postal_code} ${
          shippingDetails.address.city
        } ${shippingDetails.address.state}
        ${shippingDetails.address.country}`,
      });
      console.log(
        `Report with Id: ${info.messageId} sent to: stefanofrontini75@gmail.com`
      );

      return {
        statusCode: 200,
        body: JSON.stringify({ received: true }),
      };
    } catch (err) {
      console.error(`Stripe webhook failed with ${err}`);
      return {
        statusCode: 500,
        body: `Webhook Error: ${err.message}`,
      };
    }
  }

  //TODO read out the shipping address
  // TODO read out the line items

  // TODO send email

  return {
    statusCode: 200,
    body: "success",
  };
};
