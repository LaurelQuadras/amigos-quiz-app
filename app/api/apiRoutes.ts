"use client";

export const getApi = async () => {
  try {
    const response: Response = await fetch(
      "https://gamewithcolors.online/getTime",
      {
        method: "POST",
      }
    );
    return await response.json();
  } catch {
    console.log("Failed api get sample");
  }
};

export const postSectionsApi = async (name: string, description: string) => {
  console.log("Here ", name, description);
  try {
    const response: Response = await fetch(
      "https://gamewithcolors.online/exams/subjects",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subject_name: name,
          subject_description: description,
        }),
      }
    );
    return await response.json();
  } catch {
    console.log("Failed api post section");
  }
};

type GetSectionApiType = {
  subject_id: string;
  subject_name: string;
  subject_description: string;
};

export const getSectionApi = async (): Promise<string[]> => {
  console.log("Here ");
  try {
    const response: Response = await fetch(
      "https://gamewithcolors.online/exams/subjects",
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    const result: GetSectionApiType[] = await response.json();
    return result.map((value: GetSectionApiType) => value.subject_name);
  } catch {
    console.log("Failed api get section");
    return [];
  }
};
