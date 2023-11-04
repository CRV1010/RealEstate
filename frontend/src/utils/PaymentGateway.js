export default function PaymentGateway(amount) {

  var totalAmount = amount;

  return new Promise(async (resolve, reject) => {

    try {

      const data = await fetch("http://localhost:5000/razorpay", {
        method: "POST",
        body: JSON.stringify({ amount }),
        headers: {
          "Content-Type": "application/json",
        }
      }).then((t) => t.json());

      const options = {
        key: "rzp_test_H0imBRBCGuVydw",
        currency: data.currency,
        amount: data.amount,
        name: "Real Estate",
        description: "Wallet Transaction",
        image: "http://localhost:5000/logo.png",
        order_id: data.id,
        handler: function (response) {
          
          const razorpayPaymentId = response.razorpay_payment_id;
          
          // alert("PAYMENT ID ::" + razorpayPaymentId);
          // alert("ORDER ID :: " + response.razorpay_order_id);

          // Resolve the promise with the razorpay_payment_id
          resolve(totalAmount);
        },
        prefill: {
          name: "Shah Sanket",
          email: "shahsanket322003@gmail.com",
          contact: "9157573806",
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error("Error fetching data:", error);
      reject(error); // Reject the promise in case of an error
    }
  });
}

