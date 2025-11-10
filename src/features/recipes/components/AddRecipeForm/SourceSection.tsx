import React, { useState } from "react";
import FormInput from "../../../../components/Form/FormInput";
import { RecipeDTO } from "../../../../types";

const SourceSection = ({formData, updateFormData} : {formData : Pick<RecipeDTO, 'source'>, updateFormData: (partialUpdate : Partial<RecipeDTO>) => void}) => {
  interface SourceChecked{
    isWebsite: boolean;
    isBook: boolean
  }
  const [sourceChecked, setSourceChecked] = useState<SourceChecked>({
    isWebsite: false,
    isBook: false
  })

  
  const handleSourceChange = (e: { target: HTMLInputElement }) => {
    const { name, value } = e.target;
    updateFormData({ source: {...formData.source, [name]: value }});
  };
  return (
    <div className="md:grid md:col-span-2">
      <fieldset className="border border-gray-300 rounded-xl p-6 shadow-sm bg-white gap-y-8">
        <legend className="font-semibold text-lg px-2">Source</legend>
        <div className="flex space-x-4 items-center">
          <label htmlFor="websiteCheck" className="text-sm font-medium text-gray-700">
            Website
            <input
              type="checkbox"
              name="websiteCheck"
              id="websiteCheck"
              onChange={() =>
                setSourceChecked((previousState) => ({...previousState, isWebsite:!previousState.isWebsite}))
              }
              className="border-2 border-gray-400 pl-2 focus:outline-2 focus:outline-blue-600 rounded-md w-full"
              checked={sourceChecked.isWebsite}
            />
          </label>
          <label htmlFor="bookCheck" className="text-sm font-medium text-gray-700">
            Book
            <input
              type="checkbox"
              name="bookCheck"
              id="bookCheck"
              className="border-2 border-gray-400 pl-2 focus:outline-2 focus:outline-blue-600 rounded-md w-full"
              onChange={() =>
                setSourceChecked((previousState) => ({...previousState, isBook:!previousState.isBook}))
              }
              checked={sourceChecked.isBook}
            />
          </label>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <FormInput
            name="name"
            label="Name"
            required={true}
            type="text"
            data={formData.source.name}
            handleChange={handleSourceChange}
          />
          {sourceChecked.isWebsite && (
            <FormInput
              name="url"
              label="URL"
              type="text"
              data={formData.source.url}
              handleChange={handleSourceChange}
            />
          )}
          {sourceChecked.isBook && (
            <>
              <FormInput
                name="book"
                label="Book"
                type="text"
                data={formData.source.book}
                handleChange={handleSourceChange}
              />

              <FormInput
                name="pageNumber"
                label="Page Number"
                type="number"
                data={formData.source.pageNo}
                handleChange={handleSourceChange}
              />
            </>
          )}
        </div>
      </fieldset>
    </div>
  );
};

export default SourceSection;
