// "use client";
// import { useUser } from "@clerk/nextjs";
// import React, { useEffect } from "react";
// import { UserDetailContext } from "./_context/UserDetailContext";
// import { PayPalScriptProvider } from "@paypal/react-paypal-js";
// function Provider({ children }) {
//   const { user } = useUser();
//   const [userDetail, setUserDetail] = useState([]);
//   useEffect(() => {
//     user && verifyUser();
//   }, [user]);

//   const verifyUser = async () => {
//     const dataResult = await axios.post("/api/verify-user", {
//       user: user,
//     });
//     setUserDetail(dataResult.data.result);
//     console.log(dataResult.data);
//   };

//   return (
//     <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
//       <PayPalScriptProvider
//         options={{ clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID }}
//       >
//         <div>{children}</div>
//       </PayPalScriptProvider>
//     </UserDetailContext.Provider>
//   );
// }

// export default Provider;

// app/Provider.jsx
"use client";

import React, { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs"; // already had this
import axios from "axios"; // ← missing import
import { UserDetailContext } from "./_context/UserDetailContext";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

function Provider({ children }) {
  const { user } = useUser();
  const [userDetail, setUserDetail] = useState(null); // start with null (or {})

  useEffect(() => {
    if (user) {
      verifyUser();
    }
  }, [user]);

  const verifyUser = async () => {
    try {
      const dataResult = await axios.post("/api/verify-user", {
        user: user,
      });
      // whatever shape your API returns—often an object with { credits, name, … }
      setUserDetail(dataResult.data.result);
      console.log("Verified userDetail:", dataResult.data.result);
    } catch (err) {
      console.error("verifyUser failed:", err);
    }
  };

  return (
    <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
      <PayPalScriptProvider
        options={{ clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID }}
      >
        {children}
      </PayPalScriptProvider>
    </UserDetailContext.Provider>
  );
}

export default Provider;
