import { useState } from "react";
import { executeCode } from "../api";

const Output = ({ editorRef, language }) => {
  const [output, setOutput] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const runCode = async () => {
    const sourceCode = editorRef.current.getValue();
    if (!sourceCode) return;
    try {
      setIsLoading(true);
      const { run: result } = await executeCode(language, sourceCode);
      setOutput(result.output.split("\n"));
      result.stderr ? setIsError(true) : setIsError(false);
    } catch (error) {
      console.log(error);
      // Handle error using DaisyUI's toast notification
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-1/2">
      <div className="text-lg mb-2">Output</div>
      <button
        className="btn btn-primary mb-4"
        disabled={isLoading}
        onClick={runCode}
      >
        {isLoading ? "Running..." : "Run Code"}
      </button>
      <div
        className={`h-3/4 p-2 ${
          isError ? "text-red-400 border-red-500" : "border-gray-300"
        } border rounded-md`}
      >
        {output ? (
          output.map((line, i) => <div key={i}>{line}</div>)
        ) : (
          <div>Click "Run Code" to see the output here</div>
        )}
      </div>
    </div>
  );
};

export default Output;
