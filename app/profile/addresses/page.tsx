"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Switch } from "@/components/ui/switch";
import { IconTrash } from "@tabler/icons-react";
import { House, Pencil, Plus } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function test() {
  const { currentUser } = useAuth();

  return (
    <div>
      <div className="text-primary text-3xl">ADRESSES</div>
      <div className="flex flex-col bg-[#1a1a1a]/20 backdrop-blur-md mt-10 px-8 py-10 border border-primary rounded-3xl w-full h-fit">
        <div className="flex justify-between gap-8">
          <div className="border border-primary border-dashed rounded-3xl w-full h-fit overflow-hidden hover:cursor-pointer">
            <div className="flex flex-col justify-center items-center p-12 rounded-3xl overflow-hidden text-black">
              <Plus className="size-20 text-white" />
              <div className="text-white">Add New Address</div>
            </div>
          </div>

          <div className="border border-primary rounded-3xl w-full h-fit overflow-hidden">
            <div className="flex gap-3 p-6 rounded-3xl overflow-hidden">
              <House className="text-primary" />

              <div className="flex flex-col">
                <div className="text-md text-primary">Home</div>
                <div className="mt-1 text-zinc-400 text-xs">
                  Abd El-Aziz Hegazy Berket an Nasr - Al Salam First - Cairo
                  Governorate - Egypt
                </div>
                <div className="mt-4 text-zinc-400 text-xs">
                  {currentUser?.firstName} {currentUser?.lastName}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 p-4 border-t text-sm">
              <Button variant={"outline"}>
                {" "}
                <div>Edit</div>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
