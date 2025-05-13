"use client";

import React from "react";
import {
  useForm,
  FormProvider,
  useFieldArray,
  Controller,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import RedirectCard from "./RedirectCard";
import ToggleSwitch from "@/components/shared/buttons/ToggleSwitch";

const failTrafficSchema = z.object({
  enableRedirect: z.boolean(),
  redirects: z
    .array(
      z.object({
        partners: z.string().min(1, "Fail reason is required"),
        failReason: z.string().min(1, "Fail reason is required"),
        destinationType: z.string().min(1, "Destination type is required"),
        offer: z.string().min(1, "Offer is required"),
        payPartner: z.boolean().optional(),
        applyToAllPartners: z.boolean().optional(),
      })
    )
    .nonempty("At least one redirect is required"),
});

type FailTrafficFormValues = z.infer<typeof failTrafficSchema>;

// Dummy offer list for the dropdown
const offerList = [
  { label: "Offer A", value: "offerA" },
  { label: "Offer B", value: "offerB" },
];

const FailTrafficForm = () => {
  // Use form methods from react-hook-form
  const methods = useForm<FailTrafficFormValues>({
    resolver: zodResolver(failTrafficSchema),
    defaultValues: {
      enableRedirect: false,
      redirects: [],
    },
  });

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "redirects",
  });

  const onSubmit = (data: FailTrafficFormValues) => {
    console.log("Validated form data:", data);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Toggle switch for enabling redirect */}
      <Controller
        control={control}
        name="enableRedirect"
        render={({ field }) => (
          <>
            <ToggleSwitch
              label="Block Proxy"
              checked={field.value}
              onChange={field.onChange}
              disabled={isSubmitting}
              aria-label="Block Proxy"
            />
            {field.value && (
              <>
                <div className="flex justify-center items-center my-5">
                  <h1 className="p-1 px-2 border border-gray-300 text-xs rounded-lg bg-blue-50 ">
                    Redirects
                  </h1>
                </div>
                <FormProvider {...methods}>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Render each RedirectCard */}
                    {fields.map((field, index) => (
                      <RedirectCard
                        key={field.id}
                        index={index}
                        offerOptions={offerList}
                        onRemove={() => remove(index)}
                        isSubmitting={isSubmitting}
                      />
                    ))}

                    {/* Button to add new redirect */}
                    <button
                      type="button"
                      onClick={() =>
                        append({
                          failReason: "",
                          destinationType: "",
                          offer: "",
                          partners: "",
                        })
                      }
                      className="flex items-center gap-2 mt-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-sm rounded-lg"
                    >
                      Add Redirect
                    </button>

                    {/* Submit button */}
                    <div className="mt-6 text-right">
                      <button
                        type="submit"
                        className="bg-blue-950 text-white px-5 py-2 rounded hover:bg-blue-900 transition"
                        disabled={isSubmitting}
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                </FormProvider>
              </>
            )}
          </>
        )}
      />
    </div>
  );
};

export default FailTrafficForm;
