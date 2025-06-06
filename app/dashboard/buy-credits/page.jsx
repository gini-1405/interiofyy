"use client";
import { UserDetailContext } from "@/app/_context/UserDetailContext";
import { db } from "@/config/db";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { useRouter } from "next/navigation";
import React, { useContext, useState } from "react";

function BuyCredits() {
  const creditsOption = [
    { credits: 5, amount: 0.99 },
    { credits: 10, amount: 1.99 },
    { credits: 25, amount: 3.99 },
    { credits: 50, amount: 6.99 },
    { credits: 100, amount: 9.99 },
  ];
  const [selectedOption, setSelectedOption] = useState([]);
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const router = useRouter();
  const onPaymentSuccess = async () => {
    console.log("payment success");
    // update credits
    const result = await db
      .update(Users)
      .set({
        credits: setUserDetial?.credits + selectedOption.credits,
      })
      .returning({ id: Users.id });
    if (result) {
      setUserDetial((prev) => ({
        ...prev,
        credits: setUserDetial?.credits + selectedOption.credits,
      }));
      router.push("/dashboard");
    }
  };
  return (
    <div>
      <h2 className="font-bold text-2xl">Buy More Credits</h2>
      <p>
        Unlock endless possibilisties - Buy more credits and transfer your room
      </p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-2">
        {creditsOption.map((item, index) => (
          <div
            className={`flex flex-col gap-2 justify-center items-center primary-text ${
              selectedOption?.credits == item.credits && "border-primary"
            }`}
          >
            <h2 className="font-bold text-3xl">{item.credits}</h2>
            <h2 className="font-medium text-primary">${item.amount}</h2>
          </div>
        ))}
      </div>
      <div className="mt-20">
        {selectedOption?.amount && (
          <PayPalButtons
            style={{ layout: "horizontal" }}
            onApprove={() => onPaymentSuccess()}
            onCancel={() => console.log("payment cancelled")}
            createOrder={(data, actions) => {
              return actions?.order.create({
                purchase_units: [
                  {
                    amount: {
                      value: selectedOption?.amount?.toFixed(2),
                      currency_code: "USD",
                    },
                  },
                ],
              });
            }}
          />
        )}
      </div>
    </div>
  );
}
