import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import { Id } from "react-toastify";
import { RecipeDTO } from "@/types";
import StepTabs from "./StepTabs";

const InstructionsSection = ({
  formData,
  notify,
  updateFormData,
}: {
  formData: Pick<RecipeDTO, "instructions">;
  notify: (message: string) => Id;
  updateFormData: (partialUpdate: Partial<RecipeDTO>) => void;
}) => {
  const [instruction, setInstruction] = useState<string>("");
  const [isAddingInstruction, setIsAddingInstruction] =
    useState<boolean>(false);
  const [editingInstruction, setEditingInstruction] = useState<
    number | undefined
  >(undefined);
  const saveInstruction = (done: boolean = false) => {
    if (instruction.trim() === "") {
      console.error(
        "Unable to save blank text, please enter instruction or alternatively press cancel",
      );
      notify?.(
        "Unable to save blank text, please enter instruction or alternatively press cancel",
      );
      setIsAddingInstruction(false);
      return;
    }
    if (editingInstruction === undefined) {
      updateFormData({ instructions: [...formData.instructions, instruction] });
    } else {
      const foundInstruction = formData.instructions[editingInstruction];
      if (foundInstruction) {
        const updatedInstructions = formData.instructions.map((_, index) =>
          index === editingInstruction ? instruction : _,
        );
        updateFormData({
          instructions: [...updatedInstructions],
        });
        setEditingInstruction(undefined);
      }
    }

    setInstruction("");
    if (done) setIsAddingInstruction(false);
  };

  const handleInstructionChange = (e: { target: HTMLTextAreaElement }) => {
    const { value } = e.target;
    setInstruction(value);
  };

  const handleDeleteInstruction = (index: number) => {
    const foundInstruction = formData.instructions[index];
    if (foundInstruction) {
      setIsAddingInstruction(false);
      updateFormData({
        instructions: formData.instructions.filter((_, i) => i !== index),
      });
    }
  };

  const handleEditInstruction = (index: number) => {
    const foundInstruction = formData.instructions[index];
    if (foundInstruction) {
      setIsAddingInstruction(true);
      setEditingInstruction(index);
      setInstruction(foundInstruction);
    }
  };

  return (
    <div className="md:grid md:col-span-2">
      <fieldset className="border border-accent rounded-xl p-6 shadow-sm bg-background gap-y-8">
        <legend className="text-lg font-semibold text-secondary flex items-center gap-2">
          <FormatListNumberedIcon className="text-primary" />
          Instructions<span className="text-red-600 text-xl">*</span>
        </legend>
        {formData.instructions.length > 0 && (
          <StepTabs
            steps={formData.instructions}
            handleDeleteInstruction={handleDeleteInstruction}
            handleEditInstruction={handleEditInstruction}
          />
        )}

        {isAddingInstruction ? (
          <>
            <div id="instructions" className="flex flex-col my-2">
              <textarea
                name="instructions"
                required
                rows={5}
                maxLength={1000}
                value={instruction}
                onChange={(e) => handleInstructionChange(e)}
                className="border-2 border-gray-400 focus:outline-2 focus:outline-blue-600 pl-2 rounded-md bg-background"
              ></textarea>
            </div>

            <div className="flex space-x-2 my-4 col-span-2 place-content-center">
              <button
                className="bg-secondary hover:bg-secondary/80 rounded-lg text-white px-4 py-2 w-fit transition"
                type="button"
                onClick={() => saveInstruction(true)}
              >
                Done
                <AddIcon />
              </button>
              <button
                className="bg-primary hover:bg-primary/80 rounded-lg text-white px-4 py-2 w-fit transition"
                type="button"
                onClick={() => saveInstruction()}
              >
                Next Step
                <AddIcon />
              </button>
              <button
                className="bg-accent hover:bg-accent/80 rounded-lg text-white px-4 py-2 w-fit transition"
                type="button"
                onClick={() => {
                  setIsAddingInstruction(false);
                  setInstruction("");
                }}
              >
                Remove
                <AddIcon />
              </button>
            </div>
          </>
        ) : (
          <div className="flex space-x-2 col-start-2 my-4 place-content-center">
            <button
              className="bg-primary hover:bg-primary/80 rounded-lg text-white px-4 py-2 w-fit transition"
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
