import { useState, useEffect } from "react";
import "./App.css";
import { useCallback, useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [symbolAllowed, setSymbolAllowed] = useState(false);
  const [password, setPassword] = useState("hi");

  //useRef hook
  const passwordRef = useRef();

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "1234567890";
    if (symbolAllowed) str += "~`!@#$%^&*(){}?<>";

    for (let i = 1; i <= length; i++) {
      const char = Math.floor(Math.random() * str.length + 1);

      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, symbolAllowed]);

  const copyPasswordToClipboard = () => {
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0,10)
    window.navigator.clipboard.writeText(password)
  };

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, symbolAllowed, passwordGenerator]);

  return (
    <>
      <div className="max-w-md w-full p-6 bg-white rounded-md shadow-lg m-auto">
        <h1 className="text-xl font-bold mb-4">Password Generator</h1>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Password Length
          </label>
          <input
            onChange={(e) => {
              setLength(e.target.value);
            }}
            type="number"
            id="passwordLength"
            name="passwordLength"
            min="1"
            max="50"
            value={length}
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              id="includeNumbers"
              name="includeNumbers"
              defaultChecked={numberAllowed}
              onChange={() => {
                setNumberAllowed((prev) => !prev);
              }}
              className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
            />
            <span className="ml-2 text-sm text-gray-600">Include Numbers</span>
          </label>
        </div>
        <div className="mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              id="includeSymbols"
              name="includeSymbols"
              defaultChecked={symbolAllowed}
              onChange={() => {
                setSymbolAllowed((prev) => !prev);
              }}
              className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
            />
            <span className="ml-2 text-sm text-gray-600">Include Symbols</span>
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Generated Password
          </label>
          <input
            type="text"
            value={password}
            id="generatedPassword"
            name="generatedPassword"
            ref={passwordRef}
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>
        <button
          onClick={passwordGenerator}
          id="generateButton"
          className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-500 focus:outline-none focus:bg-indigo-500"
        >
          Generate Password
        </button>
        <button
          onClick={copyPasswordToClipboard}
          id="generateButton"
          className="w-full px-4 mt-3 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-500 focus:outline-none focus:bg-indigo-500"
        >
          Copy Password
        </button>
      </div>
    </>
  );
}

export default App;
