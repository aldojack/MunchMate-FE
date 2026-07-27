import { DAYS, MEAL_TYPES } from "@/constants/constants";
import { DaysType, MealType } from "@/types";
import { stringToTitleCase } from "@/utils/helperFunction";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useState } from "react";

type PlannerModalProps = {
  open: boolean;
  toggleModal: () => void;
  savePlanner: (day: DaysType, mealType: MealType) => void;
};

const PlannerModal = ({
  open,
  toggleModal,
  savePlanner,
}: PlannerModalProps) => {
  const [daySelected, setDaySelected] = useState<DaysType | null>(null);
  const [mealTypeSelected, setmealTypeSelected] = useState<MealType | null>(
    null,
  );
  const isReadyToAdd = daySelected !== null && mealTypeSelected !== null;

  return (
    <Dialog open={open} maxWidth="md">
      <DialogTitle
        sx={(theme) => ({
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
        })}
      >
        Planner
      </DialogTitle>
      <DialogContent dividers={true}>
        <div className="flex flex-col gap-4">
          <div>
            <DialogContentText>
              Select which day to add the meal to
            </DialogContentText>
            <div className="flex gap-4 flex-wrap">
              {DAYS.map((day) => (
                <label
                  key={day}
                  className="has-[:checked]:bg-primary has-[:checked]:text-white cursor-pointer rounded-md px-2 "
                >
                  <input
                    type="radio"
                    value={day}
                    name="dayChoice"
                    className="hidden"
                    onClick={() => setDaySelected(day)}
                  />

                  {stringToTitleCase(day)}
                </label>
              ))}
            </div>
          </div>
          {daySelected && (
            <div>
              <DialogContentText>
                Select when your having this meal
              </DialogContentText>
              <div className="flex gap-4">
                {MEAL_TYPES.map((mealType) => (
                  <label
                    key={mealType}
                    className="has-[:checked]:bg-primary has-[:checked]:text-white cursor-pointer rounded-md px-2 "
                  >
                    <input
                      type="radio"
                      value={mealType}
                      name="mealTypeChoice"
                      className="hidden"
                      onClick={() => setmealTypeSelected(mealType)}
                    />
                    {stringToTitleCase(mealType)}
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
      <DialogActions>
        <div className="flex justify-center items-center mx-auto gap-2">
          {isReadyToAdd && (
            <button
              className="bg-primary text-white px-4 rounded-md"
              onClick={() => {
                savePlanner(daySelected, mealTypeSelected);
                toggleModal();
              }}
            >
              Save
            </button>
          )}
          <button
            onClick={() => {
              setDaySelected(null);
              setmealTypeSelected(null);
              toggleModal();
            }}
            className={`${isReadyToAdd ? "bg-secondary" : "bg-primary"} text-white px-4 rounded-md`}
          >
            Close
          </button>
        </div>
      </DialogActions>
    </Dialog>
  );
};

export default PlannerModal;
