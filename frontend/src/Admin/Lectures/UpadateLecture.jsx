import React from "react";
import { InputField } from "../../components/InputArea/InputField";

function UpadateLecture() {
  return (
    <div>
      <div className="flex justify-between space-y-2 ">
        <h1 className="font-bold text-xl">Update Lecture</h1>
        <button className="bg-blue-600 text-white py-2 px-5 rounded-lg text-md">
          Go back
        </button>
      </div>
      <form action="">
        <InputField name="title" label="title" />
        <InputField name="description" label="description" />
        <InputField name="duration" label="duration" />
        <InputField
          name="video"
          type="file"
          accept="video/*"
          label="videoUrl"
        />
        <button>Update</button>
      </form>
    </div>
  );
}

export default UpadateLecture;
