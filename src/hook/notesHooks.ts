import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { deleteNotesApi } from "../api/notesApi";
import { useState } from "react";

function notesHooks() {
  let navigate = useNavigate();
  const [loadData, setLoadData] = useState(true)

  const deleteNotes = (noteId: string) => {
    deleteNotesApi(noteId)
      .then((response) => {
        console.log("Note deleted successfully:", response);
      })
      .catch((error) => {
        console.error("Note deletion failed:", error);
      });

      setLoadData(true);
  };

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return {
    register,
    reset,
    handleSubmit,
    errors,
    navigate,
    deleteNotes,
    loadData,
    setLoadData,
  };
}

export default notesHooks;
