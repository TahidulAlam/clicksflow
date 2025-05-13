import { Controller, Control, FieldErrors } from "react-hook-form";

import { timeOptions } from "./attributionOptions";
import { AttributionFormData } from "./validationSchemas";
import ToggleSwitch from "@/components/shared/buttons/ToggleSwitch";
import MacroBuilder from "@/components/shared/forms/MacroBuilder";
import SingleSelect from "@/components/shared/dataTable/SingleSelect";
import NumberInput from "@/components/shared/forms/NumberInput";

interface ViewThroughSectionProps {
  control: Control<AttributionFormData>;
  errors: FieldErrors<AttributionFormData>;
  isSubmitting: boolean;
  isLoading: boolean;
}

export const ViewThroughSection = ({
  control,
  errors,
  isSubmitting,
  isLoading,
}: ViewThroughSectionProps) => {
  return (
    <Controller
      control={control}
      name="enableViewThrough"
      render={({ field }) => (
        <>
          <ToggleSwitch
            label="Enable View-Through"
            checked={field.value}
            onChange={field.onChange}
            disabled={isSubmitting || isLoading}
            aria-label="Enable View-Through"
          />
          {field.value && (
            <div className="mt-4 space-y-4">
              <Controller
                control={control}
                name="viewThroughDestinationURL"
                render={({ field: urlField }) => (
                  <MacroBuilder
                    lebel="Base Destination URL"
                    url={urlField.value || ""}
                    setUrl={urlField.onChange}
                    error={errors.viewThroughDestinationURL}
                    disabled={isSubmitting || isLoading}
                    showDropdownButton={false}
                    forceDropdownOpen={true}
                  />
                )}
              />

              <Controller
                control={control}
                name="enableViewThroughLookbackWindow"
                render={({ field: lookbackField }) => (
                  <>
                    <ToggleSwitch
                      label="Enable View-Through Lookback Window"
                      checked={lookbackField.value}
                      onChange={lookbackField.onChange}
                      disabled={isSubmitting || isLoading}
                      aria-label="Enable View-Through Lookback Window"
                    />
                    {lookbackField.value && (
                      <div className="flex flex-col gap-4 w-full">
                        <Controller
                          control={control}
                          name="minLookbackWindow"
                          render={({ field: minField }) => (
                            <div className="flex gap-2">
                              <div className="w-1/2">
                                <SingleSelect
                                  id="minLookbackWindow"
                                  label="View Through > Min. Lookback Window"
                                  required
                                  showSearch={false}
                                  options={timeOptions.lookbackWindow}
                                  value={
                                    minField.value ? String(minField.value) : ""
                                  }
                                  onChange={minField.onChange}
                                  error={errors.minLookbackWindow}
                                  isDisabled={isSubmitting || isLoading}
                                  aria-required="true"
                                />
                              </div>
                              <div className="w-1/2">
                                {String(minField.value) === "custom" && (
                                  <div>
                                    <NumberInput
                                      id="minSessionLifespan"
                                      label="Seconds"
                                      type="number"
                                      placeholder="Enter minutes"
                                      value={
                                        control._formValues
                                          .minSessionLifespan ?? 0
                                      }
                                      register={control.register}
                                      errors={errors}
                                      disabled={isSubmitting}
                                      required
                                      valueAsNumber
                                    />
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
                        />

                        <Controller
                          control={control}
                          name="maxLookbackWindow"
                          render={({ field: maxField }) => (
                            <div className="flex gap-2">
                              <div className="w-1/2">
                                <SingleSelect
                                  id="maxLookbackWindow"
                                  label="View Through > Max. Lookback Window"
                                  required
                                  showSearch={false}
                                  options={timeOptions.lookbackWindow}
                                  value={
                                    maxField.value ? String(maxField.value) : ""
                                  }
                                  onChange={maxField.onChange}
                                  error={errors.maxLookbackWindow}
                                  isDisabled={isSubmitting || isLoading}
                                  aria-required="true"
                                />
                              </div>
                              <div className="w-1/2">
                                {String(maxField.value) === "custom" && (
                                  <div className="">
                                    <NumberInput
                                      id="maxSessionLifespan"
                                      label="Custom Minutes"
                                      type="number"
                                      placeholder="Enter minutes"
                                      value={
                                        control._formValues
                                          .maxSessionLifespan ?? 0
                                      }
                                      register={control.register}
                                      errors={errors}
                                      disabled={isSubmitting}
                                      required
                                      valueAsNumber
                                    />
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
                        />
                      </div>
                    )}
                  </>
                )}
              />
            </div>
          )}
        </>
      )}
    />
  );
};
