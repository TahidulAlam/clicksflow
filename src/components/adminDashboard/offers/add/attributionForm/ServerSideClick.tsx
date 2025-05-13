import { Controller, Control, FieldErrors } from "react-hook-form";
import { AttributionFormData } from "./validationSchemas";
import ToggleSwitch from "@/components/shared/buttons/ToggleSwitch";
import MacroBuilder from "@/components/shared/forms/MacroBuilder";

interface ServerSideClickSectionProps {
  control: Control<AttributionFormData>;
  errors: FieldErrors<AttributionFormData>;
  isSubmitting: boolean;
  isLoading: boolean;
}

const ServerSideClick = ({
  control,
  errors,
  isSubmitting,
  isLoading,
}: ServerSideClickSectionProps) => {
  return (
    <Controller
      control={control}
      name="enableServerSideClick"
      render={({ field }) => (
        <div>
          <ToggleSwitch
            label="Enable Server-Side Click"
            checked={field.value}
            onChange={field.onChange}
            disabled={isSubmitting || isLoading}
            aria-label="Enable Server-Side Click"
          />

          {field.value && (
            <div className="mt-4 space-y-4">
              <Controller
                control={control}
                name="viewThroughDestinationURL"
                render={({ field: urlField }) => (
                  <MacroBuilder
                    lebel="Server-Side Click URL"
                    url={urlField.value || ""}
                    setUrl={urlField.onChange}
                    error={errors.viewThroughDestinationURL}
                    disabled={isSubmitting || isLoading}
                    showDropdownButton={false}
                    forceDropdownOpen={true}
                  />
                )}
              />
            </div>
          )}
        </div>
      )}
    />
  );
};

export default ServerSideClick;
