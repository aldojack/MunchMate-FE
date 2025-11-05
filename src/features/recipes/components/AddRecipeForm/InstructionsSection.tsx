import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { RecipeDTO } from "../../../../types";
import { CTab, CTabContent, CTabList, CTabPanel, CTabs } from "@coreui/react";
import '@coreui/coreui/dist/css/coreui.min.css'


const InstructionsSection = ({
  formData,
  notify,
  updateFormData,
}: {
  formData: Pick<RecipeDTO, "instructions">;
  notify: (message: string) => void;
  updateFormData: (partialUpdate: Partial<RecipeDTO>) => void;
}) => {
  const [instruction, setInstruction] = useState<string>("");
  const [isAddingInstruction, setIsAddingInstruction] =
    useState<boolean>(false);
  const saveInstruction = (done: boolean = false) => {
    if (instruction.trim() === "") {
      console.log(
        "Unable to save blank text, please enter instruction or alternatively press cancel"
      );
      notify(
        "Unable to save blank text, please enter instruction or alternatively press cancel"
      );
      return;
    }
    updateFormData({ instructions: [...formData.instructions, instruction] });
    // setFormData((previousData: RecipeDTO) => {
    //   return {
    //     ...previousData,
    //     instructions: [...previousData.instructions, instruction],
    //   };
    // });
    setInstruction("");
    if (done) setIsAddingInstruction(false);
  };

  const handleInstructionChange = (e: { target: HTMLTextAreaElement }) => {
    const { value } = e.target;
    setInstruction(value);
  };

  return (
    <div className="md:grid md:col-span-2">
      <fieldset className="col-span-2 border-2 border-black px-2 rounded-md">
        <legend>
          Instructions:<span className="text-red-600 text-xl">*</span>
        </legend>
        {formData.instructions.length > 0 && (
          <CTabs defaultActiveItemKey="step-1">
            <CTabList variant="pills">
              {formData.instructions.map((_, index) => {
                const key = `step-${index + 1}`;
                return (
                  <CTab key={key} itemKey={key}>
                    Step {index + 1}
                  </CTab>
                );
              })}
            </CTabList>
            <CTabContent>
              {formData.instructions.map((step, index) => {
                const key = `step-${index + 1}`;
                return (
                  <CTabPanel key={key} className="p-3" itemKey={key}>
                    {step}
                  </CTabPanel>
                );
              })}
            </CTabContent>
          </CTabs>
        )}

        {isAddingInstruction ? (
          <>
            <div id="instructions" className="flex flex-col col-start-2 my-2">
              <textarea
                name="instructions"
                required
                rows={5}
                value={instruction}
                onChange={(e) => handleInstructionChange(e)}
                className="border-2 border-gray-400 focus:outline-2 focus:outline-blue-600 pl-2 rounded-md"
              ></textarea>
            </div>

            <div className="flex space-x-2 my-4 col-span-2 place-content-center">
              <button
                className="bg-green-600 rounded-lg text-white px-4 py-2 w-fit "
                type="button"
                onClick={() => saveInstruction(true)}
              >
                Done
                <AddIcon />
              </button>
              <button
                className="bg-blue-600 rounded-lg text-white px-4 py-2 w-fit "
                type="button"
                onClick={() => saveInstruction()}
              >
                Next Step
                <AddIcon />
              </button>
              <button
                className="bg-red-600 rounded-lg text-white px-4 py-2 w-fit "
                type="button"
                onClick={() => setIsAddingInstruction(false)}
              >
                Remove
                <AddIcon />
              </button>
            </div>
          </>
        ) : (
          <div className="flex space-x-2 col-start-2 my-4 place-content-center">
            <button
              className="bg-blue-600 rounded-lg text-white px-4 py-2 w-fit "
              type="button"
              onClick={() => setIsAddingInstruction(true)}
            >
              {formData.instructions.length <= 0 ? "First Step" : "Next Step"}

              <AddIcon />
            </button>
          </div>
        )}
      </fieldset>
    </div>
  );
};

export default InstructionsSection;
