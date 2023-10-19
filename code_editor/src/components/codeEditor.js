import { useState } from "react";

const CodeEditor = () => {
    const [input, setInput] = useState('Write code here...');
    const [output, setOutput] = useState('');
    const [isLocked, setIsLocked] = useState(false);
    const onChangeHandler = (e) => {
        setInput(e.target.value);
    }
    const copyHandler = () => {
        const tempInput = document.createElement("input");
        // console.log(tempInput);
            tempInput.value = input;
            if(tempInput.value) {
            document.body.appendChild(tempInput);
            tempInput.select();
            document.execCommand("copy");
            document.body.removeChild(tempInput);
            alert("Text is copied : " + input);
        } else {
            alert("Please write something!")
        }
    }
    const saveHandler = () => {
        localStorage.setItem("saved text in browser", input);
        alert("text is saved...");
    }
    const runCode = () => {
        try {
            const codeToRun = input;
            const consoleOutput = [];
            const originalConsoleLog = console.log;
            console.log = (message) => {
                consoleOutput.push(message);
            };
            new Function(codeToRun)();
            console.log = originalConsoleLog; 
            setOutput(consoleOutput.join('\n'));
        } catch (error) {
            console.error("Error running code:", error);
            setOutput("Error: " + error);
        }
    }
    
    
    const toggleLock = () => {
        setIsLocked(!isLocked)
    }
    return (
        <div className="text-left mx-auto w-4/5">
        <div>
        <ul className="flex justify-evenly cursor-pointer">
        <h1 className="text-red-400 font-bold text-lg p-1">CodeEditor</h1>
        <li className="text-black font-bold p-1 hover:text-gray-500">File</li>
        <li className="text-black font-bold p-1 hover:text-gray-500">Edit</li>
        <li className="text-black font-bold p-1 hover:text-gray-500">Selection</li>
        <li className="text-black font-bold p-1 hover:text-gray-500">View</li>
        </ul>
        </div>
        <div>
        <div className="border border-gray-300 p-4 font-mono w-full h-96 m-4">
        <textarea
        value={input}
        onChange={onChangeHandler}
        className="text-2xl font-thin outline-none bg-transparent border-none w-full h-full"
        readOnly={isLocked}
      />
        </div>
        </div>
        <div className="flex justify-evenly m-2 p-2">
        <button onClick={copyHandler} className="bg-blue-500 hover:bg-blue-700 active:bg-blue-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50">Copy</button>
        <button onClick={saveHandler} className="bg-blue-500 hover:bg-blue-700 active:bg-blue-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50">Save</button>
        <button onClick={toggleLock} className={`bg-blue-500 hover:bg-blue-700 active:bg-blue-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 ${isLocked ? "bg-red-500" : ""}`}>{isLocked ? "Unlock" : "Lock"}</button>
        <button onClick={runCode} className="bg-green-500 hover:bg-green-700 active:bg-green-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50">Run Code</button>
        
        </div>
        <div className="flex">
  <p className="bg-gray-700 hover:bg-gray-500 active:bg-gray-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50">
    output
  </p>
  <span className="text-2xl">::</span><input
    type="text"
    value={output}
    className="bg-gray-300 p-4 font-mono text-2xl outline-none border border-gray-300 w-full h-9"
    readOnly
  />
</div>

        </div>
    )
}
export default CodeEditor;