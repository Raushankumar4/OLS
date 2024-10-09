import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { InputField } from "../InputArea/InputField";
import { useAskQuestion } from "../../hooks/useAskQuestions";
import { useGetAllQuestions } from "../../hooks/useGetAllQuestions";
import { useDeleteQuestion } from "../../hooks/useDeleteQuestion";

const AskQuestion = () => {
  const [open, setOpen] = useState(false);
  const { id } = useParams();
  const { user } = useSelector((state) => state.user);
  const allQuestions = useSelector((state) => state.question.questions);
  const couserId = id;
  const userId = user?._id;

  const { askQuestion, handleOnChange, handleAskQuestion } = useAskQuestion(
    couserId,
    userId
  );
  useGetAllQuestions();
  const { handleDeleteQuestion } = useDeleteQuestion();

  return (
    <div>
      <div className="ask-question-form">
        <h2>Ask a Question</h2>
        <form onSubmit={handleAskQuestion}>
          <div>
            <InputField
              onChange={handleOnChange}
              name="question"
              label="Question"
              value={askQuestion.question}
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>

      {open ? (
        <div>
          {allQuestions &&
            allQuestions?.map((question) => (
              <ul key={question?._id}>
                <li>
                  <img
                    className="w-10 h-10 rounded-full"
                    src={question?.userId?.profileImage}
                    alt=""
                  />
                </li>
                <li className=" text-red-200">{question?.userId?.name}</li>
                <li>{question?.userId?.email}</li>
                <li>{question?.question}</li>
                {user?._id === question?.userId?._id && (
                  <button
                    onClick={() => {
                      if (
                        window.confirm(
                          "Are you sure you want to delete this question?"
                        )
                      ) {
                        handleDeleteQuestion(question?._id);
                      }
                    }}
                  >
                    Delete
                  </button>
                )}
              </ul>
            ))}
          <div>
            {allQuestions?.length === 0 && <span>no questions yet</span>}
            <h1
              style={{ color: "red" }}
              className="cursor-pointer"
              onClick={() => setOpen(false)}
            >
              close
            </h1>
          </div>
        </div>
      ) : (
        <h1
          style={{ color: "green" }}
          className="cursor-pointer"
          onClick={() => setOpen(true)}
        >
          view all questions{allQuestions?.length}
        </h1>
      )}
    </div>
  );
};

export default AskQuestion;
