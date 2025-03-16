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
import ExamUpdateDialog from "@/app/home/ExamUpdateDialog";

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
        <div className="flex gap-8 w-full">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 1,
              delay: 1.4,
            }}
            className="flex flex-col md:flex-row gap-16 items-center text-sm w-full"
          >
            <div className="w-screen text-sm md:text-xl">Sections</div>
            <div className="w-[1200px]">
              <ViewAllSectionsPopUp
                title="View All Sections"
                routeOnRowClick={false}
                routeUrlPath=""
              />
            </div>
            <div className="w-[1200px]">
              <AddSectionComponent onAddNewSection={onAddNewSection} />
            </div>
            <div className="w-[1200px]">
              <EditSectionsPopUp />
            </div>
            <div className="w-[1200px]">
              <DeleteSectionsPopUp />
            </div>
          </motion.span>
        </div>
        <div className="flex gap-8 w-full">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 1,
              delay: 1.4,
            }}
            className="flex flex-col md:flex-row gap-16 mt-16 md:mt-0 items-center text-sm w-full"
          >
            <div className="w-screen text-sm md:text-xl">
              Questions and Answers
            </div>
            <div className="w-[1200px]">
              <ViewAllSectionsPopUp
                title="View Questions and Answers"
                routeOnRowClick
                routeUrlPath={encodeURI("view")}
              />
            </div>
            <div className="w-[1200px]">
              <Link
                href="/admin/new"
                className="w-full cursor-pointer p-3 flex justify-center bg-white text-black border-2 rounded-lg hover:bg-gray-300 hover:text-white"
              >
                <div className="flex text-center">
                  Add Questions and Answers
                </div>
              </Link>
            </div>

            <div className="w-[1200px]">
              <ViewAllSectionsPopUp
                title="Edit Questions and Answers"
                routeOnRowClick
                routeUrlPath={encodeURI("edit")}
              />
            </div>
            <div className="w-[1200px]" />
          </motion.span>
        </div>
        <div className="flex gap-8 w-full">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 1,
              delay: 1.4,
            }}
            className="flex flex-col md:flex-row gap-16 mt-16 md:mt-0 items-center text-sm w-full"
          >
            <div className="w-screen text-sm md:text-xl">Exams</div>
            <div className="w-[1200px]">
              <Link
                href="/exams"
                className="w-full cursor-pointer p-3 flex justify-center bg-white text-black border-2 rounded-lg hover:bg-gray-300 hover:text-white"
              >
                <div>Create an Exam</div>
              </Link>
            </div>
            <div className="w-[1200px]">
              <div className="w-full max-w-full">
                <ExamUpdateDialog
                  height={11}
                  buttonWidth={"full"}
                  backgroundColor="white"
                  hoverBackgroundColor="white"
                  textColor="black"
                />
              </div>
            </div>
            <div className="w-[1200px]" />
            <div className="w-[1200px]" />
          </motion.span>
        </div>
      </div>
    </div>
  );
}
