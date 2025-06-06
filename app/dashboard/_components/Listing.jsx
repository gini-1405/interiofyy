// "use client";
// import React, { useEffect, useState } from "react";
// import { useUser } from "@clerk/clerk-react";
// import { Button } from "@/components/ui/button";
// import EmptyState from "./EmptyState";
// import { db } from "@/config/db";
// import Link from "next/link";
// import { AiGeneratedImage } from "@/config/schema";
// import RoomDesignCard from "./RoomDesignCard";
// function Listing() {
//   const { user } = useUser();
//   const [userRoomList, setUserRoomList] = useState([]);
//   useEffect(() => {
//     user && GetUserRoomList();
//   }, [user]);
//   const GetUserRoomList = async () => {
//     const result = await db
//       .select()
//       .from(AiGeneratedImage)
//       .where(eq(AiGeneratedImage.userEmail, user?.primaryEmailAddress));
//     setUserRoomList(result);
//     console.log(result);
//   };
//   return (
//     <div>
//       <div className="flex items-center justify-between">
//         <h2 className="font-bold text-3xl">Hello , {user?.fullName}</h2>
//         <Link href={"/dashboard/create-new"}>
//           <Button>+ Redesign Room</Button>
//         </Link>
//       </div>
//       {userRoomList.length === 0 ? (
//         <EmptyState />
//       ) : (
//         <div className="mt-10">
//           <h2 className="font-medium text-primary text-xl mb-10">
//             AI Room Studio
//           </h2>
//           <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-10">
//             {userRoomList.map((room, index) => (
//               <RoomDesignCard key={index} room={room} />
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
// export default Listing;

// "use client";
// import React, { useEffect, useState } from "react";
// import { useUser } from "@clerk/clerk-react";
// import { Button } from "@/components/ui/button";
// import EmptyState from "./EmptyState";
// import Link from "next/link";
// import RoomDesignCard from "./RoomDesignCard";

// function Listing() {
//   const { user } = useUser();
//   const [userRoomList, setUserRoomList] = useState([]);

//   useEffect(() => {
//     if (user?.primaryEmailAddress) {
//       fetch(
//         `/api/user-room-list?userEmail=${encodeURIComponent(
//           user.primaryEmailAddress
//         )}`
//       )
//         .then((res) => res.json())
//         .then((data) => setUserRoomList(data))
//         .catch((err) => console.error(err));
//     }
//   }, [user]);

//   return (
//     <div>
//       <div className="flex items-center justify-between">
//         <h2 className="font-bold text-3xl">Hello , {user?.fullName}</h2>
//         <Link href={"/dashboard/create-new"}>
//           <Button>+ Redesign Room</Button>
//         </Link>
//       </div>
//       {userRoomList.length === 0 ? (
//         <EmptyState />
//       ) : (
//         <div className="mt-10">
//           <h2 className="font-medium text-primary text-xl mb-10">
//             AI Room Studio
//           </h2>
//           <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-10">
//             {userRoomList.map((room, index) => (
//               <RoomDesignCard key={index} room={room} />
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Listing;

"use client";

import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import EmptyState from "./EmptyState";
import Link from "next/link";
import RoomDesignCard from "./RoomDesignCard";

function Listing() {
  const { user } = useUser();
  const [userRoomList, setUserRoomList] = useState([]);

  useEffect(() => {
    if (!user?.primaryEmailAddress) return;

    fetch(
      `/api/user-room-list?userEmail=${encodeURIComponent(
        user.primaryEmailAddress
      )}`
    )
      .then(async (res) => {
        // 1. If server responded with an error status, read text and throw
        if (!res.ok) {
          const text = await res.text();
          throw new Error(`API error ${res.status}: ${text}`);
        }

        // 2. Make sure we got JSON back
        const contentType = res.headers.get("content-type") || "";
        if (!contentType.includes("application/json")) {
          throw new Error("Invalid JSON response");
        }

        // 3. Now safely parse JSON
        return res.json();
      })
      .then((data) => {
        // Ensure we always set an array
        setUserRoomList(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        console.error("Fetch error:", err.message);
      });
  }, [user]);

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-3xl">Hello, {user?.fullName}</h2>
        <Link href="/dashboard/create-new">
          <Button>+ Redesign Room</Button>
        </Link>
      </div>

      {userRoomList.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="mt-10">
          <h2 className="font-medium text-primary text-xl mb-10">
            AI Room Studio
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {userRoomList.map((room, i) => (
              <RoomDesignCard key={i} room={room} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Listing;
