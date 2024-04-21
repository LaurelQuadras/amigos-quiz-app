"use client";

import { dancing_script } from "@/app/fonts/fonts";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { getSectionApi, postSectionsApi } from "@/app/api/apiRoutes";
import ViewAllSectionsPopUp from "../ViewAllSectionsPopUp/ViewAllSectionsPopUp";
import EditSectionsPopUp from "../../EditSectionsPopUp/EditSectionsPopUp";
import DeleteSectionsPopUp from "../DeleteSectionsPopUp/DeleteSectionsPopUp";
import AddSectionComponent from "../AddSectionComponent/AddSectionComponent";
import Link from "next/link";

export default function AdminHomePage() {
  const welcomeAdminText: string[] = "Welcome to Admin Panel".split(" ");
  const fillInformationText: string = "What would you like to do?";

  const onAddNewSection = async (
    newSection: string,
    newDescription: string
  ): Promise<void> => {
    await postSectionsApi(newSection, newDescription);
  };

  return (
    <div className="flex flex-col h-full w-full gap-16 m-8">
      <span className={`${dancing_script.className} text-6xl`}>
        {welcomeAdminText.map((el, i) => (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 2,
              delay: i / 10,
            }}
            key={i}
          >
            {el}{" "}
          </motion.span>
        ))}
      </span>
      <span className="text-4xl">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 2,
            delay: 1.2,
          }}
        >
          {fillInformationText}
        </motion.span>
      </span>
      <div className="flex flex-col gap-4 mx-28 my-4">
        <div className="flex gap-8 items-center w-full">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 1,
              delay: 1.4,
            }}
            className="flex gap-16 items-center text-sm w-full"
          >
            <ViewAllSectionsPopUp />
            <AddSectionComponent onAddNewSection={onAddNewSection} />
            <EditSectionsPopUp />
            <DeleteSectionsPopUp />
          </motion.span>
        </div>
        <div className="flex gap-8 items-center w-full">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 1,
              delay: 1.4,
            }}
            className="flex gap-16 items-center text-sm w-full"
          >
            <div className="w-full cursor-pointer p-3 flex justify-center bg-white text-black border-2 rounded-lg hover:bg-gray-300 hover:text-white">
              View Questions and Answers
            </div>
            <Link
              href="/admin/new"
              className="w-full cursor-pointer p-3 flex justify-center bg-white text-black border-2 rounded-lg hover:bg-gray-300 hover:text-white"
            >
              <div>Add Questions and Answers</div>
            </Link>
            <div className="w-full cursor-pointer p-3 flex justify-center bg-white text-black border-2 rounded-lg hover:bg-gray-300 hover:text-white">
              Edit Questions and Answers
            </div>
          </motion.span>
        </div>
      </div>
    </div>
  );
}
