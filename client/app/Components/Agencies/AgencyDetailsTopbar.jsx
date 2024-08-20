import { usePathname, useRouter } from "next/navigation";
import React from "react";

const AgencyDetailsTopbar = () => {
  const history = useRouter();
  const pathname = usePathname();

  return (
    <div className="mb-3">
      {[
        { title: "About", route: "/agencies/alpha-solutions" },
        {
          title: "Edit Profile",
          route: "/agencies/alpha-solutions/edit-profile",
        },
      ].map((e, i) => {
        return (
          <button
            key={i}
            className={`${
              pathname == e?.route
                ? "bg-newPurple"
                : "bg-transparent text-newPurple"
            } font-semibold px-7 py-2 rounded-md mr-2`}
            onClick={() => {
              history.push(e?.route);
            }}
          >
            {e?.title}
          </button>
        );
      })}
    </div>
  );
};

export default AgencyDetailsTopbar;
