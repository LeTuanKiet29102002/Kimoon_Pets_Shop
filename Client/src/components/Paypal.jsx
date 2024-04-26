// import { useEffect } from "react";
// import {
//     PayPalScriptProvider,
//     PayPalButtons,
//     usePayPalScriptReducer
// } from "@paypal/react-paypal-js";

// // This value is from the props in the UI
// const style = { layout: "vertical" };

// // Custom component to wrap the PayPalButtons and show loading spinner
// const ButtonWrapper = ({ currency, showSpinner, amount }) => {
//     const [{ isPending, options }, dispatch] = usePayPalScriptReducer();

//     useEffect(() => {
//         dispatch({
//             type: 'resetOptions',
//             value: {
//                 ...options,
//                 currency: currency,
//             }
//         })
//     }, [currency, showSpinner]);

//     return (
//         <>
//             {(showSpinner && isPending) && <div className="spinner" />}
//             <PayPalButtons
//                 style={style}
//                 disabled={false}
//                 forceReRender={[style, currency, amount]}
//                 fundingSource={undefined}
//                 createOrder={(data, actions) => 
//                     actions.order.create({
//                         purchase_units: [
//                             { amount: { currency_code: currency, value: amount } }
//                         ]
//                     }).then(orderId => orderId)
//                 }
//                 onApprove={(data, actions) => {
//                     actions.order.capture().then(async(response) => {
//                         console.log(response)
//                         // if(response.status==='COMPLETED'){
//                         // }
//                     })
//                 }}
//             />
//         </>
//     );
// }

// const Paypal = ({ amount }) => {
//     return (
//         <div style={{ maxWidth: "750px", minHeight: "200px" }}>
//             <PayPalScriptProvider options={{ clientId: "test", components: "buttons", currency: "USD" }}>
//                 <ButtonWrapper currency={'USD'} amount={amount} showSpinner={false} />
//             </PayPalScriptProvider>
//         </div>
//     );
// }

// export default Paypal;













// // import {
// //     PayPalScriptProvider,
// //     PayPalButtons,
// //     usePayPalScriptReducer
// // } from "@paypal/react-paypal-js";
// // import {useEffect} from "react"

// // // This value is from the props in the UI
// // const style = { "layout": "vertical" };

// // function createOrder(data, actions) {
// //     // replace this url with your server
// //     return fetch("https://react-paypal-js-storybook.fly.dev/api/paypal/create-order", {
// //         method: "POST",
// //         headers: {
// //             "Content-Type": "application/json",
// //         },
// //         // use the "body" param to optionally pass additional order information
// //         // like product ids and quantities
// //         body: JSON.stringify({
// //             purchase_units: [
// //                 { amount: { currency_code: currency, value: amount } }
// //             ],
// //         }),
// //     })
// //         .then((response) => response.json())
// //         .then((order) => {
// //             // Your code here after create the order
// //             return order.id;
// //         });
// // }
// // function onApprove(data) {
// //     // replace this url with your server
// //     return fetch("https://react-paypal-js-storybook.fly.dev/api/paypal/capture-order", {
// //         method: "POST",
// //         headers: {
// //             "Content-Type": "application/json",
// //         },
// //         body: JSON.stringify({
// //             orderID: data.orderID,
// //         }),
// //     })
// //         .then((response) => response.json())
// //         .then((orderData) => {
// //             // Your code here after capture the order
// //         });
// // }

// // // Custom component to wrap the PayPalButtons and show loading spinner
// // const ButtonWrapper = ({ currency, showSpinner, amount }) => {
// //         const [{ isPending, options }, dispatch] = usePayPalScriptReducer();

// //     useEffect(() => {
// //         dispatch({
// //             type: 'resetOptions',
// //             value: {
// //                 ...options,
// //                 currency: currency,
// //             }
// //         })
// //     }, [currency, showSpinner]);

// //     return (
// //         <>
// //             {(showSpinner && isPending) && <div className="spinner" />}
// //             <PayPalButtons
// //                 style={style}
// //                 disabled={false}
// //                 forceReRender={[style]}
// //                 fundingSource={undefined}
// //                 createOrder={createOrder}
// //                 onApprove={onApprove}
// //             />
// //         </>
// //     );
// // }

// // export default function Paypal({ amount }) {
// //     return (
// //         <div style={{ maxWidth: "750px", minHeight: "200px" }}>
// //             <PayPalScriptProvider options={{ clientId: "test", components: "buttons", currency: "USD" }}>
// //                 <ButtonWrapper currency={'USD'} amount={amount} showSpinner={false} />
// //             </PayPalScriptProvider>
// //         </div>
// //     );
// // }