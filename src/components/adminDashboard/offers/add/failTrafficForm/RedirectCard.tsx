import ToggleSwitch from "@/components/shared/buttons/ToggleSwitch";
import SingleSelect from "@/components/shared/dataTable/SingleSelect";
import TextInput from "@/components/shared/forms/TextInput";
import {
  Controller,
  useFormContext,
  useWatch,
  FieldError,
} from "react-hook-form";
import { FiTrash2, FiMove } from "react-icons/fi";

type RedirectCardProps = {
  index: number;
  offerOptions: { label: string; value: string }[];
  onRemove: () => void;
  isSubmitting: boolean;
};

const failReasonOptions = [
  { label: "Caps", value: "Caps" },
  { label: "Quality", value: "Quality" },
  { label: "Blocked", value: "Blocked" },
];

const destinationTypeOptions = [
  { label: "Offer", value: "Offer" },
  { label: "URL", value: "URL" },
];

export default function RedirectCard({
  index,
  offerOptions,
  onRemove,
  isSubmitting,
}: RedirectCardProps) {
  const {
    register,
    control,
    setValue,
    formState: { errors },
  } = useFormContext();

  const payPartner = useWatch({ name: `payPartner` });

  return (
    <div className="relative border border-gray-300 bg-white rounded-md p-4 shadow-sm space-y-4">
      {/* Drag Handle */}

      {/* Header */}
      <div className="flex justify-between items-center">
        <div className=" text-gray-400 cursor-move">
          <FiMove size={18} />
        </div>
        <span className="font-semibold">Priority: {index + 1}</span>
        <button
          type="button"
          onClick={onRemove}
          className="p-1 rounded-full hover:bg-red-100 text-red-500"
        >
          <FiTrash2 size={18} />
        </button>
      </div>

      {/* Fail Reason & Destination Type */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Controller
          name="failReason"
          control={control}
          render={({ field }) => (
            <SingleSelect
              id="failReason"
              label="Fail Reason(s)"
              options={failReasonOptions}
              showSearch={false}
              //   placeholder="Select fail reason"
              value={field.value}
              onChange={field.onChange}
              error={errors?.failReason as FieldError | undefined}
              isDisabled={isSubmitting}
            />
          )}
        />

        <Controller
          name="destinationType"
          control={control}
          render={({ field }) => (
            <SingleSelect
              id="destinationType"
              label="Destination Type"
              options={destinationTypeOptions}
              //   placeholder="Select destination type"
              showSearch={false}
              value={field.value}
              onChange={field.onChange}
              error={errors?.destinationType as FieldError | undefined}
              isDisabled={isSubmitting}
            />
          )}
        />
      </div>

      {/* Offer Select */}
      <Controller
        name="offer"
        control={control}
        render={({ field }) => (
          <SingleSelect
            id="offer"
            label="Offer"
            options={offerOptions}
            // placeholder="Select offer"
            showSearch={false}
            value={field.value}
            onChange={field.onChange}
            error={errors?.offer as FieldError | undefined}
            isDisabled={isSubmitting}
          />
        )}
      />

      {/* Toggles */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ToggleSwitch
          label="Pay Partner"
          checked={!!payPartner}
          onChange={(val) => setValue("payPartner", val)}
          disabled={isSubmitting}
        />
        <Controller
          control={control}
          name="conversionTime"
          render={({ field }) => (
            <>
              <ToggleSwitch
                label="Apply to all Partners"
                checked={field.value}
                onChange={field.onChange}
                disabled={isSubmitting}
                aria-label="Enable Click to Conversion Time"
              />
              {field.value && (
                <TextInput
                  name="partners"
                  label="Partners"
                  register={register}
                  errors={errors}
                  required
                  disabled={isSubmitting}
                />
              )}
            </>
          )}
        />
      </div>
    </div>
  );
}
