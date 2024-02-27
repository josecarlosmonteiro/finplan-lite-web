'use client';

import { ReleaseProps } from "@/app/types/Releases";
import { useForm } from "react-hook-form";

type Props = {

}

export function AddReleaseFunction({ }: Props) {
  const { handleSubmit } = useForm<Omit<ReleaseProps, 'id'>>();

  return (
    <form onSubmit={handleSubmit(data => console.log(data))}>
      new release form...
    </form>
  )
}