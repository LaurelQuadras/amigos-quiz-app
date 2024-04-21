"use client";

import { dancing_script } from "@/app/fonts/fonts";
import SectionComponent from "../SectionComponent/SectionComponent";
import QuestionForm from "../QuestionForm/QuestionForm";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  GetSectionApiType,
  getApi,
  getSectionApi,
  postSectionsApi,
} from "@/app/api/apiRoutes";
import AddSectionComponent from "../AddSectionComponent/AddSectionComponent";

export default function AdminNewPage() {
  const [noOfQuestions, setNoOfQuestions] = useState<number>(1);
  const [sectionSelected, setSectionSelected] = useState<GetSectionApiType>();
  const [sectionsList, setSectionsList] = useState<GetSectionApiType[]>([]);

  const welcomeAdminText: string[] = "Welcome to Admin Panel".split(" ");
  const fillInformationText: string = "Please fill the following information.";

  const onNextButtonClick = (): void => {
    setNoOfQuestions((noOfQuestions) => noOfQuestions + 1);
  };

  const onPreviousButtonClick = (): void => {
    setNoOfQuestions((noOfQuestions) => noOfQuestions - 1);
  };

  const MotionButton = motion(Button);

  const onSectionOptionSelected = (value: string): void => {
    const getSectionSelected: GetSectionApiType = sectionsList.filter(
      (section: GetSectionApiType) => section.subject_name === value
    )[0];
    setSectionSelected(getSectionSelected);
  };

  const onAddNewSection = async (
    newSection: string,
    newDescription: string
  ): Promise<void> => {
    await postSectionsApi(newSection, newDescription);
    await getSectionList();
  };

  const getSectionList = async (): Promise<void> => {
    const response: GetSectionApiType[] = await getSectionApi();
    setSectionsList(response);
  };

  useEffect(() => {
    getSectionList();
    getApi();
  }, []);

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
      <div className="flex flex-col gap-4 m-4">
        <div className="flex gap-8 items-center">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 1,
              delay: 1.4,
            }}
            className="w-40"
          >
            Section
          </motion.span>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 1,
              delay: 1.4,
            }}
            className="flex gap-8 items-center text-sm"
          >
            <SectionComponent
              sectionsList={sectionsList.map(
                (section: GetSectionApiType) => section.subject_name
              )}
              onSectionOptionSelected={onSectionOptionSelected}
            />
            <AddSectionComponent onAddNewSection={onAddNewSection} />
            <div>Text</div>
          </motion.span>
        </div>
        {!sectionSelected && (
          <div className="flex flex-col gap-16">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 1,
                delay: 0,
              }}
              className="flex flex-col gap-4 border-2 p-4 rounded-lg"
            >
              <QuestionForm index={1} />
            </motion.div>
            {[...Array(noOfQuestions).splice(1)].map((e: number, i) => (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: 1,
                  delay: 0.1,
                }}
                className="flex flex-col gap-4 border-2 p-4 rounded-lg"
                key={i}
              >
                <QuestionForm index={i + 2} />
              </motion.div>
            ))}
          </div>
        )}
        {!sectionSelected && (
          <div className="flex justify-end gap-8">
            <MotionButton
              onClick={onPreviousButtonClick}
              disabled={noOfQuestions === 1}
              whileTap={{ scale: 0.8 }}
              className="bg-black text-white px-4 py-2 rounded-lg"
            >
              Previous{" "}
            </MotionButton>
            <MotionButton
              onClick={onNextButtonClick}
              disabled={noOfQuestions === 10}
              whileTap={{ scale: 0.8 }}
              className="bg-black text-white px-4 py-2 rounded-lg"
            >
              Next
            </MotionButton>
          </div>
        )}
      </div>
    </div>
  );
}
