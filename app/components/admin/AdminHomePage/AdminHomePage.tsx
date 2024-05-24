"use client";

import { output_script } from "@/app/fonts/fonts";
import { motion } from "framer-motion";
import { postSectionsApi, postSubSubjectApi } from "@/app/api/apiRoutes";
import ViewAllSectionsPopUp from "../ViewAllSectionsPopUp/ViewAllSectionsPopUp";
import EditSectionsPopUp from "../EditSectionsPopUp/EditSectionsPopUp";
import DeleteSectionsPopUp from "../DeleteSectionsPopUp/DeleteSectionsPopUp";
import AddSectionComponent from "../AddSectionComponent/AddSectionComponent";
import Link from "next/link";
import { AuthorityEnums } from "../QuestionForm/QuestionForm";

export default function AdminHomePage() {
  const welcomeAdminText: string[] = "Welcome to Admin Panel".split(" ");
  const fillInformationText: string = "What would you like to do?";

  const onAddNewSection = async (
    newSection: string,
    newDescription: string,
    newSubSection: string,
    newSubSubjectDescriptionValue: string,
    newAuthority: AuthorityEnums
  ): Promise<void> => {
    const subjectId: any = await postSectionsApi(
      newSection,
      newDescription,
      newAuthority
    );
    if (subjectId.subject_id) {
      await postSubSubjectApi(
        subjectId.subject_id,
        newSubSection,
        newSubSubjectDescriptionValue
      );
    }
  };

  return (
    <div className="flex flex-col h-full w-full gap-16 text-white">
      <span className={`${output_script.className} mx-4 text-3xl md:text-6xl`}>
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
      <span className="mx-4 text-xl md:text-4xl">
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
      <div className="flex flex-col gap-8 mx-4 md:mx-28 my-4">
        <div className="flex gap-8 items-center w-full">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 1,
              delay: 1.4,
            }}
            className="flex flex-col md:flex-row gap-16 items-center text-sm w-full"
          >
            <ViewAllSectionsPopUp
              title="View All Sections"
              routeOnRowClick={false}
              routeUrlPath=""
            />
            <div className="w-full">
              <AddSectionComponent onAddNewSection={onAddNewSection} />
            </div>
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
            className="flex flex-col md:flex-row gap-16 mt-16 md:mt-0 items-center text-sm w-full"
          >
            <div className="w-full">
              <ViewAllSectionsPopUp
                title="View Questions and Answers"
                routeOnRowClick
                routeUrlPath={encodeURI("view")}
              />
            </div>
            <Link
              href="/admin/new"
              className="w-full cursor-pointer p-3 flex justify-center bg-white text-black border-2 rounded-lg hover:bg-gray-300 hover:text-white"
            >
              <div>Add Questions and Answers</div>
            </Link>
            <div className="w-full">
              <ViewAllSectionsPopUp
                title="Edit Questions and Answers"
                routeOnRowClick
                routeUrlPath={encodeURI("edit")}
              />
            </div>
          </motion.span>
        </div>
      </div>
    </div>
  );
}
