"use client";

import { useFormContext } from "@/lib/context/FormProvider";
import React, { useState } from "react";
import { Input } from "../../../ui/input";
import { Button } from "../../../ui/button";
import { Loader2 } from "lucide-react";
import { updateResume } from "@/lib/actions/resume.actions";
import { useToast } from "@/components/ui/use-toast";

const PersonalDetailsForm = ({ params }: { params: { id: string } }) => {
  const { formData, handleInputChange } = useFormContext();
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const onSave = async (e: any) => {
    e.preventDefault();

    setIsLoading(true);

    const updates = {
      firstName: formData?.firstName,
      lastName: formData?.lastName,
      jobTitle: formData?.jobTitle,
      address: formData?.address,
      phone: formData?.phone,
      email: formData?.email,
    };

    const result = await updateResume({
      resumeId: params.id,
      updates: updates,
    });

    if (result.success) {
      toast({
        title: "Informasi disimpan.",
        description: "Data pribadi berhasil diubah.",
        className: "bg-white",
      });
    } else {
      toast({
        title: "Error! Ada yang salah.",
        description: result?.error,
        variant: "destructive",
        className: "bg-white",
      });
    }

    setIsLoading(false);
  };

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary-700 border-t-4 bg-white">
      <h2 className="text-lg font-semibold leading-none tracking-tight">
        Informasi Pribadi
      </h2>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
        Mulai dengan memberikan informasi dasar
      </p>

      <form onSubmit={onSave}>
        <div className="grid grid-cols-2 mt-5 gap-3">
          <div className="space-y-2">
            <label className="mt-2 text-slate-700 font-semibold">
              Nama:
            </label>
            <Input
              name="firstName"
              defaultValue={formData?.firstName}
              required
              onChange={handleInputChange}
              className="no-focus"
            />
          </div>
          <div className="space-y-2">
            <label className="mt-2 text-slate-700 font-semibold">
              Nama Belakang:
            </label>
            <Input
              name="lastName"
              required
              onChange={handleInputChange}
              defaultValue={formData?.lastName}
              className="no-focus"
            />
          </div>
          <div className="col-span-2 space-y-2">
            <label className="mt-2 text-slate-700 font-semibold">
              Pekerjaan/Pendidikan:
            </label>
            <Input
              name="jobTitle"
              required
              onChange={handleInputChange}
              defaultValue={formData?.jobTitle}
              className="no-focus"
            />
          </div>
          <div className="col-span-2 space-y-2">
            <label className="mt-2 text-slate-700 font-semibold">
              Alamat:
            </label>
            <Input
              name="address"
              required
              defaultValue={formData?.address}
              onChange={handleInputChange}
              className="no-focus"
            />
          </div>
          <div className="space-y-2">
            <label className="mt-2 text-slate-700 font-semibold">Telepon:</label>
            <Input
              name="phone"
              required
              defaultValue={formData?.phone}
              onChange={handleInputChange}
              className="no-focus"
            />
          </div>
          <div className="space-y-2">
            <label className="mt-2 text-slate-700 font-semibold">Email:</label>
            <Input
              name="email"
              required
              defaultValue={formData?.email}
              onChange={handleInputChange}
              className="no-focus"
            />
          </div>
        </div>
        <div className="mt-5 flex justify-end">
          <Button
            type="submit"
            disabled={isLoading}
            className="bg-primary-700 hover:bg-primary-800 text-white"
          >
            {isLoading ? (
              <>
                <Loader2 size={20} className="animate-spin" /> &nbsp; Menyimpan
              </>
            ) : (
              "Simpan"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PersonalDetailsForm;
