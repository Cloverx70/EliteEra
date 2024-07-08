import React, { useState, useRef } from "react";
import storage from "../../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { fetchUpdateUserPfpByURL } from "@/api";
import { useStatus } from "@/contexts/statusContext";
import Spinner from "@/shared/Spinner";
import { useQueryClient } from "@tanstack/react-query";
import { DialogTrigger } from "@radix-ui/react-dialog";

type PfpChangeProps = {
  setPfpedit: React.Dispatch<React.SetStateAction<boolean>>;
  pfpedit: boolean;
};

const PfpChange = ({ setPfpedit, pfpedit }: PfpChangeProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [Loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const client = useQueryClient();
  const { Status } = useStatus();
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setSelectedFile(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  const handleClickSave = async () => {
    setLoading(true);
    if (selectedFile) {
      const ImgRef = ref(storage, `Userpfps/${selectedFile.name + v4()}`);
      const uploadTask = uploadBytesResumable(ImgRef, selectedFile);
      await uploadTask;
      const URL = await getDownloadURL(uploadTask.snapshot.ref).then(
        async (item) => {
          await fetchUpdateUserPfpByURL(Status?.userId!, item);
          client.invalidateQueries({ queryKey: ["user"] });
          setLoading(false);
          setPfpedit(false);
        }
      );
    }
  };
  const handleDivClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full h-full p-4 flex flex-col gap-4 border font-Poppins  ">
      <p className="text-lg font-semibold ">Select Profile Picture</p>
      {preview ? (
        <img src={preview} alt="Selected" className="w-full h-auto" />
      ) : (
        <div className="w-full h-60   flex-col gap-2 bg-gray-200 flex items-center justify-center">
          <p>No image selected</p>
          <p
            onClick={handleDivClick}
            className=" text-custom-light-purple cursor-pointer text-sm font-bold"
          >
            Click to select picture...
          </p>
        </div>
      )}
      <div className=" flex gap-4 p-5 justify-between items-center">
        <div
          onClick={handleClickSave}
          className="cursor-pointer py-2 flex items-center justify-center w-full bg-custom-light-purple text-white rounded"
        >
          {Loading ? <Spinner /> : "Save"}
        </div>

        <div className="cursor-pointer py-2 flex items-center justify-center w-1/3 bg-red-800 text-white  rounded">
          Close
        </div>
      </div>
      <input
        type="file"
        onChange={handleFileChange}
        ref={fileInputRef}
        className="hidden"
      />
    </div>
  );
};

export default PfpChange;
